'use strict';
const services=['Premium Home Management','Personal Lifestyle Manager','Household Staff Management','Premium Parent Care','Luxury Property Management','Private Event Concierge','Executive Personal Assistant','Relocation Concierge','Premium Travel Concierge','NRI & Overseas Family Support'];
const booking=document.querySelector('#booking'),form=document.querySelector('#consultation-form'),error=document.querySelector('#form-error'),next=document.querySelector('#booking-next'),back=document.querySelector('#booking-back');
let currentStep=0,returnFocus=null;
services.forEach(service=>{const label=document.createElement('label');label.className='service-option';const input=document.createElement('input');input.type='checkbox';input.name='services';input.value=service;label.append(input,document.createTextNode(service));document.querySelector('#service-options').append(label);});
function selectedServices(){return [...form.querySelectorAll('[name="services"]:checked')].map(input=>input.value);}
function dateInZone(zone){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=type=>parts.find(p=>p.type===type).value;return `${get('year')}-${get('month')}-${get('day')}`;}
function timezone(){return form.elements.timezone.value==='other'?form.elements.otherTimezone.value.trim():form.elements.timezone.value;}
function updateDateMinimum(){const zone=form.elements.timezone.value;form.elements.date.min=dateInZone(zone==='other'?'Asia/Kolkata':zone);}
function details(){return{services:selectedServices().join(', '),name:form.elements.namedItem('name').value.trim(),phone:form.elements.phone.value.trim(),email:form.elements.email.value.trim(),city:form.elements.city.value.trim(),date:form.elements.date.value,time:form.elements.time.value,timezone:timezone(),notes:form.elements.notes.value.trim()};}
function requestMessage(data){return `Hello Ho Jayega, I would like to request a private 20-minute consultation.\n\nServices: ${data.services}\nName: ${data.name}\nPhone / WhatsApp: ${data.phone}\n${data.email?`Email: ${data.email}\n`:''}Based in: ${data.city}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nTime zone: ${data.timezone}\n${data.notes?`\nAdditional details: ${data.notes}\n`:''}\nPlease confirm availability and share the call details. I understand this is a request and the time is confirmed only after your reply.`;}
function renderReview(){const data=details(),review=document.querySelector('#booking-review');review.replaceChildren();const rows=[['Services',data.services],['Your details',`${data.name}\n${data.phone}${data.email?'\n'+data.email:''}\n${data.city}`],['Preferred consultation',`${data.date} at ${data.time}\nTime zone: ${data.timezone}`]];if(data.notes)rows.push(['Additional details',data.notes]);rows.forEach(([title,value])=>{const dt=document.createElement('dt');dt.textContent=title;const dd=document.createElement('dd');dd.textContent=value;review.append(dt,dd);});}
function showStep(step,focus=true){currentStep=step;error.textContent='';form.querySelectorAll('.form-step').forEach(section=>{const active=Number(section.dataset.step)===step;section.hidden=!active;section.querySelectorAll('input,select,textarea').forEach(input=>input.disabled=!active);});document.querySelectorAll('[data-step-label]').forEach(label=>{if(Number(label.dataset.stepLabel)===step)label.setAttribute('aria-current','step');else label.removeAttribute('aria-current');});back.hidden=step===0;next.textContent=step===2?'Send request via WhatsApp ↗':'Continue →';document.querySelector('#whatsapp-fallback').hidden=true;if(step===2)renderReview();if(focus){booking.scrollTop=0;(form.querySelector('.form-step:not([hidden]) input, .form-step:not([hidden]) h3')||next).focus();}}
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;if(button.dataset.book)form.querySelectorAll('[name="services"]').forEach(input=>input.checked=input.value===button.dataset.book);updateDateMinimum();showStep(0,false);booking.showModal();document.body.classList.add('modal-open');}));
back.addEventListener('click',()=>showStep(Math.max(0,currentStep-1)));
form.elements.timezone.addEventListener('change',()=>{const other=form.elements.timezone.value==='other';document.querySelector('#other-timezone-label').hidden=!other;form.elements.otherTimezone.required=other;updateDateMinimum();});
form.addEventListener('submit',event=>{event.preventDefault();error.textContent='';if(currentStep===0){if(!selectedServices().length){error.textContent='Please choose at least one service to continue.';return;}showStep(1);return;}if(!form.reportValidity())return;if(currentStep===1){if(!form.elements.namedItem('name').value.trim()||!form.elements.city.value.trim()){error.textContent='Please enter your name and city.';return;}const digits=form.elements.phone.value.replace(/\D/g,'');if(digits.length<7||digits.length>15||!(/^[+\d\s().-]+$/).test(form.elements.phone.value)){error.textContent='Please enter a valid phone number with your country code.';form.elements.phone.focus();return;}if(form.elements.timezone.value==='other'&&!form.elements.otherTimezone.value.trim()){error.textContent='Please specify your time zone.';return;}const zone=form.elements.timezone.value;if(zone!=='other'){const today=dateInZone(zone),time=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date());if(form.elements.date.value<today||(form.elements.date.value===today&&form.elements.time.value<=time)){error.textContent='Please choose a future date and time in your selected time zone.';return;}}showStep(2);return;}const url=`https://wa.me/919760575646?text=${encodeURIComponent(requestMessage(details()))}`;const fallback=document.querySelector('#whatsapp-fallback');fallback.href=url;fallback.hidden=false;window.open(url,'_blank','noopener,noreferrer');next.textContent='Open WhatsApp again ↗';});
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
