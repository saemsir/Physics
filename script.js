const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.count);
    const start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (end - start) * eased).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, {threshold: 0.35});

counters.forEach(el => counterObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const enquiryForm = document.getElementById('enquiryForm');
const formStatus = document.getElementById('formStatus');

enquiryForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = enquiryForm.querySelector('button[type="submit"]');
  const originalLabel = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending…';
  formStatus.textContent = '';

  try {
    const formData = new FormData(enquiryForm);
    const response = await fetch(enquiryForm.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });
    const data = await response.json();

    if (data.success) {
      formStatus.textContent = 'Enquiry sent successfully. We will get back to you.';
      enquiryForm.reset();
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (error) {
    formStatus.textContent = 'Could not send right now. Please use WhatsApp or call +91 7033131480.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
