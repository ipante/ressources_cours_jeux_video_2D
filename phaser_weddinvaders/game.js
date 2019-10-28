// paramètres du jeu
let vies_debut = 3;
let vitesse_initiale = 100;
let force_rebond = 1.01;
let ecart_3pts = 10;
let ecart_2pts = 20;
let ecart_1pt  = 30;

// variables globales
let score = 0;
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