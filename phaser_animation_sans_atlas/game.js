console.clear();
// objet de configuration
const config = {
    width : 400,
    height : 400,
    pixelArt: true,
    backgroundColor : 'black',
    // définir la physique pour
    // créer des collisions avec
    // les limites du monde
    physics: {
        default: 'arcade',
    },
    scene : {
        preload : preload,
        create : create,
        update : update
    }    
}

let jeu = new Phaser.Game(config);

function preload(){
    // chargement de la spritesheet
    // parce que les sprites ont une taille homogène
    // et sont tous dans le même sens, on peut calculer
    // directement les images, sans recourir à un atlas
    // json (cf. autre exemple)
    this.load.spritesheet("heros","assets/warrior.png",{
        // dimensions de chaque sprite
        frameWidth : 98,
        frameHeight : 101
    }) 
}

function create(){
    // ajout du sprite d'origine
    this.heros = this.physics.add.sprite(100,100,'heros',12);
    // ajout de la physique
    this.heros.setBounce(0.2);
    this.heros.setCollideWorldBounds(true);

    // création de l'animation de marche
    this.anims.create({
        // nom de l'animation
        key : 'gauche',
        // ne pas mettre de répétition,
        // pour que l'animation s'arrête
        // avec la touche
        repeat : 0,
        // vitesse de l'animation
        frameRate : 15,
        // retenir les frames nécessaires
        frames : this.anims.generateFrameNames('heros',{
            start : 0, end : 3
            }
         )
    })
    this.anims.create({
        key : 'haut',
        repeat : 0,
        frameRate : 15,
        frames : this.anims.generateFrameNames('heros',{
            start : 6, end : 9
            }
         )
    })
    this.anims.create({
        key : 'bas',
        repeat : 0,
        frameRate : 15,
        frames : this.anims.generateFrameNames('heros',{
            start : 12, end : 15
            }
         )
    })      
    // création des curseurs pour le
    // mouvement continu dans update()
    fleches = this.input.keyboard.createCursorKeys();

}    

function update(){  
    // définit la vitesse par défaut
    this.heros.setVelocity(0,0);
    if (fleches.left.isDown)
    {
        // ce code doit être ajouté pour rétablir
        // le personnage dans la bonne direction
        // après un déplacement vers la droite
        if(this.heros.flipX){
            this.heros.flipX = false;
        }
        this.heros.setVelocityX(-100);
        this.heros.anims.play('gauche',true);
    }
    else if (fleches.right.isDown)
    {
        // notre SpriteSheet n'a pas d'images
        // pour la droite ; nous allons donc prendre
        // l'animation pour "gauche" et la retourner
        this.heros.setVelocityX(100);
        this.heros.anims.play('gauche',true).flipX = true;
    }
    else if (fleches.up.isDown)
    {
        this.heros.setVelocityY(-100);
        this.heros.anims.play('haut',true);
    }
    else if (fleches.down.isDown)
    {
        this.heros.setVelocityY(100);
        this.heros.anims.play('bas',true);
    }
    // ATTENTION! LE CODE QUI SUIT PRODUIT UNE
    // ERREUR : préférer la ligne 88
    // else
    // {
    //     this.heros.setVelocity(0,0);
    // }
    
}