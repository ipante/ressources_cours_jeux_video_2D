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
let vitesseMax = 200;

// chargement des assets
loadRoot("assets/");
loadSprite("cockpit", "cocpkit.png");
const moteur = loadSound("moteur", "space-sound-109576.mp3");

// sauvegarder une donnée en localStorage

// tester si la clef existe déjà
if (localStorage.getItem("carburant") === null) {
   // puisqu'elle n'existe pas, créer la clef
   // et attribbuer la valeur
   localStorage.setItem("carburant", 100);
}

// stocker la valeur dans une variable
let carburant = localStorage.carburant;

// définir différents layers
// ainsi que le layer par défaut
layers(["zoneDeJeu", "interface"], "zoneDeJeu");

// charger le cockpit dans le layer interface
let cockpit = add([
   sprite("cockpit"),
   pos(w / 2, h / 2),
   origin("center"),
   layer("interface"),
   scale(2),
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

function creerEtoile() {
   let posz = rand(1000, 3000);
   let posx = rand(0, w);
   let posy = rand(0, h);

   let etoile = add([
      rect(10, 10),
      pos(posx, posy),
      scale(map(posz, 1000, 3000, 0.1, 0.4)),
      area(),
      cleanup(),
      {
         posz: posz,
         posx: posx - w / 2,
         posy: posy - h / 2,
      },
      "etoile",
   ]);
}

// créer un ciel étoilé initial
for (let i = 0; i < 300; i++) {
   creerEtoile();
}

// // déplacer les étoiles
onUpdate("etoile", (e) => {
   // e.zpos -= 2 * dt();
   e.pos.x = e.posx + 0.001; //centreX + e.posx * (e.zpos * 0.001);
   e.posx += 0.001;
   e.pos.y = e.posy * 0.001; //centreY + e.posy / (e.zpos * 0.001);
   e.posy += 0.001;
});

onUpdate(() => {
   if (vitesse > 0 && carburant > 0) {
      play("moteur", {
         volume: mapc(vitesse, 0, vitesseMax, 0, 1),
         loop: true,
      });
      console.log(vitesse);
   } else {
      // stop("moteur");
   }
});

onKeyPress("up", () => {
   if ((carburant > 0) & (vitesse < vitesseMax)) {
      vitesse += 10;
      carburant -= dt() * 5;
      compteurVitesse.text = vitesse;
   }
});

onKeyPress("down", () => {
   if ((carburant > 0) & (vitesse > 0)) {
      vitesse -= 10;
      carburant -= dt() * 5;
      compteurVitesse.text = vitesse;
   }
});
