---
name: ig-publish
description: Publish a finished Reel (MP4 + caption) to the user's Instagram account @webdesignge through the free, official Instagram API with Instagram Login. Use when the user says "pubblica", "posta su Instagram", "publish this reel", or when a scheduled content run has a reel ready to go out.
---

# ig-publish

Publishes Reels with `publish.py` (standard library only) against `graph.instagram.com`.
No paid service is involved.

## Before the first publish (one-time, done by the user)

1. Instagram account is Professional (Business or Creator). @webdesignge already is.
2. On developers.facebook.com create an app with the use case
   "Manage messaging & content on Instagram" (Instagram API with Instagram Login).
3. In the app: Instagram > API setup > add the account, accept the tester invite
   in the Instagram app, then "Generate token" with the permissions
   `instagram_business_basic` and `instagram_business_content_publish`.
4. The token is given to Claude only through the secure credential form for host
   `graph.instagram.com` (never pasted in chat, never committed). Locally it can
   be exported as `IG_ACCESS_TOKEN`.

Tokens last 60 days. Refresh before expiry:
`GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token`

## Publishing a reel

The video must be reachable at a public HTTPS URL, because Meta downloads it.
This repo is public, so a committed MP4 works through raw.githubusercontent.com:

```bash
python3 .claude/skills/ig-publish/publish.py whoami
python3 .claude/skills/ig-publish/publish.py reel \
  --video-url https://raw.githubusercontent.com/marcoamaz89-ai/web-site/main/instagram/reels/out/reel-01-trattoria.mp4 \
  --cover-url https://raw.githubusercontent.com/marcoamaz89-ai/web-site/main/instagram/reels/out/reel-01-trattoria-cover.jpg \
  --caption-file instagram/reels/out/reel-01-trattoria.txt --dry-run
```

Drop `--dry-run` to publish. The script prints the permalink.

## Rules

- Run `--dry-run` first and show the user the first caption line.
- One reel at a time, at least a day apart. Never publish several at once.
- Log every published reel (date, file, permalink) in `instagram/published.md`.
- Never comment, like, follow or DM from the account. Publishing only.
- Limit: 100 API posts per 24 hours (`publish.py limit`).
