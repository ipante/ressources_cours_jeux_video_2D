const Breakout = new Phaser.Class({

    Extends: Phaser.scene,

    // La fonction d'initialisation du jeu
    initialize: function(){
        Phaser.Scene.call(this, {key: 'breakout'});

        this.briques;
        this.palet;
        this.balle;
    },
    // La fonction preload charge les éléments utiles au jeu
    preload: function(){
        // lier la spritesheet et son atlas
        // stocker sous l'identifiant "assets"
        this.load.atlas('assets', 'breakout.png', 'breakout.json');
    },
    // La fonction de mise en place
    // contient tout ce qui ne sera pas mis à jour
    // soixante fois par seconde
    create: function(){
        // définir des collissions sur chaque bord sauf le bas
        this.physics.world.setBoundsCollision(true, true, true, false);
        // création et placement du mur de briques
        // cette fonction contient une boucle intégrée
        this.briques = this.physics.add.staticGroup({
            key: 'assets',
            frame: ['blue1', 'red1', 'yellow1', 'purple1', 'silver1', 'green1'],
            frameQuantity: 10,
            gridAlign: {
                width: 10,
                height: 6,
                cellWidth: 64,
                cellHeight: 32,
                x: 112,
                y: 100,
            }
        });

        // création et placement de la balle
        // + définir un rebond avec le bord du monde
        // + définit la force de ce rebond
        this.balle = this.physics.add.image(
            400, 
            500, 
            'assets', 
            'ball1'
        ).setCollideWorldBounds(true).setBounce(1);
        this.balle.setData('onPalet', true);

        // création et placement du palet
        // + le rendre insensible aux chocs
        this.palet = this.physics.add.image(
            400,
            550,
            'assets',
            'paddle1'
        ).setImmovable();

        // définir un gestionnaire de collision
        // entre la balle et les briques et
        // lier la fonction qui les gérera (contactBrique)
        this.physics.add.collider(
            this.balle,
            this.briques,
            this.contactBrique,
            null,
            this
        );

        // définir un gestionnaire de collision
        // entre la balle et le palet et
        // lier la fonction qui les gérera (contactPalet)
        this.physics.add.collider(
            this.balle,
            this.palet,
            this.contactPalet,
            null,
            this
        );

        // gérer les interactions utilisateur

        // quand la souris bouge, y associer le palet
        // et la balle, si elle est sur le palet
        this.input.on('pointermove', function(pointer){
            this.palet.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.balle.getData('onPalet')) {
                this.balle.x = this.palet.x;
            };
        }, this);

        // quand il y a un clic de souris
        // si la balle est sur le palet
        // la faire partir avec une vitesse sur x et y
        // la retirer du palet (booléen onPalet)
        this.input.on('pointerup', function(){
            if (this.balle.getData('onPalet')){
                this.balle.setVelocity(-75, -300);
                this.balle.setData('onPalet', false)
            }
        }, this);
    },

    // la fonction de collision avec les briques
    contactBrique: function(_, brique){
        // désactiver le "corps" de l'objet
        brique.disableBody(true, true);
        // redémarrer le jeu s'il s'agissait
        // de la dernière brique
        if (this.briques.countActive() === 0) {
            this.reinitialiserNiveau();
        }
    },

    // la fonction de collision avec le palet
    contactPalet: function(balle, palet){
        let difference = 0;

        // si la balle tape sur la gauche du palet
        // renvoyer en fonction de la force d'arrivée
        if (balle.x < palet.x) {
            difference = palet.x - balle.x;
            balle.setVelocity(-10 * difference);
        }

        // si la balle tape sur la droite du palet
        // renvoyer en fonction de la force d'arrivée
        else if (balle.x > palet.x) {
            difference = balle.x - palet.x;
            balle.setVelocity(10 * difference);
        }

        // si elle tape au milieu, ajouter une
        // légère déviation aléatoire
        else {
            balle.setVelocityX(2 + Math.random() * 8);
        }
    },

    // fonction de réinitialisation de la balle
    // arrêter la balle
    // la place au bon endroit
    // mettre le booléen onPalet à jour
    reinitialiserBalle: function(){
        this.balle.setVelocity(0);
        this.balle.setPosition(this.palet.x, 500);
        this.balle.setData('onPalet', true);
    },

    // fonction de réinitialisation du niveau
    reinitialiserNiveau: function(){
        this.reinitialiserBalle();

        // réactiver le "corps" de chaque brique
        this.briques.children.each(function(brique){

            brique.enableBody(
                false,
                0,
                0,
                true,
                true,
            );

        })
    },

    // la fonction effectuée 60 fois par seconde
    update: function(){
        // si la balle sort par le bas, réinitialiser
        if (this.balle.y > 600) {
            this.reinitialiserBalle();
        }
    }
})

// l'objet de configuration, passé pour chaque jeu
// une seule scène ici (breakout)
const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [ Breakout ],
    physics: {
        default: 'arcade'
    }
};

// la création d'une instance Game de l'objet Phaser
const jeu = new Phaser.Game(config)