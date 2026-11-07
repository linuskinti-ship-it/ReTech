// Module : catalogue (défilement), sélection et commande WhatsApp
const panier = {}; // { idComposant: quantité }
const piste = document.getElementById("piste");

function formatPrix(n) {
  return n.toLocaleString("fr-FR") + " " + CONFIG.devise;
}

function creerCarte(c) {
  return `
    <article class="carte" data-id="${c.id}">
      <div class="visuel">
        <img src="${c.photo}" alt="${c.nom}"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'icone-svg',innerHTML:ICONES['${c.icone}']}))">
      </div>
      <h3>${c.nom}</h3>
      <small>issu de : ${c.source}</small>
      <p class="prix">${formatPrix(c.prix)} <span>${c.unite}</span></p>
      <div class="actions">
        <button class="btn-choisir" data-action="ajouter">Sélectionner</button>
        <div class="qte" hidden>
          <button data-action="moins" aria-label="Diminuer">−</button>
          <span>0</span>
          <button data-action="plus" aria-label="Augmenter">+</button>
        </div>
      </div>
    </article>`;
}

function afficherCatalogue() {
  piste.innerHTML = COMPOSANTS.map(creerCarte).join("");
}

function afficherEtapes() {
  document.getElementById("etapes").innerHTML = ETAPES.map((e, i) => `
    <div class="etape">
      <div class="visuel-etape">
        <img src="${e.photo}" alt="${e.titre}"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'emoji-etape',textContent:'${e.emoji}'}))">
      </div>
      <div class="num">${i + 1}</div>
      <h3>${e.titre}</h3>
      <p>${e.texte}</p>
    </div>`).join("");
}

// ----- Panier -----
function majCarte(id) {
  const carte = piste.querySelector(`[data-id="${id}"]`);
  const qte = panier[id] || 0;
  carte.classList.toggle("selectionnee", qte > 0);
  carte.querySelector(".qte").hidden = qte === 0;
  carte.querySelector(".btn-choisir").hidden = qte > 0;
  carte.querySelector(".qte span").textContent = qte;
}

function majBarre() {
  let nb = 0, total = 0;
  for (const id in panier) {
    const c = COMPOSANTS.find(x => x.id === id);
    nb += panier[id];
    total += panier[id] * c.prix;
  }
  const barre = document.getElementById("barrePanier");
  barre.classList.toggle("visible", nb > 0);
  document.getElementById("resumePanier").textContent =
    `${nb} article${nb > 1 ? "s" : ""} — ${formatPrix(total)}`;
}

function changerQte(id, delta) {
  const q = Math.max(0, (panier[id] || 0) + delta);
  if (q === 0) delete panier[id]; else panier[id] = q;
  majCarte(id);
  majBarre();
}

piste.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.closest(".carte").dataset.id;
  const action = btn.dataset.action;
  if (action === "ajouter" || action === "plus") changerQte(id, 1);
  if (action === "moins") changerQte(id, -1);
});

document.getElementById("btnCommander").addEventListener("click", () => {
  let total = 0;
  const lignes = Object.keys(panier).map(id => {
    const c = COMPOSANTS.find(x => x.id === id);
    const sous = panier[id] * c.prix;
    total += sous;
    return `- ${c.nom} (${c.unite}) x${panier[id]} = ${formatPrix(sous)}`;
  });
  const texte = `Bonjour ReTech, je souhaite acheter :\n${lignes.join("\n")}\n\nTotal : ${formatPrix(total)}`;
  window.open(lienWhatsApp(texte), "_blank");
});

// ----- Défilement horizontal -----
const pas = () => piste.clientWidth * 0.7;
document.getElementById("prec").addEventListener("click", () => piste.scrollBy({ left: -pas(), behavior: "smooth" }));
document.getElementById("suiv").addEventListener("click", () => piste.scrollBy({ left: pas(), behavior: "smooth" }));

afficherCatalogue();
afficherEtapes();
