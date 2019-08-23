// paramètres du jeu
let n_obstacles = 8;
let max_impacts = 5;

// variables globales
let obstacles = [];
let score = 0;
let victoire = false;
let highscore = 0;

// récupération ou définition du highscore
if(localStorage.getItem('highscore_pj')===null){
    localStorage.setItem('highscore_pj',0);
}
else{
    highscore = localStorage.getItem('highscore_pj');
}

// objet de configuration
const config = {
    width : 300,
    height : 600,
    backgroundColor : 'black',
    physics : {
        default : 'arcade'
    },
    scene : [Accueil,Jeu,GameOver]
}

let jeu = new Phaser.Game(config);