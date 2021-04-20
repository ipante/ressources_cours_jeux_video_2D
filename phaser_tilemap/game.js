let gameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    zoom : 0.8, // ajuster le zoom pour la netteté
    scale: { // le scale manager pour le calibrage
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width : 128, // soit 16*8
        height : 224 // soit 16*14
    },
    scene : {
        preload : preload,
        create : create
    }
}

let jeu = new Phaser.Game(gameConfig);

function preload(){
        // charger le tileset
        this.load.image('image_tileset','assets/DesertSands.png');
        // charger le fichier json associé (tilemap)
        this.load.tilemapTiledJSON('carte_json','assets/carte.json');
}

function create(){
        // charger la carte
        let carte = this.add.tilemap('carte_json');
        // lier le tileset
        // attention : le premier élément est le nom
        // du tileset défini dans "Tiled"
        let terrain = carte.addTilesetImage('DesertSands','image_tileset');
        // attention : les premiers paramètres sont les noms
        // des layers définis dans "Tiled"
        let fond = carte.createLayer('fond',[terrain],0,0).setDepth(-1);
        let couche1 = carte.createLayer('objets',[terrain],0,0);
}
