/*
Pour accompagner votre compréhension, cette archive
contient les images initiales dans un dossier spécifique.
Toutes ont été converties en spritesheets avec TexturePacker.
A cette occasion le point de pivot (ancrage) a été fixe au
coin haut gauche de chaque image. Deux spritesheets ont été
générées (alien-0.png et alien-1.png), ainsi qu'un
atlas JSON (alien.json), qui contient toutes les coordonnées
des images. Prenez le temps de consulter ces fichiers.
*/

// objet de configuration
const config = {
    width : 800,
    height : 600,
    pixelArt: true,
    backgroundColor : 'black',
    physics : {
        default : 'arcade'
    },
    scene : {
        preload : preload,
        create : create
    }    
}

let jeu = new Phaser.Game(config);

function preload(){
    // chargement de l'atlas
    // vue la taille des sprites, deux fichiers sont nécessaires
    // on définit d'abord le chemin...
    this.load.path = 'assets/';
    // puis on charge l'atlas json avec la fonction
    // "multiatlas" ; une seule feuille aurait demandé
    // une autre fonction
    this.load.multiatlas('alien', 'alien.json');
}

function create(){
    // créer l'objet de départ qui portera
    // les différentes animations
    const alien = this.add.sprite(0,160,'alien','idle_1.png');
    
    // définition des animations
    this.anims.create({
        // le nom de notre choix
        key : 'attend',
        // une répétition infinie
        repeat : -1,
        frameRate : 6,
        // ici, on va générer les noms
        // des images en plaçant un prefixe,
        // un suffixe et le nombre d'images
        // à retenir
        frames : this.anims.generateFrameNames('alien',{
                prefix : 'idle_',
                suffix : '.png',
                start : 1,
                end : 3
            }
         )
    })

    this.anims.create({
        key : 'marche',
        repeat : 0,
        frameRate : 6,
        frames : this.anims.generateFrameNames('alien',{
                prefix : 'walk_',
                suffix : '.png',
                start : 1,
                end : 6
            }
         )
    })

    this.anims.create({
        key : 'court',
        repeat : 0,
        frameRate : 6,
        frames : this.anims.generateFrameNames('alien',{
                prefix : 'run_',
                suffix : '.png',
                start : 1,
                end : 6
            }
         )
    })

    this.anims.create({
        key : 'attaque',
        repeat : 0,
        frameRate : 6,
        frames : this.anims.generateFrameNames('alien',{
                prefix : 'attack_',
                suffix : '.png',
                start : 1,
                end : 4
            }
         )
    }) 

    this.anims.create({
        key : 'tire',
        repeat : 0,
        frameRate : 6,
        frames : this.anims.generateFrameNames('alien',{
                prefix : 'fire_',
                suffix : '.png',
                start : 1,
                end : 11
            }
         )
    })     
    // si nous voulions définir plusieurs mouvements
    // avec la même animation, nous pourrions
    // créer une timeline avec 
    // const timeline = this.tweens.createTimeline();

    // l'animation initiale
    alien.anims.play('court');
    this.tweens.add({
        // définir la/les cibles du mouvement
        targets: alien,
        // définit les valeurs à atteindre
        x: 300,
        // définit les accélérations du mouvement
        ease: 'Power1',
        // définit la durée totale du mouvement
        duration: 2000
    });

    // défintion d'un callback
    // pour enchaîner avec une autre animation
    alien.on('animationcomplete', anim2, this);  

    function anim2(){
        // lancement d'une autre animation
        alien.anims.play('tire');
        this.tweens.add({
            targets: alien,
            ease: 'Power1',
            duration: 1500
        });       
    }
}    