// paramètres du jeu
let n_obstacles = 8;
let max_impacts = 5;

// variables globales
let obstacles = [];
let score = 0;
let victoire = false;

const config = {
    width : 300,
    height : 600,
    backgroundColor : 'black',
    physics : {
        default : 'arcade',
        arcade : {
            // affiche le mode debug
            debug : true,
        }
    },
    scene : [Accueil,Jeu,GameOver]
}

let jeu = new Phaser.Game(config);