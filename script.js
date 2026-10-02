// Informe o WhatsApp oficial com código do país e DDD para ativar o atendimento direto.
const WHATSAPP_NUMBER = '';
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
