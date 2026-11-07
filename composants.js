// Module : catalogue des composants et étapes (modifiable facilement)
//
// Pour utiliser vos vraies photos : créez un dossier "photos" à côté de index.html,
// ajoutez-y les images (ex. photos/condensateur.jpg) et gardez le même nom ci-dessous.
// Tant qu'une photo n'existe pas, une icône est affichée à la place.

const ICONES = {
  condensateur: `<svg viewBox="0 0 64 64"><rect x="20" y="8" width="24" height="38" rx="5" fill="#2b6cb0"/><rect x="20" y="8" width="8" height="38" rx="4" fill="#9ec5f0"/><path d="M26 46v12M38 46v12" stroke="#ccc" stroke-width="3"/></svg>`,
  resistance: `<svg viewBox="0 0 64 64"><path d="M4 32h14M46 32h14" stroke="#ccc" stroke-width="3"/><rect x="16" y="22" width="32" height="20" rx="9" fill="#d9b382"/><rect x="22" y="22" width="4" height="20" fill="#c0392b"/><rect x="30" y="22" width="4" height="20" fill="#222"/><rect x="38" y="22" width="4" height="20" fill="#f1c40f"/></svg>`,
  led: `<svg viewBox="0 0 64 64"><path d="M22 36V18a10 10 0 0 1 20 0v18z" fill="#ff4d4d"/><rect x="18" y="36" width="28" height="5" rx="2" fill="#d63a3a"/><path d="M26 41v18M38 41v14" stroke="#ccc" stroke-width="3"/></svg>`,
  circuit: `<svg viewBox="0 0 64 64"><rect x="16" y="14" width="32" height="36" rx="3" fill="#222"/><circle cx="24" cy="22" r="3" fill="#777"/><path d="M8 20h8M8 28h8M8 36h8M8 44h8M48 20h8M48 28h8M48 36h8M48 44h8" stroke="#ccc" stroke-width="3"/></svg>`,
  transistor: `<svg viewBox="0 0 64 64"><path d="M16 36V22a16 16 0 0 1 32 0v14z" fill="#333"/><path d="M16 36h32v4H16z" fill="#555"/><path d="M22 40v18M32 40v18M42 40v18" stroke="#ccc" stroke-width="3"/></svg>`,
  connecteur: `<svg viewBox="0 0 64 64"><rect x="8" y="22" width="48" height="22" rx="3" fill="#444"/><g fill="#e0c060"><rect x="14" y="26" width="4" height="14"/><rect x="22" y="26" width="4" height="14"/><rect x="30" y="26" width="4" height="14"/><rect x="38" y="26" width="4" height="14"/><rect x="46" y="26" width="4" height="14"/></g></svg>`,
  bobine: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#222"/><circle cx="32" cy="32" r="15" fill="none" stroke="#c8873a" stroke-width="6"/><circle cx="32" cy="32" r="6" fill="#222"/></svg>`,
  diode: `<svg viewBox="0 0 64 64"><path d="M4 32h14M46 32h14" stroke="#ccc" stroke-width="3"/><rect x="16" y="23" width="32" height="18" rx="4" fill="#222"/><rect x="38" y="23" width="6" height="18" fill="#ddd"/></svg>`
};

const COMPOSANTS = [
  { id: "cond", nom: "Résistances", prix: 75, unite: "l'unité", source: "Cartes mères\n", photo: "resistances-valeurs-courantes.jpeg" },
  { id: "res",  nom: "Condensateurs-ceramiques", prix: 400, unite: "lot de 10", source: "Plaquettes électroniques\n", photo: "condensateurs-ceramiques.jpeg", icone: "resistance" },
  { id: "led",  nom: "Condensateurs-film", prix: 50, unite: "l'unité", source: "Plaquettes électroniques\n", photo: "condensateurs-film.jpeg", icone: "led" },
  { id: "ci",   nom: "Condensateurs-électrolytique", prix: 100, unite: "l'unité", source: "Plaquettes/chargeurs\n", photo: "Capture d’écran_6-11-2026_15522_www.bing.com.jpeg", icone: "circuit" },
  { id: "tr",   nom: "Fusibles", prix: 200, unite: "l'unité", source: "Radios & chargeurs\n", photo: "fusibles.jpeg", icone: "transistor" },
  { id: "con",  nom: "Inductances-et-selfs", prix: 300, unite: "l'unité", source: "Régulateurs/Onduleurs\n", photo: "inductances-et-selfs.jpeg", icone: "connecteur" },
  { id: "bob",  nom: "Potentiometres", prix: 500, unite: "l'unité", source: "Alimentations\n", photo: "potentiometres.jpeg", icone: "bobine" },
  { id: "dio",  nom: "Quartz", prix: 100, unite: "lot de 5", source: "Déchets électroniques\n", photo: "quartz.jpeg", icone: "diode" }
];

// Images des étapes : mettez vos photos dans le dossier "photos" avec ces noms.
const ETAPES = [
  { titre: "Collecte", texte: "Nous récupérons plaquettes et déchets électroniques.", photo: "GettyImages-1080141566.width-358.jpg", emoji: "🚚" },
  { titre: "Démontage", texte: "Les composants sont retirés avec soin.", photo: "i-img1200x900-1682866859gcyuih861013.jpg", emoji: "🔧" },
  { titre: "Test & tri", texte: "Chaque pièce est vérifiée et classée.", photo: "IMG_20260908_110342_059@2130601345.jpg", emoji: "🔬" },
  { titre: "Vente", texte: "Les composants recyclés sont prêts à être achetés.", photo: "Capture d’écran_7-11-2026_10247_www.bing.com.jpeg", emoji: "🛒" }
];
