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
        create : create
    }    
}

let jeu = new Phaser.Game(config);

function preload(){
    // charger l'image de balle
    this.load.image('balle', 'assets/tennisball.png');
}

function create(){
    // définir un groupe d'objets actifs
    let balles = this.add.group({
        // définir l'élément par défaut
        defaultKey: 'balle',
        // limiter la taille du groupe
        // et donc le nombre de balles
        // qui pourront être affichées
        maxSize: 10
    });

    // ajouter une balle à chaque clic sur l'écran
    this.input.on('pointerdown', () => {
        balles.get(
            Phaser.Math.Between(50,350),
            Phaser.Math.Between(50,350),
        );
    });
    // retirer une balle à chaque clic sur une balle
    // parcourir chaque balle du groupe...
    balles.children.iterate( b => {
        // rendre chaque balle interactive...
        b.setInteractive();
        // ajouter un événement
        b.input.on('pointerover', (v) => {
            // retirer la balle
            balles.killAndHide(v);
        })
    })
}

/* exemples apparentés
http://labs.phaser.io/edit.html?src=src/game%20objects/group/sprite%20pool.js

*/