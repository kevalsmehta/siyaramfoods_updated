const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const filters=document.querySelectorAll('.filter');
const cards=document.querySelectorAll('.product-card');
filters.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filters.forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    cards.forEach(card=>{
      card.classList.toggle('hidden', f!=='all' && card.dataset.category!==f);
    });
  });
});

document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    img.style.display='none';
    img.parentElement.style.background='linear-gradient(135deg,#eef7e8,#dcefd1)';
  });
});
document.getElementById('year').textContent=new Date().getFullYear();


// Enquiry form: sends all submitted details to info@siyaramfoods.in via FormSubmit.
const enquiryForm = document.getElementById('enquiryForm');
const formStatus = document.getElementById('formStatus');
const sendEnquiryBtn = document.getElementById('sendEnquiryBtn');
const replyTo = document.getElementById('replyTo');
const enquiryEmail = document.getElementById('enquiryEmail');

enquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;

  if (replyTo && enquiryEmail) replyTo.value = enquiryEmail.value;
  sendEnquiryBtn.disabled = true;
  sendEnquiryBtn.textContent = 'Sending…';
  formStatus.className = 'form-status sending';
  formStatus.textContent = 'Sending your enquiry…';

  try {
    const response = await fetch(enquiryForm.action, {
      method: 'POST',
      body: new FormData(enquiryForm),
      headers: { 'Accept': 'application/json' }
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'Unable to send enquiry.');
    }

    enquiryForm.reset();
    formStatus.className = 'form-status success';
    formStatus.textContent = 'Thank you! Your enquiry has been sent to Siyaram Foods. We will contact you soon.';
  } catch (error) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'We could not send the enquiry right now. Please email info@siyaramfoods.in directly.';
  } finally {
    sendEnquiryBtn.disabled = false;
    sendEnquiryBtn.textContent = 'Send Enquiry';
  }
});


// WhatsApp enquiry: opens WhatsApp with all enquiry details pre-filled.
const whatsappEnquiryBtn = document.getElementById('whatsappEnquiryBtn');
whatsappEnquiryBtn?.addEventListener('click', () => {
  if (!enquiryForm?.reportValidity()) return;

  const data = new FormData(enquiryForm);
  const name = (data.get('Name') || '').toString().trim();
  const company = (data.get('Company') || '').toString().trim();
  const email = (data.get('Email') || '').toString().trim();
  const phone = (data.get('Phone') || '').toString().trim();
  const requirement = (data.get('Requirement') || '').toString().trim();
  const quantity = (data.get('Quantity_Packing') || '').toString().trim();

  const message = [
    'Hello Siyaram Foods,',
    '',
    'I would like to send an enquiry.',
    '',
    `Name: ${name}`,
    `Company: ${company || 'Not provided'}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    `Product / Requirement: ${requirement}`,
    `Quantity / Packing Requirement: ${quantity || 'Not provided'}`,
  ].join('\n');

  const whatsappUrl = `https://wa.me/919322791077?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
