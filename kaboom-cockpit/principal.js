kaboom({
   background: [0, 0, 0],
   //    width: 600,
   //    height: 600,
   //    stretch : true
});

// variables globales
const w = width();
const h = height();

const centreX = w / 2;
const centreY = h / 2;

let vitesse = 0;
const vitesseMax = 200;
const carburantMax = 400;

// chargement des assets
loadRoot("assets/");
loadSprite("cockpit", "cocpkit.png");
loadSprite("espace", "fond_spatial.jpg");
loadSprite("planete", "planete.png");

let moteur = loadSound("moteur", "space-sound-109576.mp3");

// sauvegarder une donnée en localStorage
// tester si la clef existe déjà
if (localStorage.getItem("carburant") === null) {
   // puisqu'elle n'existe pas, créer la clef
   // et attribbuer la valeur
   localStorage.setItem("carburant", carburantMax);
   localStorage.setItem("distancePlanete", "0.1");
}

// stocker les valeurs dans des variables
let carburant = Number(localStorage.carburant);
let distancePlanete = Number(localStorage.distancePlanete);

// définir différents layers
// ainsi que le layer par défaut
layers(["fond", "zoneDeJeu", "planete", "interface"], "zoneDeJeu");

// placer la planète
let planete = add([
   sprite("planete"),
   pos(w / 2 - 100, h / 2 - 10),
   origin("center"),
   layer("planete"),
   scale(distancePlanete),
]);

// charger le cockpit dans le layer interface
let cockpit = add([
   sprite("cockpit"),
   pos(w / 2, h / 2),
   origin("center"),
   layer("interface"),
   scale(2),
]);

// charger le fond spatial dans le layer fond
let fond = add([
   sprite("espace"),
   pos(w / 2, h / 2),
   origin("center"),
   layer("fond"),
   scale(1),
]);

// ajouter la jauge de carburant
let jaugeCarburant = add([
   rect(100, 20),
   pos(w / 2 - 50, h / 2 + 50),
   layer("interface"),
]);

// ajouter le compteur de vitesse
let compteurVitesse = add([
   text(vitesse),
   pos(w / 2 - 50, h / 2 + 100),
   layer("interface"),
]);

// création d'un ciel étoilé

function creerEtoile(couche) {
   const posx = rand(0, w);
   const posy = rand(0, h);
   const posz = rand(1000, 3000);

   let etoile = add([
      rect(10, 10),
      pos(posx, posy),
      scale(map(posz, 1000, 3000, 0.1, 0.4)),
      area(),
      layer(couche),
      "etoile",
   ]);
}
// créer un ciel étoilé initial
for (let i = 0; i < 300; i++) {
   creerEtoile("zoneDeJeu");
}

onUpdate(() => {
   if (vitesse == 0 || carburant == 0) {
      stop("moteur");
   }
   if (vitesse > 0) {
      // déplacer les étoiles
      every("etoile", (e) => {
         let v = vitesse / 1000;
         e.pos.x > w / 2 ? (e.pos.x += v) : (e.pos.x -= v);
         e.pos.y > h / 2 ? (e.pos.y += v) : (e.pos.y -= v);
      });
      console.log(planete.scale.x);
      // approcher la planète
      distancePlanete += 0.01;
      planete.scale.x += 0.0001;
      planete.scale.y += 0.0001;
      // diminuer la jauge de carburant
      jaugeCarburant.width = map(carburant, 0, carburantMax, 0, 100);
   }
});

onUpdate("etoile", (e) => {
   if (e.pos.x > w || e.pos.x < 0 || e.pos.y > h || e.pos.y < 0) {
      e.pos.x = randi(w / 2 - 10, w / 2 + 10);
      e.pos.x = randi(h / 2 - 10, h / 2 + 10);
   }
});

onKeyPress("up", () => {
   if ((carburant > 0) & (vitesse < vitesseMax)) {
      vitesse += 10;
      carburant -= dt() * 5;
      compteurVitesse.text = vitesse;

      play("moteur", {
         volume: mapc(vitesse, 0, vitesseMax, 0, 1),
         loop: true,
      });
   }
});

onKeyPress("down", () => {
   if ((carburant > 0) & (vitesse > 0)) {
      vitesse -= 10;
      carburant -= dt() * 5;
      compteurVitesse.text = vitesse;
   }
});

// sauvegarder écran
onKeyPress("p", () => {
   let imageEncodee = screenshot();
   // Javascript pur
   navigator.clipboard
      .writeText(imageEncodee)
      .then(() => {
         console.log("Text copié dans le presse-papier !");
         // télécharger l'image
         sauvegarderImage(imageEncodee, "vers-l'infini-et-au-dela");
      })
      .catch((err) => {
         console.log("Erreur", err);
      });
});

// sauvegarder l'image
function sauvegarderImage(base64, fileName) {
   let link = document.createElement("a");
   link.setAttribute("href", base64);
   link.setAttribute("download", fileName);
   link.click();
}

// sauvegarder données
onKeyPress("s", () => {
   console.log("Données sauvegardées !");
   localStorage.carburant = String(carburant);
   localStorage.distancePlanete = String(distancePlanete / 60);
});

//localStorage.clear();
