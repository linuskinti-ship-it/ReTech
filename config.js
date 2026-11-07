// Module : configuration du site (à modifier ici uniquement)
const CONFIG = {
  // Numéro WhatsApp au format international, sans "+" ni espaces
  // 229 = indicatif du Bénin, puis 0197979797
  whatsapp: "2290148155877",
  devise: "FCFA"
};

function lienWhatsApp(texte) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texte)}`;
}
