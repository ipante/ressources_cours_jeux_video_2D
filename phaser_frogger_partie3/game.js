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
        arcade : {
            debug : true
        }
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
let soutenu = false;
let plateformes;

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
        // const debugG = this.add.graphics().setAlpha(0.7);
        // murs.renderDebug(debugG,{
        //     tileColor : null,
        //     collidingTileColor : new Phaser.Display.Color(110,234,48,255),
        //     faceColor : new Phaser.Display.Color(40,39,37,255)
        // })

        /* le héros */
        // ajout du sprite d'origine
        heros = this.physics.add.sprite(72,297,'heros',12).setScale(0.15);
        heros.setBounce(0.2);
        // ajout de la physique
        // heros.setBounce(0.2);
        heros.setCollideWorldBounds(true);
        heros.isMoving = false;

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

        //heros.body.offset.x = 16;
        this.physics.add.collider(heros,murs);

        // création de plateformes aléatoires
        plateformes = this.physics.add.group();

        for (let i = 0 ; i < 12 ; i++){
            // déterminer le placement initial des blocs
            let x = Math.random() > 0.5 ? 16 : 128;
            // exception pour les blocs sur le vide
            const y = 64+i*16;
            const plateforme = plateformes.create(x,y,'sol').setOrigin(0,0);
            plateforme.setVelocityX(30);
            plateforme.setCollideWorldBounds(true);
            plateforme.setBounce(1,0);             
        }

        //enlever le sixième élément
        plateformes.remove(plateformes.children.entries[6],true);
        // plateformes.killAndHide(plateformes.children.entries[6]);
        // plateformes.children.entries[6].setActive(false).setVisible(false);
        // teinter les ponts
        plateformes.children.entries[2].setTint(0x00ff00);
        plateformes.children.entries[3].setTint(0x00ff00);
        plateformes.children.entries[4].setTint(0x00ff00);
        plateformes.children.entries[5].setTint(0x00ff00);

        // ajouter le contact aux murs
        this.physics.add.collider(murs,plateformes);

        // interactions du heros avec les plateformes
        this.physics.add.overlap(heros,plateformes,(h,p) => {
            // si on est sur des obstacles tueurs
            if(h.y > 168 || h.y < 87){
                console.log("heros.x",heros.y);
                h.x = 72;
                h.y = 297;
            }
            // sinon, les obstacles sont des plateformes
            else{
                h.body.velocityX = p.body.velocityX;
            }
        });
}

function update(){

        // définit la vitesse par défaut
        // heros.setVelocity(0,0) ou
        heros.body.stop(); 

        // pour que le joueur ne bouge que sur les
        // 4 directions, les conditions sont imbriquées
        // en remplaçant les "else if" par des "if",
        // les déplacements en diagonale deviennent possibles
        if (curseurs.left.isDown && !heros.isMoving)
        {
            heros.isMoving = true;
            // ce code doit être ajouté pour rétablir
            // le personnage dans la bonne direction
            // après un déplacement vers la droite
            if(heros.flipX){
                heros.flipX = false;
            }
            // ATTENTION : SANS VELOCITY, LE COLLIDER NE MARCHE PAS
            heros.setVelocityX(-1000);
            heros.anims.play('gauche',true);
            setTimeout(()=>{
                heros.isMoving = false
                heros.setVelocity(0,0);
                // ajustement pixel par pixel
                heros.x - (8 - heros.x % 16);
            },200);
        }
        else if (curseurs.right.isDown && !heros.isMoving)
        {
            heros.isMoving = true;
            // notre SpriteSheet n'a pas d'images
            // pour la droite ; nous allons donc prendre
            // l'animation pour "gauche" et la retourner
            heros.setVelocityX(+1000);
            heros.anims.play('gauche',true).flipX = true;
            setTimeout(()=>{
                heros.isMoving = false
                heros.setVelocity(0,0);
                // ajustement pixel par pixel
                heros.x - (8 - heros.x % 16);
            },200);
        }
        else if (curseurs.up.isDown && !heros.isMoving)
        {
            heros.isMoving = true;
            heros.setVelocityY(-970);
            heros.anims.play('haut',true);
            setTimeout(()=>{
                heros.isMoving = false
                heros.setVelocity(0,0);
                // ajustement pixel par pixel
                heros.y - (8 - heros.y % 16);
            },200);
        }
        else if (curseurs.down.isDown && !heros.isMoving)
        {
            heros.isMoving = true;
            heros.setVelocityY(970);
            heros.anims.play('bas',true);
            setTimeout(()=>{
                heros.isMoving = false
                heros.setVelocity(0,0);
                // ajustement pixel par pixel
                heros.y - (8 - heros.y % 16);
            },200);
        }  

}
