// WhatsApp oficial informado pela organização, com país e DDD.
const WHATSAPP_NUMBER = '558698091567';
const prices = { '01': '1.500,00', '02': '2.500,00', '03': '6.500,00' };
const dialog = document.querySelector('#interest-dialog');
const message = document.querySelector('#interest-message');
const status = document.querySelector('#copy-status');
document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    const plan = button.dataset.plan;
    const benefits = plan === '03' ? '2 ingressos, stand no padrão do evento e ativação de marca' : plan === '02' ? '2 ingressos' : '1 ingresso';
    const text = `Olá! Tenho interesse na Cota ${plan} do Check-in 360 Destinos Piauí, no valor de R$ ${prices[plan]}, com ${benefits}. Gostaria de saber como confirmar a participação da minha empresa.`;
    if (/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    document.querySelector('#selected-plan').textContent = plan;
    message.value = text;
    status.textContent = '';
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message.value);
    status.textContent = 'Mensagem copiada! Encaminhe à organização para consultar sua participação.';
  } catch {
    message.focus();
    message.select();
    status.textContent = 'Selecione e copie a mensagem para encaminhar à organização.';
  }
});

// Animações progressivas: o conteúdo continua acessível sem JavaScript.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let effectsPaused = reducedMotion.matches;
const motionToggle = document.querySelector('#motion-toggle');
const animatedCounters = new Set();
function syncMotion() {
  document.documentElement.classList.toggle('motion-paused', effectsPaused);
  motionToggle.setAttribute('aria-pressed', String(effectsPaused));
  motionToggle.innerHTML = effectsPaused ? 'Ativar efeitos <span aria-hidden="true">▷</span>' : 'Pausar efeitos <span aria-hidden="true">Ⅱ</span>';
}
syncMotion();
motionToggle.addEventListener('click', () => { effectsPaused = !effectsPaused; syncMotion(); });
reducedMotion.addEventListener('change', event => { effectsPaused = event.matches; syncMotion(); });

function animateCounter(element) {
  if (animatedCounters.has(element)) return;
  animatedCounters.add(element);
  if (effectsPaused) return;
  const target = Number(element.dataset.count);
  const padding = Number(element.dataset.pad || 0);
  const started = performance.now();
  const step = now => {
    const progress = Math.min((now - started) / 1100, 1);
    const value = effectsPaused ? target : Math.round(target * (1 - (1 - progress) ** 3));
    element.textContent = String(value).padStart(padding, '0');
    if (progress < 1 && !effectsPaused) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    if (!effectsPaused) element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
}

const progressBar = document.querySelector('.reading-progress');
const mobileCTA = document.querySelector('.mobile-cta');
const hero = document.querySelector('.hero');
const tiers = document.querySelector('#cotas');
let scrollPending = false;
function updateScrollUI() {
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0})`;
  const tierRect = tiers.getBoundingClientRect();
  const tiersVisible = tierRect.top < innerHeight && tierRect.bottom > 0;
  mobileCTA.hidden = !(innerWidth < 768 && hero.getBoundingClientRect().bottom < 0 && !tiersVisible);
  scrollPending = false;
}
function scheduleScrollUI() { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScrollUI); } }
window.addEventListener('scroll', scheduleScrollUI, { passive: true });
window.addEventListener('resize', scheduleScrollUI, { passive: true });
updateScrollUI();

if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.plan:not(.featured)').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (effectsPaused) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    });
  });
}

const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const galleryCaption = document.querySelector('#gallery-caption');
const galleryItems = [...document.querySelectorAll('[data-gallery]')];
let currentImage = 0;
function showGalleryImage(index) {
  currentImage = (index + galleryItems.length) % galleryItems.length;
  const source = galleryItems[currentImage].querySelector('img');
  galleryImage.src = source.getAttribute('src');
  galleryImage.alt = source.alt;
  galleryCaption.textContent = `${currentImage + 1} / ${galleryItems.length} · ${source.alt}`;
}
galleryItems.forEach((button, index) => button.addEventListener('click', () => {
  showGalleryImage(index);
  galleryDialog.showModal();
}));
galleryDialog.querySelector('.dialog-close').addEventListener('click', () => galleryDialog.close());
document.querySelector('#gallery-prev').addEventListener('click', () => showGalleryImage(currentImage - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showGalleryImage(currentImage + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showGalleryImage(currentImage + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
galleryDialog.addEventListener('click', event => {
  const rect = galleryDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) galleryDialog.close();
});
let touchStart = null;
galleryImage.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, { passive: true });
galleryImage.addEventListener('touchend', event => {
  if (touchStart === null) return;
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 55) showGalleryImage(currentImage + (distance < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
