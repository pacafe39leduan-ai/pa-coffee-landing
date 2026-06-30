const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

async function loadEditableContent() {
  try {
    const response = await fetch('content/site.json', { cache: 'no-store' });
    if (!response.ok) return;
    const content = await response.json();
    const heroTitle = document.querySelector('#hero-title');
    const heroLead = document.querySelector('#hero-lead');
    const heroImage = document.querySelector('.hero-image');
    const heroSource = document.querySelector('.hero-picture source');
    const phoneLink = document.querySelector('#contact-phone');
    const facebookLink = document.querySelector('#contact-facebook');
    const address = document.querySelector('#contact-address');

    if (heroTitle) {
      heroTitle.replaceChildren(document.createTextNode(content.hero_title_line_1 || 'Hội An thu nhỏ.'));
      heroTitle.append(document.createElement('br'));
      const emphasis = document.createElement('em');
      emphasis.textContent = content.hero_title_line_2 || 'Giữa lòng Phan Thiết.';
      heroTitle.append(emphasis);
    }
    if (heroLead) heroLead.textContent = content.hero_intro;
    if (heroImage && content.hero_image) heroImage.src = content.hero_image;
    if (heroSource && content.hero_image) heroSource.srcset = content.hero_image;
    if (phoneLink) {
      phoneLink.href = `tel:${content.phone_number}`;
      const number = phoneLink.querySelector('strong');
      if (number) number.textContent = content.phone_display;
    }
    if (facebookLink) facebookLink.href = content.facebook_url;
    if (address) address.textContent = content.address;
  } catch (error) {
    console.info('Dùng nội dung mặc định.', error);
  }
}

loadEditableContent();

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -45px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuModal = document.querySelector('#menu-modal');
document.querySelectorAll('[data-open-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    menuModal.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('[data-close-menu]')?.addEventListener('click', () => menuModal.close());
menuModal?.addEventListener('click', (event) => {
  if (event.target === menuModal) menuModal.close();
});
menuModal?.addEventListener('close', () => document.body.classList.remove('modal-open'));

const bookingForm = document.querySelector('#booking-form');
const bookingResult = document.querySelector('#booking-result');
const bookingSummary = document.querySelector('#booking-summary');
const copyBooking = document.querySelector('#copy-booking');

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const rawTime = data.get('time');
  const dateText = rawTime
    ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(rawTime))
    : 'P.A tư vấn giúp';
  const summary = [
    'Xin chào P.A Tea & Coffee,',
    `Mình là ${data.get('name')} — SĐT: ${data.get('phone')}.`,
    `Nhu cầu: ${data.get('service')}.`,
    `Thời gian: ${dateText}.`,
    data.get('note') ? `Ghi chú: ${data.get('note')}` : '',
    'P.A xác nhận giúp mình nhé!'
  ].filter(Boolean).join('\n');
  bookingSummary.textContent = summary;
  bookingResult.hidden = false;
  bookingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

copyBooking?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bookingSummary.textContent);
    copyBooking.textContent = 'Đã sao chép ✓';
    setTimeout(() => { copyBooking.textContent = 'Sao chép nội dung'; }, 1800);
  } catch {
    copyBooking.textContent = 'Hãy chọn và sao chép nội dung phía trên';
  }
});
