// excellent script d'origine produit par Emanuele Feronato
// https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/

/* un exemple de "réservoir" (pool)
Pas d'objet spécial, juste une manière
d'interagir avec les groupes d'objets
pour diminuer l'impact sur la mémoire;
les identifiants ont été francisés pour
faciliter la compréhension et des
commentaires ajoutés */

let game;

// les variables de configuration
let options = {
    vitesse_initiale_plateforme: 350,
    empan_apparition: [100, 350],
    empan_plateformes: [50, 250],
    gravite_joueur: 900,
    force_saut: 400,
    position_depart_joueur: 200,
    sauts_max: 2
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1334,
        height: 750,
        scene: playGame,
        backgroundColor: 0x444444,
        physics: {
            default: "arcade"
        }
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
        this.load.image("plateforme", "platform.png");
        this.load.image("joueur", "player.png");
    }
    create(){
        // création d'un groupe pour
        // les plateformes actives
        this.groupe_plateformes = this.add.group({

            // lorsqu'une plateforme est enlevée,
            // du groupe initial... 
            removeCallback: function(plateforme){
                // ...on l'ajoute au 'pool'(un autre groupe)
                plateforme.scene.reservoir_plateformes.add(plateforme)
            }
        });

        // création d'un groupe pour
        // les plateformes inactives (le 'pool')
        this.reservoir_plateformes = this.add.group({

            // lorsqu'une plateforme est enlevée,
            // du réservoir (second groupe)... 
            removeCallback: function(plateforme){
                // ...on l'ajoute au premier groupe
                plateforme.scene.groupe_plateformes.add(plateforme)
            }
        });

        // nombre de sauts consécutifs réalisés
        this.sauts_realises = 0;

        // adding a plateforme to the game, the arguments are plateforme width and x position
        this.ajouter_plateforme(jeu.config.width, jeu.config.width / 2);

        // ajout de joueur
        this.joueur = this.physics.add.sprite(
            options.position_depart_joueur,
            jeu.config.height / 2,
            "joueur");
        // définir la gravité du jeu    
        this.joueur.setGravityY(options.gravite_joueur);

        // setting collisions between the joueur and the plateforme group
        this.physics.add.collider(this.joueur, this.groupe_plateformes);

        // checking for input
        this.input.on("pointerdown", this.sauter, this);
    }

    // les plateformes sont créées ou tirées du réservoir
    ajouter_plateforme(largeur_plateforme, position_x){
        let plateforme;
        // s'il y a des objets dans le pool...
        if(this.reservoir_plateformes.getLength()){
            // prendre le premier objet
            plateforme = this.reservoir_plateformes.getFirst();
            // le positionner au bon endroit
            plateforme.x = position_x;
            // définit la plateforme comme active
            plateforme.active = true;
            // rendre visible la plateforme
            plateforme.visible = true;
            // retirer la plateforme du réservoir
            this.reservoir_plateformes.remove(plateforme);
        }
        else{
            // crée une plateforme
            plateforme = this.physics.add.sprite(
                position_x,
                jeu.config.height * 0.8,
                "plateforme"
            );
            // la rendre inamovible
            plateforme.setImmovable(true);
            // enclencher le déplacement de la plateforme
            plateforme.setVelocityX(options.vitesse_initiale_plateforme * -1);
            // ajouter la plateforme au groupe
            this.groupe_plateformes.add(plateforme);
        }
        plateforme.displayWidth = largeur_plateforme;
        this.distance_plateforme_suivante = Phaser.Math.Between(
            options.empan_apparition[0],
            options.empan_apparition[1]
        );
    }

    sauter(){
        // n'autoriser le saut que si le joueur est au sol
        // ou qu'il reste des sauts disponibles
        if(this.joueur.body.touching.down || (this.sauts_realises > 0 && this.sauts_realises < options.sauts_max)){
            // si le joueur touche le sol...
            if(this.joueur.body.touching.down){
                // réinitialiser le compteur de sauts
                this.sauts_realises = 0;
            }
            // faire sauter le joueur
            this.joueur.setVelocityY(options.force_saut * -1);
            // augmentation du compteur de sauts
            this.sauts_realises ++;
        }
    }
    update(){
        // CONDITION DE DEFAITE
        // si le joueur est plus bas que
        // le fond de l'écran
        if(this.joueur.y > jeu.config.height){
            // redémarrer le jeu
            this.scene.start("PlayGame");
        }
        // ???
        this.joueur.x = options.position_depart_joueur;

        // recyclage de plateformes
        let distance_minimale = jeu.config.width;
        this.groupe_plateformes.getChildren().forEach(function(plateforme){
            let plateformeDistance = jeu.config.width - plateforme.x - plateforme.displayWidth / 2;
            distance_minimale = Math.min(distance_minimale, plateformeDistance);
            if(plateforme.x < - plateforme.displayWidth / 2){
                // rendre la plateforme inactive et la cacher
                this.groupe_plateformes.killAndHide(plateforme);
                // retirer la plateforme
                this.groupe_plateformes.remove(plateforme);
            }
        }, this);

        // ajout de plateformes
        if(distance_minimale > this.distance_plateforme_suivante){
            let largeur_plateforme_suivante = Phaser.Math.Between(
                options.empan_plateformes[0],
                options.empan_plateformes[1]
            );
            this.ajouter_plateforme(
                largeur_plateforme_suivante,
                jeu.config.width + largeur_plateforme_suivante / 2
            );
        }
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