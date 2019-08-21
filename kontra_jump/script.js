/* Auteur : Isaac Pante
Code non optimisé à des fins pédagogiques !
*/

// paramètres du jeu
let n_obstacles = 8;
let max_impacts = 5;

// variables globales
let obstacles = [];
let score = 0;
let victoire = false;

// raccourcis
let noeud_score = document.querySelector('div#score>span');
let noeud_hscore = document.querySelector('div#highscore>span');

// initialiser kontra.js
kontra.init();

// récupérer le high score
if(kontra.getStoreItem('highScore') == null){
  kontra.setStoreItem('highScore',0)
}
noeud_hscore.innerHTML = kontra.getStoreItem('highScore');

// initialisation du score
noeud_score.innerHTML = score;
// création d'un joueur
let joueur = kontra.Sprite({
  x: 0,
  y: 580,
  color: 'red',
  width: 20,
  height: 20,
  dx : 4,
  // compter le temps
  temps : 0 // pouzr gérer le saut
});

// activer le clavier
kontra.initKeys();

// les obstacles
function creer_obstacle(){
  let obstacle = kontra.Sprite({
    x : 20 * Math.random() * 14,
    y : 20 * Math.random() * 28,
    width : 15,
    height : 15,
    color : 'white'
  })
  obstacles.push(obstacle);
}

function init_obstacles(){
  for(var i = 0; i < n_obstacles; i++){
    creer_obstacle();
  }
}

// réinitialisation
function reinitialiser_jeu(){
  // arrêter le moteur
  moteur.stop();
  // vérifier le nombre d'impacts'
  let impacts = 0;
  obstacles.forEach(v =>{
    if(v.color == 'red'){impacts++}
  })
  // si le joueur a perdu
  if(impacts == max_impacts){
    moteur.stop();
    alert("PERDU !");
    score = 0;
    noeud_score.innerHTML = score;
    // amener le temps de vie de
    // chaque obstacle à 0
    obstacles.forEach(s => {s.ttl = 0})
    // retirer les objets à générer
    // du tableau "obstacles"
    obstacles = obstacles.filter(o => {o.isAlive()});
    // générer de nouveaux obstacles
    init_obstacles();
  }
  setTimeout(()=>{
    // repositionner le joueur
    joueur.x = 0;
    joueur.y = 580;
    // seulement si le joueur a gagné !
    if(victoire){
      // actualiser le score
      noeud_score.innerHTML = score;
      // comparer au meilleur score
      if(score > kontra.getStoreItem('highScore')){
        kontra.setStoreItem('highScore',score);
        noeud_hscore.innerHTML = score;
      }
      // ajouter deux obstacles
      creer_obstacle();
      creer_obstacle();
      // réinitialiser la victoire
      victoire = false;     
    }
    // relancer le moteur
    moteur.start();
  },500)
}
// générer les obstacles
init_obstacles();

// création du moteur de jeu
let moteur = kontra.GameLoop({
  update() {
    // gérer les rebonds
    joueur.update();
    if(joueur.x > 280 && joueur.dx > 0){
      joueur.x--;
      joueur.dx = -4
    }
    if(joueur.x < 1 && joueur.dx < 0){
      joueur.x++;
      joueur.dx = 4
    }
    // gérer le clavier
    joueur.temps += 1/60;
    if(kontra.keyPressed('space') && joueur.temps > 0.15){
      joueur.temps = 0;
      joueur.y -= 20;
    }
    // victoire
    if(joueur.y < 20){
        reinitialiser_jeu();
        victoire = true;
        score++;
        console.log(score);
    }
    // contrôle de collision
    obstacles.forEach(ob => {
      if(ob.collidesWith(joueur)){
        ob.color = 'red';
        reinitialiser_jeu();
      }
    })
  },
  render() {
    joueur.render();
    obstacles.map(o => o.render());
  }
});
// lancer le jeu
document.querySelector('canvas').focus();
moteur.start();

// chargement de la musique
// source : https://www.bensound.com/royalty-free-music/track/summer-chill-relaxed-tropical
const url_musique = 'https://www.bensound.org/bensound-music/bensound-summer.mp3';
kontra.loadAudio(url_musique).then(function(audio) {
  kontra.audioAssets[url_musique].play();
})