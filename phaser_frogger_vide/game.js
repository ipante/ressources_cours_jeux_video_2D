let gameConfig = {
    type : Phaser.AUTO,
    parent : "conteneur",
    scale : {
        parent : 'conteneur',
        mode : Phaser.Scale.FIT,
        autoCenter : Phaser.Scale.CENTER_BOTH,
        width : 160, // 10* 16px
        height : 320
    },
    physics : {
        default : 'arcade'
    },
    scene : {
        preload : preload,
        create : create,
        update : update
    }
}

// variables générales
let heros;
let curseurs;

let jeu = new Phaser.Game(gameConfig);

function preload(){
    // charger les ressources pour la carte
    this.load.image('image_tileset','assets/DesertSands.png');
    this.load.tilemapTiledJSON('carte','assets/carte.json');
    // charer les ressources pour le personnage
    this.load.spritesheet('heros','assets/warrior.png',{
        // dimensions de chaque élément
        frameWidth : 98,
        frameHeight : 101
    })
    this.load.image('sol','assets/sol.png');
}

function create(){
    // charger la carte
    const carte = this.add.tilemap('carte');
    const terrain = carte.addTilesetImage('DesertSands','image_tileset');
    // ajouter les layers
    const niveau = carte.createLayer('niveau',[terrain],0,0).setDepth(-1);
    const murs = carte.createLayer('murs',[terrain],0,0);
    // faire le lien avec la propriété collision json
    murs.setCollisionByProperty({collision : true});

    // affichage du mode debug
    const mode_debug = this.add.graphics().setAlpha(0.7);
    murs.renderDebug(mode_debug,{
        tileColor : null,
        collidingTileColor : new Phaser.Display.Color(110,234,48,255),
        faceColor : new Phaser.Display.Color(40,39,37,255)
    })

    // l'ajout du personnage
    this.heros = this.physics.add.sprite(72,95,'heros',12).setScale(0.15);
    this.heros.setBounce(0.2);
    this.heros.setCollideWorldBounds(true);
    // gestion du mouvement avec un booléen
    this.heros.seDeplace = false;

    // création des animations
    this.anims.create({
        key : 'gauche',
        repat : 0,
        frameRate : 15,
        frames : this.anims.generateFrameNames('heros',
        {start : 0, end : 3
        })
    })
    this.anims.create({
        key : 'haut',
        repat : 0,
        frameRate : 15,
        frames : this.anims.generateFrameNames('heros',
        {start : 6, end : 9
        })
    })
    this.anims.create({
        key : 'bas',
        repat : 0,
        frameRate : 15,
        frames : this.anims.generateFrameNames('heros',
        {start : 12, end : 15
        })
    })

    // curseurs pour déplacer le personnage
    curseurs = this.input.keyboard.createCursorKeys();

    // générer le groupe d'obstacles
    this.obstacles = this.physics.add.staticGroup();
    
    // générer les obstacles 1 à 1
    for (let i = 0; i < 15; i++){
        const x = 16;
        const y = 48 + i * 16 ;
        // const gauche = Math.round(Math.random());
        const obstacle = this.obstacles.create(x,y,'sol').setOrigin(0,0);
        this.tweens.add({
            targets : obstacle,
            x : 128,
            duration : 4000,
            ease : 'Linear',
            yoyo : true,
            loop : -1
        });
    }

}

function update(){

    this.heros.setVelocity(0,0);

    if(curseurs.left.isDown && !this.heros.seDeplace){
        // signaler que le personnage est en déplacement
        this.heros.seDeplace = true;
        this.heros.setVelocityX(-1000);
        this.heros.anims.play('gauche',true);
        setTimeout(()=>{
            // je rerends le mouvement possible
            this.heros.seDeplace = false;
            // j'arrête le personnage
            this.heros.setVelocity(0,0);
        },200)
    }
    else if (curseurs.right.isDown && !this.heros.seDeplace)
    {
        this.heros.seDeplace = true;
        // notre SpriteSheet n'a pas d'images
        // pour la droite ; nous allons donc prendre
        // l'animation pour "gauche" et la retourner
        this.heros.setVelocityX(+1000);
        this.heros.anims.play('gauche',true).flipX = true;
        setTimeout(()=>{
            this.heros.seDeplace = false
            this.heros.setVelocity(0,0);
        },200);
    }
    else if (curseurs.up.isDown && !this.heros.seDeplace)
    {
        this.heros.seDeplace = true;
        this.heros.setVelocityY(-970);
        this.heros.anims.play('haut',true);
        setTimeout(()=>{
            this.heros.seDeplace = false
            this.heros.setVelocity(0,0);
        },200);
    }
    else if (curseurs.down.isDown && !this.heros.seDeplace)
    {
        this.heros.seDeplace = true;
        this.heros.setVelocityY(970);
        this.heros.anims.play('bas',true);
        setTimeout(()=>{
            this.heros.seDeplace = false
            this.heros.setVelocity(0,0);
        },200);
    }     
}