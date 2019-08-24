// objet de configuration
const config = {
    width : 400,
    height : 400,
    pixelArt: true,
    backgroundColor : 'black',
    physics : {
        default : 'arcade',
        arcade : {
            debug : true
        }
    },
    scene : {
        preload : preload,
        create : create,
        update : update
    }    
}

let jeu = new Phaser.Game(config);

function preload(){
    // charger l'image de balle
    this.load.image('balle', 'assets/tennisball.png');
}

function create(){
    // définir un groupe d'objets actifs
    let balles_actives = this.add.group();
    // définit un réservoir
    let reservoir = this.add.group();
}    

function update(){
  
}