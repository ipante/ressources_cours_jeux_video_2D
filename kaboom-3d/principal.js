kaboom({
   background: [0, 0, 0],
});

localStorage.removeItem("carburant");
if (localStorage.getItem("carburant") === null) {
   localStorage.setItem("carburant", 400);
}

let carburant = localStorage.carburant;
console.log("test2", carburant);

console.log(localStorage.carburant);
// ajouter le cockpit
loadSprite("cockpit", "cockpit.png");

// définir les couches de jeu
layers(["zoneDeJeu", "interface"], "zoneDeJeu");

const l = width();
const h = height();
let v = 0;

// ajout du cockpit
let c = add([
   pos(l / 2, h / 2),
   origin("center"),
   sprite("cockpit"),
   layer("interface"),
   scale(2),
   fixed(),
]);

let texte_vitesse = add([text(v), pos(l / 2, h / 2 + 30), layer("interface")]);
let jauge_carburant = add([
   rect(map(carburant, 0, 400, 0, 100), 20),
   // color("orange"),
   // outline("gray"),
   pos(l / 2 - 50, h / 2 + 130),
   layer("interface"),
]);

// création d'un ciel étoilé
function creerEtoile() {
   let eloignement = rand(1000, 3000);
   let posx = rand(0, l);
   let posy = rand(0, h);
   let dirx;
   let diry;

   // tirer les positions x & y
   posx < l / 2 ? (dirx = -1) : (dirx = 1);
   posy < h / 2 ? (diry = -1) : (diry = 1);

   let etoile = add([
      rect(10, 10),
      pos(posx, posy),
      scale(map(eloignement, 1000, 3000, 0.1, 0.4)),
      {
         zpos: eloignement,
         dirx: dirx,
         diry: diry,
      },
      "etoile",
   ]);
   return etoile;
}

// créer un ciel étoilé initial
for (let i = 0; i < 300; i++) {
   creerEtoile();
}

onKeyPress("up", () => {
   if (carburant != 0) {
      localStorage.carburant -= 1;
      jauge_carburant.width -= 1;
      texte_vitesse.text = v;
      if (v < 400) {
         v += 10;
      }
   }
});
onKeyPress("down", () => {
   if (carburant != 0) {
      localStorage.carburant -= 1;
      jauge_carburant.width -= 1;
      texte_vitesse.text = v;
      if (v > 0) {
         v -= 10;
      }
   }
});

onUpdate("etoile", (e) => {
   e.zpos -= v * dt();
   e.pos.x += (v / 4000) * e.dirx * (e.zpos * 0.001);
   // e.pos.y += (v / 4000) * e.diry * (e.zpos * 0.001);
   // // e.scale
   // if (e.pos.x < 0 || e.pos.x > l || e.pos.y < 0 || e.pos.y > h) {
   //    e.pos.x = l / 2 - rand(-200, 200);
   //    e.pos.y = h / 2 - rand(-200, 200);
   // }
   //    etoile.pos.x = centerX - etoile.xpos * (etoile.zpos * 0.001);
   //    etoile.pos.y = centerY - etoile.ypos * (etoile.zpos * 0.001);
});
