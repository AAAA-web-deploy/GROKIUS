
(function(){
  const cfg = window.SITE_CONFIG || {};
  const fmt = (s)=> s || '';
  const setText = (sel, val) => document.querySelectorAll(sel).forEach(el => el.textContent = fmt(val));
  const setHTML = (sel, val) => document.querySelectorAll(sel).forEach(el => el.innerHTML = val);
  const setHref = (sel, val) => document.querySelectorAll(sel).forEach(el => el.href = val || '#');

  setText('[data-token-name]', cfg.tokenName);
  setText('[data-ticker]', cfg.ticker);
  setText('[data-tagline]', cfg.tagline);
  setText('[data-description]', cfg.description);
  setText('[data-contract]', cfg.contractAddress);
  setText('[data-chain-name]', cfg.chainName);
  setText('[data-supply]', cfg.supply);
  setText('[data-tax]', cfg.tax);
  setText('[data-dex-name]', cfg.dexName);
  setText('[data-wallet-name]', cfg.walletName);
  setText('[data-announcement]', cfg.announcement);
  setHref('[data-x-url]', cfg.xUrl);
  setHref('[data-telegram-url]', cfg.telegramUrl);
  setHref('[data-buy-url]', cfg.buyUrl);
  setHref('[data-chart-url]', cfg.chartUrl);
  setHref('[data-explorer-url]', cfg.explorerUrl + (cfg.contractAddress || ''));

  document.title = `${cfg.tokenName} (${cfg.ticker}) | ${cfg.tagline}`;
  const desc = document.querySelector('meta[name="description"]');
  if(desc) desc.setAttribute('content', cfg.description || cfg.tagline || '');

  const copyBtn = document.getElementById('copy-ca');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      const ca = cfg.contractAddress || '';
      try {
        await navigator.clipboard.writeText(ca);
        const old = copyBtn.textContent;
        copyBtn.textContent = 'Copied';
        setTimeout(()=> copyBtn.textContent = old, 1400);
      } catch(e) {
        alert('Copy failed. Please copy manually: ' + ca);
      }
    });
  }

  const burger = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-links');
  if(burger && mobileNav){
    burger.addEventListener('click', ()=> mobileNav.classList.toggle('open'));
  }

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: .12});
  revealEls.forEach(el => io.observe(el));

  const band = document.querySelector('.ticker-band');
  if (band) {
    const text = `${cfg.tokenName} • ${cfg.ticker} • ${cfg.chainName} • ${cfg.tokenName} • ${cfg.ticker} • ${cfg.chainName} • `;
    band.innerHTML = `<div>${text.repeat(4)}</div><div>${text.repeat(4)}</div>`;
  }
})();
