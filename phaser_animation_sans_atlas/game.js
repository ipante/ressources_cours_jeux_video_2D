console.clear();
// objet de configuration
const config = {
    width : 400,
    height : 400,
    pixelArt: true,
    backgroundColor : 'black',
    physics : {
        default : 'arcade'
    },
    scene : {
        preload : preload,
        create : create,
        update : update
    }    
}

let jeu = new Phaser.Game(config);

function preload(){
    // chargement de la spritesheet (pas d'atlas ici)
    this.load.spritesheet("heros","assets/warrior.png",{
        frameWidth : 98,
        frameHeight : 101
    }) 
}

function create(){
    this.heros = this.physics.add.sprite(100,100,'heros',0)
    // création de l'animation de marche
    this.anims.create({
        key : 'gauche',
        repeat : 1,
        framerate : 10,
        frames : this.anims.generateFrameNames('heros',{
            start : 1, end : 4
            }
         )
    })
    this.anims.create({
        key : 'haut',
        repeat : 1,
        framerate : 10,
        frames : this.anims.generateFrameNames('heros',{
            start : 7, end : 10
            }
         )
    })
    this.anims.create({
        key : 'bas',
        repeat : 1,
        framerate : 10,
        frames : this.anims.generateFrameNames('heros',{
            start : 11, end : 14
            }
         )
    })      
    // création des curseurs pour le
    // mouvement continu dans update()
    fleches = this.input.keyboard.createCursorKeys();

}    

function update(){

    this.heros.setVelocityX(0);

    if (fleches.left.isDown)
    {
        this.heros.play('gauche')
        this.heros.setVelocityX(-300);
    }
    else if (fleches.right.isDown)
    {
        this.heros.play('gauche')
    }

    if (fleches.up.isDown)
    {
        this.heros.play('haut')
    }
    else if (fleches.down.isDown)
    {
        this.heros.play('bas')
    }    
}