let game;

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 420,
        height: 735,
        parent: "game-container",
        // scale : NONE,
        // zoom : 1,
        scene: playGame,
        backgroundColor: 0x444444,
        // scale: {
        //     mode: Phaser.Scale.FIT,
        //     autoCenter: Phaser.Scale.CENTER_BOTH,
        // }
    }
    jeu = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

// playGame scene
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
        // charger la spritesheet
        this.load.image('image_tileset','assets/OldAdelaide.bmp');
        // charger le fichier json associé
        this.load.tilemapTiledJSON('carte_json','assets/carte.json');
    }
    create(){
        // charger la carte
        let carte = this.add.tilemap('carte_json');
        // lier le tileset
        // attention : le premier élément est le nom
        // du tileset défini dans "Tiled"
        let terrain = carte.addTilesetImage('OldAdelaide','image_tileset');
        //carte.setBaseTileSize(82,82);
        // carte.getTilesWithinWorldXY(1334,750,30,30)
        // créer les layers
        // attention : les premiers paramètres sont les noms
        // des layers définis dans "Tiled"
        let fond = carte.createStaticLayer('fond',[terrain],0,0).setDepth(-1)//.setScale(3.27);
        let couche1 = carte.createStaticLayer('couche1',[terrain],0,0)//.setScale(3.27);
    }
    update(){

    }
};
// fonction pour occuper tout l'écran
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = jeu.config.width / jeu.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}