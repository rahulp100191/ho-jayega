'use strict';
const services=['Premium Home Management','Personal Lifestyle Manager','Household Staff Management','Premium Parent Care','Luxury Property Management','Private Event Concierge','Executive Personal Assistant','Relocation Concierge','Premium Travel Concierge','NRI & Overseas Family Support'];
let returnFocus = null;
let invitationStep = 0;
const invitation = document.querySelector('#invitation');
const invitationForm = document.querySelector('#invitation-form');
const invitationFallback = document.querySelector('#invitation-fallback');
const invitationError = document.querySelector('#invitation-error');
services.forEach(service => {
  const label = document.createElement('label');
  label.className = 'service-option';
  const input = document.createElement('input');
  input.type = 'checkbox'; input.name = 'services'; input.value = service;
  label.append(input, document.createTextNode(service));
  document.querySelector('#invitation-services').append(label);
});
function showInvitationStep(step, focus = true) {
  invitationStep = step;
  invitationError.textContent = '';
  invitationFallback.hidden = true;
  invitationForm.querySelectorAll('[data-invitation-step]').forEach(panel => {
    const active = Number(panel.dataset.invitationStep) === step;
    panel.hidden = !active;
    panel.querySelectorAll('input').forEach(input => input.disabled = !active);
  });
  document.querySelectorAll('[data-invitation-step-label]').forEach(label => {
    if (Number(label.dataset.invitationStepLabel) === step) label.setAttribute('aria-current', 'step');
    else label.removeAttribute('aria-current');
  });
  document.querySelector('#invitation-back').hidden = step === 0;
  document.querySelector('#invitation-next').textContent = step === 0 ? 'Continue →' : 'Send request via WhatsApp ↗';
  invitation.scrollTop = 0;
  if (focus) invitationForm.querySelector('[data-invitation-step]:not([hidden]) input').focus();
}
showInvitationStep(0, false);
document.querySelector('#invitation-back').addEventListener('click', () => showInvitationStep(0));
document.querySelectorAll('[data-invite], [data-book]').forEach(button => {
  button.addEventListener('click', () => {
    returnFocus = button;
    if (button.dataset.book) invitationForm.querySelectorAll('[name=services]').forEach(input => input.checked = input.value === button.dataset.book);
    showInvitationStep(0, false);
    invitation.showModal();
    document.body.classList.add('modal-open');
  });
});
invitationForm.addEventListener('input', () => {
  invitationFallback.hidden = true;
  invitationError.textContent = '';
  [...invitationForm.elements].forEach(input => {
    if (typeof input.setCustomValidity === 'function') input.setCustomValidity('');
  });
});
invitationForm.addEventListener('submit', event => {
  event.preventDefault();
  invitationError.textContent = '';
  const selected = [...invitationForm.querySelectorAll('[name=services]:checked')].map(input => input.value);
  if (!selected.length) {
    showInvitationStep(0, false);
    invitationError.textContent = 'Please choose at least one service to continue.';
    return;
  }
  if (invitationStep === 0) { showInvitationStep(1); return; }
  const fields = ['name', 'phone', 'email', 'company', 'designation', 'city'];
  const data = {};
  for (const field of fields) {
    const input = invitationForm.elements.namedItem(field);
    data[field] = input.value.trim();
    input.setCustomValidity(data[field] ? '' : 'Please fill out this field.');
  }
  const phone = invitationForm.elements.namedItem('phone');
  const digits = data.phone.replace(/\D/g, '');
  if (data.phone && (digits.length < 7 || digits.length > 15 || !/^[+\d\s().-]+$/.test(data.phone))) {
    phone.setCustomValidity('Please enter a valid phone number with your country code.');
  }
  if (!invitationForm.reportValidity()) return;
  const message = `Hello Ho Jayega, I would like to request an invitation.\n\nServices: ${selected.join(', ')}\nName: ${data.name}\nNumber: ${data.phone}\nEmail: ${data.email}\nCompany: ${data.company}\nDesignation: ${data.designation}\nCity: ${data.city}`;
  const url = `https://wa.me/919760575646?text=${encodeURIComponent(message)}`;
  invitationFallback.href = url;
  invitationFallback.hidden = false;
  window.open(url, '_blank', 'noopener,noreferrer');
});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(returnFocus)returnFocus.focus();});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
const menu=document.querySelector('.menu-toggle'),navigation=document.querySelector('#navigation');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});navigation.addEventListener('click',event=>{if(event.target.closest('a,button')){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}});document.addEventListener('keydown',event=>{if(event.key==='Escape'){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}});document.querySelector('#year').textContent=new Date().getFullYear();
const info={privacy:{title:'Your privacy, considered.',content:'<p>The consultation form keeps your entries in this page’s memory while it is open. They are not saved to a database or browser storage. Reloading the page clears them.</p><p>When you choose “Send request via WhatsApp”, your entered details are included in a prepared WhatsApp message. You must send it in WhatsApp for Ho Jayega to receive it. WhatsApp processes this information under its own privacy policy.</p><p>Ho Jayega uses details you send to respond to your enquiry and arrange the requested services. Please avoid sharing medical records, identity documents or payment details in this form. For questions about information you have shared, contact +91 97605 75646.</p><p>This page uses Google Fonts; your browser connects to Google to load these fonts. The website is hosted on Vercel, which may process standard technical request information to serve the site.</p>'},credits:{title:'Photography & provenance.',content:'<p>The home photograph is illustrative stock imagery from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>. It does not depict an HJ client or managed property, and is not presented as a photograph of a home in Guwahati.</p><p>Guwahati photograph: <a href="https://commons.wikimedia.org/wiki/File:Sunset_from_the_bank_of_Brahmaputra.jpg" target="_blank" rel="noopener noreferrer">Sunset from the bank of Brahmaputra</a> by Srabanti.basak, licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Shown with a responsive crop and reduced saturation.</p>'}};
document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;const item=info[button.dataset.info];document.querySelector('#info-title').textContent=item.title;document.querySelector('#info-content').innerHTML=item.content;document.querySelector('#info-dialog').showModal();document.body.classList.add('modal-open');}));

// Audience and conversation tabs support pointer and keyboard navigation.
document.querySelectorAll('[role="tablist"]').forEach(tablist => {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== undefined) { event.preventDefault(); selectTab(tabs[nextIndex], true); }
    });
  });
});

document.querySelectorAll('[data-service-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.serviceFilter;
    let count = 0;
    document.querySelectorAll('[data-service-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-service-group]').forEach(service => {
      service.hidden = filter !== 'all' && service.dataset.serviceGroup !== filter;
      if (!service.hidden) count++;
      else service.open = false;
    });
    document.querySelector('.service-count').textContent = filter === 'all' ? 'Showing all 10 services' : `Showing ${count} services`;
  });
});

const siteHeader = document.querySelector('.header');
const scrollProgress = document.querySelector('.scroll-progress');
let scrollScheduled = false;
function updateScroll() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 140);
  const available = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; window.requestAnimationFrame(updateScroll); }
}, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('[data-reveal]').forEach(item => revealObserver.observe(item));
}
document.addEventListener('click', event => {
  if (!siteHeader.contains(event.target)) { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
});
