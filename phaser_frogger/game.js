let gameConfig = {
    type: Phaser.AUTO,
    parent: "conteneur",
    zoom : 0.8, // ajuster le zoom pour la netteté
    scale: { // le scale manager pour le calibrage
        parent: 'conteneur',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width : 160, // soit 16*10
        height : 320 // soit 16*20
    },
    physics: {
        default: 'arcade',
        debug : true
    },
    scene : {
        // les trois fonctions appelées
        preload : preload,
        create : create,
        update : update
    }
}

// définition des variables globales
// celles qui devront quitter une fonction
// exemple : se retrouver dans create & update
let heros;
let curseurs;

let jeu = new Phaser.Game(gameConfig);

function preload(){
        // charger le tileset
        this.load.image('image_tileset','assets/DesertSands.png');
        // charger le fichier json associé (tilemap)
        this.load.tilemapTiledJSON('carte_json','assets/carte.json');
        // charger le héros
        this.load.spritesheet("heros","assets/warrior.png",{
            // dimensions de chaque sprite
            frameWidth : 98,
            frameHeight : 101
        })
        // charger le sol sous forme d'image
        this.load.image('sol','assets/sol.png');      
}

function create(){
        // charger la carte
        const carte = this.add.tilemap('carte_json');
        // lier le tileset
        // attention : le premier élément est le nom
        // du tileset défini dans "Tiled"
        const terrain = carte.addTilesetImage('DesertSands','image_tileset');
        // attention : les premiers paramètres sont les noms
        // des layers définis dans "Tiled"
        const niveau = carte.createLayer('niveau',[terrain],0,0).setDepth(-1);
        const murs = carte.createLayer('murs',[terrain],0,0);
        murs.setCollisionByProperty({collision : true});

        // debug : contrôle de collision
        const debugG = this.add.graphics().setAlpha(0.7);
        murs.renderDebug(debugG,{
            tileColor : null,
            collidingTileColor : new Phaser.Display.Color(110,234,48,255),
            faceColor : new Phaser.Display.Color(40,39,37,255)
        })

        /* le héros */
        // ajout du sprite d'origine
        this.heros = this.physics.add.sprite(72,295,'heros',12).setScale(0.15);
        this.heros.setBounce(0.2);
        // ajout de la physique
        // this.heros.setBounce(0.2);
        this.heros.setCollideWorldBounds(true);
        this.heros.isMoving = false;

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
        curseurs = this.input.keyboard.createCursorKeys();

        //this.heros.body.offset.x = 16;
        this.physics.add.collider(this.heros,murs,function(){
            console.log("collision","collision");
        })

        // création de plateformes aléatoires
        this.plateformes = this.physics.add.staticGroup();
        for (let i = 0 ; i < 12 ; i++){
            const gauche = Math.round(Math.random());
            let px;
            let tx;
            if(gauche){
                px = 16;
                tx = 128;
            }
            else{
                px = 128;
                tx = 16;                
            }
            const x = px;
            const y = 64+i*16;
            const plateforme = this.plateformes.create(x,y,'sol').setOrigin(0,0);
            const body = plateforme.body;
            this.tweens.add({
                targets: plateforme,
                x: tx,
                duration: 5000,
                ease: 'Linear',
                yoyo : true,
                loop : -1
            });
            body.updateFromGameObject();
            this.physics.add.overlap(this.heros,this.plateformes,function(){
                console.log('ok');
            });
        }
}

function update(){

        // définit la vitesse par défaut
        this.heros.setVelocity(0,0); 
        // pour que le joueur ne bouge que sur les
        // 4 directions, les conditions sont imbriquées
        // en remplaçant les "else if" par des "if",
        // les déplacements en diagonale deviennent possibles
        if (curseurs.left.isDown && !this.heros.isMoving)
        {
            this.heros.isMoving = true;
            // ce code doit être ajouté pour rétablir
            // le personnage dans la bonne direction
            // après un déplacement vers la droite
            if(this.heros.flipX){
                this.heros.flipX = false;
            }
            // ATTENTION : SANS VELOCITY, LE COLLIDER NE MARCHE PAS
            //this.heros.x-=16;
            this.heros.setVelocityX(-1000);
            this.heros.anims.play('gauche',true);
            setTimeout(()=>{
                this.heros.isMoving = false
                this.heros.setVelocity(0,0);
            },200);
        }
        else if (curseurs.right.isDown && !this.heros.isMoving)
        {
            this.heros.isMoving = true;
            // notre SpriteSheet n'a pas d'images
            // pour la droite ; nous allons donc prendre
            // l'animation pour "gauche" et la retourner
            this.heros.setVelocityX(+1000);
            this.heros.anims.play('gauche',true).flipX = true;
            setTimeout(()=>{
                this.heros.isMoving = false
                this.heros.setVelocity(0,0);
            },200);
        }
        else if (curseurs.up.isDown && !this.heros.isMoving)
        {
            this.heros.isMoving = true;
            this.heros.setVelocityY(-970);
            this.heros.anims.play('haut',true);
            setTimeout(()=>{
                this.heros.isMoving = false
                this.heros.setVelocity(0,0);
            },200);
        }
        else if (curseurs.down.isDown && !this.heros.isMoving)
        {
            this.heros.isMoving = true;
            this.heros.setVelocityY(970);
            this.heros.anims.play('bas',true);
            setTimeout(()=>{
                this.heros.isMoving = false
                this.heros.setVelocity(0,0);
            },200);
        }  

}
