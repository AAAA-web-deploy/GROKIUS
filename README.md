# Grokius ETH

Static site for **Grokius ETH** (`$GROKIUS`) — throne-king Grok robot on Ethereum.

**Live:** https://aaaa-web-deploy.github.io/GROKIUS/

## Edit token details

Update `config.js` only:

- `tokenName`, `ticker`, `tagline`, `description`
- `contractAddress`
- `xUrl`, `telegramUrl`, `buyUrl`, `chartUrl`, `explorerUrl`
- `supply`, `tax`, and other display fields

No Node.js, npm, or build step.

## Deploy

Pushes to `main` deploy automatically via GitHub Pages (`.github/workflows/deploy-pages.yml`).

```powershell
.\deploy.ps1
```
