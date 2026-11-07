// Module : formulaire "Donner vos déchets"
const form = document.getElementById("formDon");
const inputImage = document.getElementById("image");
const apercu = document.getElementById("apercu");
const message = document.getElementById("message");
const btnLoc = document.getElementById("btnLoc");
const champLoc = document.getElementById("localisation");

function afficherMessage(texte, erreur = false) {
  message.textContent = texte;
  message.className = "message" + (erreur ? " erreur" : "");
  message.style.display = "block";
}

// Aperçu de l'image choisie
inputImage.addEventListener("change", () => {
  const fichier = inputImage.files[0];
  if (!fichier) { apercu.style.display = "none"; return; }
  const lecteur = new FileReader();
  lecteur.onload = () => {
    apercu.src = lecteur.result;
    apercu.style.display = "block";
  };
  lecteur.readAsDataURL(fichier);
});

// Localisation automatique (optionnelle)
btnLoc.addEventListener("click", () => {
  if (!navigator.geolocation) {
    afficherMessage("La géolocalisation n'est pas disponible.", true);
    return;
  }
  btnLoc.textContent = "...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      champLoc.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
      btnLoc.textContent = "📍 Me localiser";
    },
    () => {
      btnLoc.textContent = "📍 Me localiser";
      afficherMessage("Impossible de vous localiser. Saisissez l'adresse.", true);
    }
  );
});

// Envoi du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const numero = document.getElementById("numero").value.trim();
  if (!/^[+0-9 ]{8,15}$/.test(numero)) {
    afficherMessage("Numéro de téléphone invalide.", true);
    return;
  }

  const demande = {
    nom: document.getElementById("nom").value.trim(),
    numero,
    image: apercu.src || "",
    localisation: champLoc.value.trim(),
    type: form.querySelector('input[name="type"]:checked').value,
    date: new Date().toISOString()
  };

  // Envoi sur WhatsApp (le texte est pré-rempli, il reste à appuyer sur "Envoyer")
  const texte =
    `♻️ Nouvelle proposition ReTech\n` +
    `Type : ${demande.type === "don" ? "Don" : "Vente"}\n` +
    `Nom : ${demande.nom}\n` +
    `Téléphone : ${demande.numero}\n` +
    `Localisation : ${demande.localisation}\n` +
    `(Photo du déchet jointe ci-après)`;

  window.open(lienWhatsApp(texte), "_blank");
  afficherMessage(
    "WhatsApp s'ouvre avec votre message. Pensez à joindre la photo du déchet dans la conversation avant d'envoyer."
  );
});
