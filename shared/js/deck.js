/* LLMs por Dentro. Native, offline presentation controls. MIT. */
(() => {
  'use strict';
  const slides = [...document.querySelectorAll('section.slide')];
  if (!slides.length) return;
  const mainCount = slides.filter(slide => slide.dataset.appendix !== 'true').length;
  const params = new URLSearchParams(location.search);
  const preview = params.get('preview') === '1';
  const main = document.querySelector('.stage');
  let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace('#slide-', '')) - 1 || 0));
  let revealed = Math.max(0, Number(params.get('fragment')) || 0);
  let speaker = null;
  let elapsed = 0;
  let clockStarted = 0;
  let timerRunning = false;
  let noticeTimeout;
  const fragments = index => [...slides[index].querySelectorAll('.fragment')];
  const title = index => slides[index].querySelector('h1,h2')?.textContent || slides[index].dataset.short;
  const duration = index => Number(slides[index].dataset.timing || 0);
  const cumulative = index => slides.slice(0, index).reduce((sum, slide) => sum + Number(slide.dataset.timing || 0), 0);
  const format = seconds => `${Math.floor(Math.max(0, seconds) / 60).toString().padStart(2, '0')}:${Math.floor(Math.max(0, seconds) % 60).toString().padStart(2, '0')}`;

  document.body.classList.add('present');
  if (preview) document.body.classList.add('preview');
  slides.forEach((slide, i) => {
    const footer = document.createElement('div');
    footer.className = 'footnote';
    const brand = document.createElement('span');
    brand.textContent = 'LLMs por Dentro';
    const number = document.createElement('span');
    number.textContent = slide.dataset.appendix === 'true' ? `Anexo ${i - mainCount + 1}` : `${i + 1} / ${mainCount}`;
    footer.append(brand, number);
    slide.append(footer);
    const notes = slide.querySelector('.notes');
    if (notes) notes.setAttribute('aria-hidden', 'true');
  });

  function resize() {
    if (innerWidth <= 700 && !preview) {
      main.style.transform = '';
      return;
    }
    const bottom = preview ? 0 : 70;
    const scale = Math.min((innerWidth - 20) / 1600, (innerHeight - bottom - 16) / 900);
    main.style.transform = `translate(-50%, -50%) scale(${Math.max(.05, scale)})`;
    main.style.top = `calc(50% - ${bottom / 2}px)`;
  }

  function notify(message) {
    const notice = document.getElementById('notice');
    notice.textContent = message;
    notice.hidden = false;
    clearTimeout(noticeTimeout);
    noticeTimeout = setTimeout(() => { notice.hidden = true; }, 6500);
  }

  function render() {
    revealed = Math.min(revealed, fragments(current).length);
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      fragments(i).forEach((fragment, j) => fragment.classList.toggle('shown', i === current && j < revealed));
    });
    const status = document.getElementById('status');
    status.textContent = current < mainCount ? `${current + 1} / ${mainCount}` : `Anexo ${current - mainCount + 1}`;
    const nextButton = document.querySelector('[data-action="next"]');
    nextButton.textContent = revealed < fragments(current).length ? 'Revelar →' : 'Avançar →';
    nextButton.disabled = (current === mainCount - 1 || current === slides.length - 1) && revealed === fragments(current).length;
    document.querySelector('[data-action="prev"]').disabled = current === 0 && revealed === 0;
    if (location.hash !== `#${slides[current].id}`) {
      try { history.replaceState(null, '', `#${slides[current].id}`); }
      catch { /* Sandboxed file viewers may disallow history. Navigation still works. */ }
    }
    if (!preview) document.title = `${current + 1}. ${title(current)} · LLMs por Dentro`;
    updateSpeaker();
  }

  function goTo(index, allRevealed = false) {
    if (index < 0 || index >= slides.length) return;
    current = index;
    revealed = allRevealed ? fragments(index).length : 0;
    render();
    if (innerWidth <= 700 && !preview) window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function next() {
    if (revealed < fragments(current).length) {
      revealed += 1;
      render();
    } else if (current !== mainCount - 1 && current < slides.length - 1) {
      goTo(current + 1);
    }
  }

  function previous() {
    if (revealed > 0) { revealed -= 1; render(); }
    else if (current > 0) goTo(current - 1, true);
  }

  function showDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog.open) dialog.close(); else dialog.showModal();
  }

  function pauseProjection() {
    document.getElementById('blackout').hidden = !document.getElementById('blackout').hidden;
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else notify('Use o comando de tela cheia do navegador.');
    } catch { notify('O navegador bloqueou a tela cheia. Use F11 ou o menu do navegador.'); }
  }

  function elapsedNow() {
    return elapsed + (timerRunning ? (Date.now() - clockStarted) / 1000 : 0);
  }

  function toggleTimer() {
    if (timerRunning) { elapsed = elapsedNow(); timerRunning = false; }
    else { clockStarted = Date.now(); timerRunning = true; }
    updateClock();
  }

  function resetTimer() {
    elapsed = 0;
    clockStarted = Date.now();
    updateClock();
  }

  function previewURL(index, count) {
    const url = new URL(location.href);
    url.searchParams.set('preview', '1');
    url.searchParams.set('fragment', String(count));
    const selected = document.querySelector('[data-lookup][aria-pressed="true"]');
    if (selected) url.searchParams.set('lookup', selected.dataset.lookup);
    url.hash = slides[index].id;
    return url.href;
  }

  function updateClock() {
    if (!speaker || speaker.closed) return;
    const doc = speaker.document;
    const total = elapsedNow();
    doc.getElementById('clock').textContent = format(total);
    doc.getElementById('timer-toggle').textContent = timerRunning ? 'Pausar relógio' : 'Iniciar relógio';
    const start = cumulative(current);
    const end = start + duration(current);
    let label = 'Relógio pausado. Inicie quando começar a palestra.';
    if (timerRunning && current < mainCount) {
      label = total > end + 60 ? 'Você passou do tempo sugerido para este slide.' : `Referência para este slide: ${format(start)} a ${format(end)}.`;
    }
    if (current >= mainCount) label = 'Anexo opcional. Fora do roteiro de 50 minutos.';
    doc.getElementById('pace').textContent = label;
  }

  function updateSpeaker() {
    if (!speaker || speaker.closed) return;
    const doc = speaker.document;
    doc.getElementById('speaker-title').textContent = `${current + 1}. ${title(current)}`;
    doc.getElementById('speaker-duration').textContent = current < mainCount ? `${duration(current) / 60} min sugeridos para este slide` : 'Anexo opcional';
    const notes = doc.getElementById('speaker-notes');
    if (notes.dataset.slide !== String(current)) {
      notes.innerHTML = slides[current].querySelector('.notes').innerHTML;
      notes.dataset.slide = String(current);
      notes.scrollTop = 0;
    }
    const currentFrame = doc.getElementById('current-frame');
    const currentURL = previewURL(current, revealed);
    if (currentFrame.getAttribute('src') !== currentURL) currentFrame.src = currentURL;
    const nextFrame = doc.getElementById('next-frame');
    const nextIndex = current === mainCount - 1 ? null : current + 1 < slides.length ? current + 1 : null;
    const nextURL = nextIndex === null ? 'about:blank' : previewURL(nextIndex, 99);
    if (nextFrame.getAttribute('src') !== nextURL) nextFrame.src = nextURL;
    doc.getElementById('next-label').textContent = nextIndex === null ? 'Fim da sequência' : `A seguir: ${slides[nextIndex].dataset.short}`;
    doc.getElementById('speaker-prev').disabled = current === 0 && revealed === 0;
    doc.getElementById('speaker-next').disabled = document.querySelector('[data-action="next"]').disabled;
    for (const frame of doc.querySelectorAll('iframe')) {
      frame.style.transform = `scale(${frame.parentElement.clientWidth / 1600})`;
    }
    updateClock();
  }

  function openSpeaker() {
    if (preview) return;
    if (speaker && !speaker.closed) { updateSpeaker(); speaker.focus(); return; }
    speaker = window.open('', 'llms-por-dentro-apresentadora', 'popup,width=1450,height=1000');
    if (!speaker) { notify('Permita popups para abrir as notas. Você também pode consultar speaker-notes.md.'); return; }
    speaker.document.open();
    speaker.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Roteiro da apresentadora · LLMs por Dentro</title><style>
      *{box-sizing:border-box}body{margin:0;background:#f7faf8;color:#142f37;font-family:'Segoe UI',Arial,sans-serif}header{padding:24px 32px;border-bottom:1px solid #bfd3cc;display:flex;justify-content:space-between;gap:25px;align-items:center}h1{font-size:24px;margin:0 0 8px}p{margin:0;line-height:1.5}.time{font-size:35px;font-variant-numeric:tabular-nums;color:#006c64}.controls{display:flex;gap:9px;margin-top:12px;flex-wrap:wrap}button{font:inherit;padding:9px 14px;border:1px solid #bfd3cc;border-radius:7px;background:white;color:#142f37;cursor:pointer}button:disabled{opacity:.45}button:focus-visible{outline:3px solid #006c64;outline-offset:3px}.layout{display:grid;grid-template-columns:43% 57%;max-height:calc(100dvh - 150px)}.previews{padding:23px 25px}.previews h2{font-size:17px;font-weight:600;margin:0 0 12px}.frame-box{aspect-ratio:16/9;overflow:hidden;margin-bottom:22px;border:1px solid #bfd3cc;background:#f7faf8}iframe{display:block;width:1600px;height:900px;transform-origin:top left;border:0;pointer-events:none;background:#f7faf8}#speaker-notes{padding:26px 36px;overflow:auto;max-height:calc(100dvh - 150px);border-left:1px solid #bfd3cc;font-size:22px;line-height:1.55}#speaker-notes h3{font-size:21px;color:#006c64;margin:26px 0 13px}#speaker-notes h3:first-child{margin-top:0}#speaker-notes p{margin-bottom:20px}#pace{font-size:14px;color:#456168;max-width:440px}#speaker-duration{font-size:15px;color:#456168}.reminder{font-size:14px;color:#456168;margin-bottom:15px}@media(max-width:800px){header{display:block}.layout{grid-template-columns:1fr;max-height:none}.previews{display:none}#speaker-notes{max-height:none;border:0;font-size:20px}.time{margin-top:16px}}
    </style></head><body><header><div><h1 id="speaker-title"></h1><p id="speaker-duration"></p><div class="controls"><button id="speaker-prev">← Voltar</button><button id="speaker-next">Avançar →</button><button id="speaker-index">Índice nos slides</button></div></div><div><div class="time"><span id="clock">00:00</span> / 50:00</div><p id="pace"></p><div class="controls"><button id="timer-toggle">Iniciar relógio</button><button id="timer-reset">Zerar</button></div></div></header><main class="layout"><section class="previews"><p class="reminder">Compartilhe somente a janela dos slides na reunião.</p><h2>Projeção atual</h2><div class="frame-box"><iframe id="current-frame" title="Slide atual"></iframe></div><h2 id="next-label">A seguir</h2><div class="frame-box"><iframe id="next-frame" title="Próximo slide"></iframe></div></section><section id="speaker-notes" aria-label="Roteiro detalhado"></section></main></body></html>`);
    speaker.document.close();
    speaker.document.getElementById('speaker-prev').addEventListener('click', previous);
    speaker.document.getElementById('speaker-next').addEventListener('click', next);
    speaker.document.getElementById('speaker-index').addEventListener('click', () => { showDialog('overview'); window.focus(); });
    speaker.document.getElementById('timer-toggle').addEventListener('click', toggleTimer);
    speaker.document.getElementById('timer-reset').addEventListener('click', resetTimer);
    speaker.document.addEventListener('keydown', keydown);
    speaker.addEventListener('resize', updateSpeaker);
    updateSpeaker();
  }

  function keydown(event) {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    const key = event.key.toLowerCase();
    if (key === 'escape') {
      document.getElementById('blackout').hidden = true;
      for (const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
      return;
    }
    if (document.querySelector('dialog[open]')) return;
    if (!document.getElementById('blackout').hidden) { if (key === 'b') pauseProjection(); return; }
    if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (key === ' ' && event.target.closest('button,a')) return;
    const actions = { arrowright: next, pagedown: next, ' ': next, arrowleft: previous, pageup: previous, home: () => goTo(0), end: () => goTo(mainCount - 1), s: openSpeaker, f: fullscreen, o: () => showDialog('overview'), h: () => showDialog('help'), b: pauseProjection };
    if (actions[key]) { event.preventDefault(); actions[key](); }
  }

  document.addEventListener('keydown', keydown);
  addEventListener('resize', resize);
  addEventListener('hashchange', () => {
    const index = slides.findIndex(slide => `#${slide.id}` === location.hash);
    if (index >= 0) goTo(index);
  });
  const actions = { next, prev: previous, speaker: openSpeaker, overview: () => showDialog('overview'), help: () => showDialog('help') };
  document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => actions[button.dataset.action]?.()));
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  const indexList = document.getElementById('overview-list');
  slides.forEach((slide, i) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = slide.dataset.short;
    const detail = document.createElement('small');
    detail.textContent = i < mainCount ? `${duration(i) / 60} min` : 'Anexo opcional';
    button.append(detail);
    button.addEventListener('click', () => { document.getElementById('overview').close(); goTo(i); });
    li.append(button); indexList.append(li);
  });
  document.querySelectorAll('[data-lookup]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-lookup]').forEach(item => { item.setAttribute('aria-pressed', 'false'); item.closest('tr').classList.remove('selected'); });
    button.setAttribute('aria-pressed', 'true'); button.closest('tr').classList.add('selected');
    document.getElementById('lookup-id').textContent = button.dataset.lookup;
    document.getElementById('lookup-vector').textContent = button.dataset.vector;
    updateSpeaker();
  }));
  if (preview) {
    const style = document.createElement('style');
    style.textContent = '.present .toolbar{display:none!important}.present .stage{top:50%!important}.present .fragment{transition:none!important}';
    document.head.append(style);
    const selected = document.querySelector(`[data-lookup="${CSS.escape(params.get('lookup') || '8')}"]`);
    if (selected) selected.click();
  }
  setInterval(updateClock, 1000);
  window.LLMDeck = { goTo, next, previous, openSpeaker, state: () => ({ current, revealed, mainCount, slideCount: slides.length }) };
  resize(); render();
})();
