// ===== MES PROJETS =====
// Chaque projet est une « fiche technique ». Décommentez le modèle, remplissez-le, copiez-le pour en ajouter.
// domaine : "Mécanique", "Électronique", "Énergie" ou "Logiciel" (crée automatiquement les filtres)
// images : photos / schémas à mettre dans le dossier images/ (ex. "images/banc-essai.jpg")
const projets = [
  // {
  //   titre: "Nom du projet",
  //   domaine: "Électronique",
  //   contexte: "Pourquoi ce projet ? Quel problème ou quel besoin ?",
  //   realisation: "Ce que j'ai fait : étapes, démarche, schéma, mesures.",
  //   resultat: "Ce que ça donne : valeurs mesurées, fonctionnement, retour d'expérience.",
  //   outils: ["Proteus", "Arduino IDE"],
  //   images: ["images/projet1.jpg"],
  //   lien: "https://github.com/votre-pseudo/projet",
  //   libelleLien: "Voir sur GitHub"
  // },
];

const grid = document.getElementById("projects-grid");
const filtres = document.getElementById("filters");

function ligne(dl, label, texte) {
  if (!texte) return;
  const dt = document.createElement("dt"); dt.textContent = label;
  const dd = document.createElement("dd"); dd.textContent = texte;
  dl.append(dt, dd);
}

function creerCarte(p) {
  const carte = document.createElement("article");
  carte.className = "card";
  carte.dataset.domaine = p.domaine || "";
  if (p.images && p.images[0]) {
    const img = document.createElement("img");
    img.src = p.images[0]; img.alt = p.titre; img.loading = "lazy";
    carte.appendChild(img);
  }
  const corps = document.createElement("div");
  corps.className = "card-body";
  if (p.domaine) { const b = document.createElement("span"); b.className = "badge"; b.textContent = p.domaine; corps.appendChild(b); }
  const titre = document.createElement("h3"); titre.textContent = p.titre; corps.appendChild(titre);
  const dl = document.createElement("dl"); dl.className = "fiche";
  ligne(dl, "Contexte", p.contexte);
  ligne(dl, "Ce que j’ai fait", p.realisation);
  ligne(dl, "Résultat", p.resultat);
  corps.appendChild(dl);
  if (p.images && p.images.length > 1) {
    const g = document.createElement("div"); g.className = "gallery";
    p.images.slice(1).forEach(src => { const i = document.createElement("img"); i.src = src; i.alt = p.titre; i.loading = "lazy"; g.appendChild(i); });
    corps.appendChild(g);
  }
  if (p.lien) {
    const a = document.createElement("a");
    a.href = p.lien; a.target = "_blank"; a.rel = "noopener"; a.className = "card-links";
    a.textContent = p.libelleLien || "Voir le projet";
    corps.appendChild(a);
  }
  if (p.outils && p.outils.length) {
    const ul = document.createElement("ul"); ul.className = "tags";
    p.outils.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    corps.appendChild(ul);
  }
  carte.appendChild(corps);
  return carte;
}

function afficher(domaine) {
  grid.querySelectorAll(".card").forEach(c => { c.hidden = domaine !== "Tous" && c.dataset.domaine !== domaine; });
  filtres.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.d === domaine));
}

if (projets.length === 0) {
  const vide = document.createElement("p");
  vide.className = "empty";
  vide.textContent = "Les projets arrivent bientôt.";
  grid.appendChild(vide);
} else {
  projets.forEach(p => grid.appendChild(creerCarte(p)));
  const domaines = ["Tous", ...new Set(projets.map(p => p.domaine).filter(Boolean))];
  if (domaines.length > 2) {
    domaines.forEach(d => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = d; b.dataset.d = d;
      b.addEventListener("click", () => afficher(d));
      filtres.appendChild(b);
    });
    afficher("Tous");
  }
}

// Menu mobile
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const ouvert = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", ouvert);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  btn.setAttribute("aria-expanded", false);
}));

document.getElementById("year").textContent = new Date().getFullYear();


// Préférence de confidentialité : aucun cookie ni traceur tiers n'est installé.
const cookieBanner = document.getElementById("cookie-banner");
const consentKey = "linus-portfolio-privacy-choice-v1";
try {
  if (cookieBanner && !localStorage.getItem(consentKey)) cookieBanner.hidden = false;
  ["cookie-accept", "cookie-reject"].forEach(id => {
    const control = document.getElementById(id);
    if (control) control.addEventListener("click", () => {
      try { localStorage.setItem(consentKey, id === "cookie-accept" ? "accepted" : "rejected"); }
      catch (error) { /* Le site reste utilisable si le stockage local est désactivé. */ }
      if (cookieBanner) cookieBanner.hidden = true;
    });
  });
} catch (error) {
  if (cookieBanner) cookieBanner.hidden = false;
}
