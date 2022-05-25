kaboom({
   background: [0, 0, 0],
});

// loadSprite
loadSprite("cockpit", "cockpit.png");

// définir les couches de jeu
layers(["fond", "zoneDeJeu", "interface"], "zoneDeJeu");

const l = width();
const h = height();
const v = 200;

// création d'un ciel étoilé

function creerEtoile() {
   let eloignement = rand(1000, 3000);
   let posx = rand(0, l);
   let posy = rand(0, h);
   let dirx;
   let diry;

   // tirer les positions x & y
   posx < l / 2 ? (dirx = -1) : (dirx = 1);
   posy < h / 2 ? (diry = -1) : (dirx = 1);

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
      area(),
      cleanup(),
   ]);
}

// créer un ciel étoilé initial
for (let i = 0; i < 300; i++) {
   creerEtoile();
}

// loop(0.1, creerEtoiles);

// onUpdate("ennemi", (ennemi) => {
//    ennemi.zpos -= ennemi.speed * dt();
//    ennemi.scale = 2 - ennemi.zpos * 0.0002;

//    const centerX = largeur_ecran * 0.5;
//    const centerY = hauteur_ecran * 0.25;

//    ennemi.pos.x = centerX + ennemi.xpos * (ennemi.zpos * 0.001);
//    ennemi.pos.y = centerY + ennemi.ypos * (ennemi.zpos * 0.001);
//    if (ennemi.zpos <= 1) {
//       console.log("Alien sorti", "Alien sorti");
//    }
// });

// // chargement du haricot
// loadBean();

// let ennemis = [];
// function creerEnnemi() {
//    const cx = rand(0, largeur_ecran);
//    const cy = rand(0, hauteur_ecran);
//    let nouvelEnnemi = add([
//       sprite("bean"),
//       pos(cx, cy),
//       scale(0.2),
//       area(),
//       rotate(0),
//       {
//          xpos: rand((-1 * largeur_ecran) / 2, largeur_ecran / 2),
//          ypos: rand((-1 * hauteur_ecran) / 2, hauteur_ecran / 2),
//          zpos: 1000,
//          speed: ALIEN_SPEED + rand(-0.5 * ALIEN_SPEED, 0.5 * ALIEN_SPEED),
//       },
//       "ennemi",
//    ]);
//    ennemis.push(nouvelEnnemi);
// }
// loop(0.8, creerEnnemi);

onUpdate("etoile", (e) => {
   //e.zpos -= 200 * dt();
   e.pos.x += 0.1 * e.dirx;
   //e.pos.y += 0.1 * e.diry;
   //e.pos.y += 0.0001 * e.diry;
   // e.pos.x = l / 2 + e.dirx * e.xpos * (e.zpos * 0.001);
   // e.pos.y = h / 2 + e.diry * e.ypos * (e.zpos * 0.001);
   //e.scale = e.zpos * 0.002;

   //    etoile.pos.x = centerX - etoile.xpos * (etoile.zpos * 0.001);
   //    etoile.pos.y = centerY - etoile.ypos * (etoile.zpos * 0.001);
});

// onDestroy("etoile", () => {
//    creerEtoile();
// });
