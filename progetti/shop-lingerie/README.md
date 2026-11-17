# E-commerce lingerie su Shopify con Matterhorn

Guida operativa, dall'apertura del negozio al primo ordine.
Tempo stimato: un weekend di lavoro.

File in questa cartella:
- `README.md`: questa guida
- `brand.md`: nome, stile, testi della homepage, collezioni
- `prezzi.md`: come calcolare il prezzo di vendita
- `pagine/`: testi pronti per Spedizioni, Resi, Guida taglie, FAQ, Contatti

---

## Fase 1 — Aprire gli account (1–2 ore)

1. **Shopify**: crea il negozio su https://www.shopify.com/it (prova gratuita, poi piano Basic).
   Paese: Italia, valuta EUR, lingua italiano.
2. **Matterhorn**: registrati come rivenditore su https://matterhorn-wholesale.com
   e scegli il **dropshipping**. Servono i dati della tua attività (partita IVA).
   Chiedi a Matterhorn per iscritto:
   - costo di spedizione e tempi reali verso l'Italia;
   - se spediscono con imballo neutro (senza il loro marchio);
   - come fatturano a una partita IVA italiana;
   - se la biancheria intima arriva sigillata;
   - come gestiscono i resi e i prodotti difettosi.
3. **Ordina 3–5 campioni** dei prodotti che vuoi spingere: verifichi taglie, qualità e tempi di consegna reali.

## Fase 2 — Collegare Matterhorn (1 ora)

1. Nel pannello Matterhorn apri **Dropshipping & Integrazioni** e installa l'**app Shopify** (gratuita).
2. Importa solo una selezione: **40–80 prodotti** ben scelti vendono più di 2.000 prodotti a caso.
   Criteri: disponibili in tutte le taglie, foto pulite, prezzo all'ingrosso che regge il ricarico (vedi `prezzi.md`).
3. L'app aggiorna prezzi e scorte. Controlla che le varianti di taglia siano importate correttamente.
4. Quando arriva un ordine: in Shopify apri l'ordine e clicca **Richiedi evasione** (Request fulfilment).
   Matterhorn spedisce e il tracking torna su Shopify.

Alternativa all'app: i file XML/CSV di Matterhorn (aggiornati ogni 2 ore) con un'app di sincronizzazione come Syncee.

## Fase 3 — Il negozio (mezza giornata)

1. **Tema**: usa **Dawn** (gratuito) o **Sense** (gratuito, adatto alla moda). Impostazioni in `brand.md`.
2. **Collezioni**: crea le collezioni elencate in `brand.md`, con regole automatiche per tag o tipo di prodotto.
3. **Schede prodotto**: riscrivi titolo e descrizione dei 20 prodotti principali con il modello in `brand.md`.
   Le descrizioni importate sono tradotte male e uguali a quelle di tutti gli altri negozi.
4. **Pagine**: copia i testi della cartella `pagine/` e **completa i campi tra [parentesi quadre]** dopo la risposta di Matterhorn.
5. **Menu**: Novità · Reggiseni · Completi · Body · Notte · Guida taglie.

## Fase 4 — Pagamenti, spedizioni, legale (2 ore)

- **Pagamenti**: Shopify Payments (carte, Apple Pay, Google Pay) + PayPal. Valuta Klarna o Scalapay per il pagamento in 3 rate.
- **Spedizioni**: una sola tariffa semplice, es. 4,90 € e **gratis sopra i 49 €**. Il costo reale di Matterhorn va dentro il prezzo (vedi `prezzi.md`).
- **Imposte**: IVA inclusa nei prezzi (Impostazioni → Imposte → Italia).
- **Informative legali**: Termini di vendita, Privacy e Cookie sono obbligatori.
  Usa un servizio come iubenda o un professionale; il generatore di Shopify è un punto di partenza, non basta da solo.
  Nel footer metti ragione sociale, sede e partita IVA (obbligatori in Italia).
- **Banner cookie**: attiva il banner di consenso di Shopify o di iubenda.

## Fase 5 — Lancio

- [ ] Ordine di prova completo, con un prodotto vero, fino alla consegna
- [ ] Tempi di consegna sul sito uguali a quelli reali misurati
- [ ] Tutte le pagine legali e il footer completi
- [ ] Dominio proprio collegato (es. `nomebrand.it`)
- [ ] Google Search Console e Meta Pixel installati
- [ ] Profilo Instagram del brand con 9 post prima di fare pubblicità

## Note importanti

- **Marchio**: prima di scegliere il nome controlla che non sia registrato su https://www.tmdn.org/tmview e che il dominio sia libero.
- **Pubblicità di lingerie**: Meta limita gli annunci troppo espliciti. Foto con modelle vanno bene, pose provocanti vengono rifiutate. Punta su comfort, vestibilità e regalo.
- **Foto**: verifica con Matterhorn di poter usare le loro foto nelle pubblicità, non solo sul sito.
- **Resi**: la lingerie ha resi alti per la taglia. La guida taglie fatta bene è il miglior investimento del negozio.
