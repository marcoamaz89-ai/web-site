#!/usr/bin/env python3
"""
publish.py - publish a Reel to Instagram through the official, free
Instagram API with Instagram Login (graph.instagram.com).

Flow: create a REELS container from a public video URL -> wait until Meta has
processed it -> publish it. Standard library only.

Auth: the access token is sent as "Authorization: Bearer <token>".
  * Locally: export IG_ACCESS_TOKEN=...   (never commit it)
  * In a Claude cloud environment the token is stored as a network secret for
    graph.instagram.com and the proxy injects it; the script then sends a
    placeholder that the proxy replaces.

Usage
  python3 publish.py whoami
  python3 publish.py reel --video-url URL --caption-file caption.txt [--cover-url URL] [--dry-run]
  python3 publish.py limit
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HOST = "https://graph.instagram.com"
VERSION = os.environ.get("IG_API_VERSION", "").strip("/")
BASE = f"{HOST}/{VERSION}" if VERSION else HOST
TOKEN = os.environ.get("IG_ACCESS_TOKEN", "proxy-injected")


def call(method, path, params=None):
    url = f"{BASE}/{path.lstrip('/')}"
    data = None
    if method == "GET" and params:
        url += "?" + urllib.parse.urlencode(params)
    elif params:
        data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Authorization": f"Bearer {TOKEN}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        sys.exit(f"HTTP {e.code} on {method} /{path}: {body}")


def whoami():
    return call("GET", "me", {"fields": "user_id,username,account_type,media_count"})


def publish_reel(video_url, caption, cover_url=None, share_to_feed=True, wait_s=600):
    me = whoami()
    uid = me["user_id"]
    params = {"media_type": "REELS", "video_url": video_url, "caption": caption,
              "share_to_feed": "true" if share_to_feed else "false"}
    if cover_url:
        params["cover_url"] = cover_url
    container = call("POST", f"{uid}/media", params)["id"]
    print(f"container {container} created for @{me.get('username')}, processing...")
    deadline = time.time() + wait_s
    while True:
        st = call("GET", container, {"fields": "status_code,status"})
        code = st.get("status_code")
        if code == "FINISHED":
            break
        if code in ("ERROR", "EXPIRED"):
            sys.exit(f"container {code}: {st.get('status')}")
        if time.time() > deadline:
            sys.exit(f"timed out waiting for processing (last status {code})")
        time.sleep(10)
    media = call("POST", f"{uid}/media_publish", {"creation_id": container})["id"]
    link = call("GET", media, {"fields": "permalink"}).get("permalink")
    return {"media_id": media, "permalink": link}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("whoami")
    sub.add_parser("limit")
    r = sub.add_parser("reel")
    r.add_argument("--video-url", required=True, help="public HTTPS URL of an MP4 (H.264/AAC, 9:16)")
    r.add_argument("--caption-file", required=True)
    r.add_argument("--cover-url")
    r.add_argument("--no-feed", action="store_true", help="show only in the Reels tab")
    r.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    if a.cmd == "whoami":
        print(json.dumps(whoami(), indent=2))
    elif a.cmd == "limit":
        uid = whoami()["user_id"]
        print(json.dumps(call("GET", f"{uid}/content_publishing_limit", {"fields": "quota_usage,config"}), indent=2))
    elif a.cmd == "reel":
        caption = open(a.caption_file, encoding="utf-8").read().strip()
        if len(caption) > 2200:
            sys.exit("caption longer than 2200 characters")
        if a.dry_run:
            print(json.dumps({"video_url": a.video_url, "cover_url": a.cover_url,
                              "caption_chars": len(caption), "first_line": caption.splitlines()[0]}, indent=2, ensure_ascii=False))
            return
        print(json.dumps(publish_reel(a.video_url, caption, a.cover_url, not a.no_feed), indent=2))


if __name__ == "__main__":
    main()
