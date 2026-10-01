const WHATSAPP_NUMBER = "5217203010130";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const generalWhatsAppUrl = whatsappUrl(
  "¡Hola, Studio Ohana! Me gustaría recibir información y una cotización."
);
