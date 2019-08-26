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
        maxSize: 15
    });
    // notez que l'on peut créer des éléments
    // comme suit : balles.create(5);
    
    // ajouter une balle à chaque clic sur l'écran
    this.input.on('pointerdown', () => {
        // si le réservoir n'est pas plein...
        if(!balles.isFull()){
            // on ajoute une balle
            let balle = balles.get(
                // avec un positionnement aléatoire
                Phaser.Math.Between(50,350),
                Phaser.Math.Between(50,350),
            );
            // on rend la balle interactive
            balle.setInteractive();
            // si on passe sur la balle...
            balle.on('pointerover', () => {
                // retirer la balle du réservoir
                balles.killAndHide(balle);
            })
        }    
    });
    // notez que l'on peut parcourir
    // tous les éléments d'un réservoir
    // comme suit :
    // balles.children.iterate(function(){...})
}

/* exemples apparentés
http://labs.phaser.io/edit.html?src=src/game%20objects/group/sprite%20pool.js

*/