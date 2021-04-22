import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    // déclaration de la variable au niveau
    // le plus externe
    player;

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    // déclaration de la variable au niveau
    // le plus externe
    platforms;

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors;

    constructor(){
        super('game')
    }
    
    preload(){
        this.load.image('background', 'assets/bg_layer1.png');
        this.load.image('platform', 'assets/ground_grass.png');
        this.load.image('bunny-stand','assets/bunny1_stand.png');

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create(){
        this.add.image(240, 320, 'background').setScrollFactor(1,0);
        // écriture locale : 
            // const player = this.physics.add.sprite(240,320,'bunny-stand').setScale(0.5);
        // ne permet pas d'accéder à la
        // variable player dans update. Pour éviter cela
        // déclarer juste après export, puis utiliser this ici et dans le collider
        this.player = this.physics.add.sprite(240,320,'bunny-stand').setScale(0.5);

        this.platforms = this.physics.add.staticGroup();
        for (let i = 0 ; i < 5 ; i++){
            const x = Phaser.Math.Between(80,400);
            const y = 150 * i;

            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x,y,'platform');
            platform.scale = 0.5

            /** @type {Phaser.Physics.StaticBody} */
            const body = platform.body;
            // refresh the physics body based on
            // any changes we made to the GameObject
            body.updateFromGameObject();
        }

        this.physics.add.collider(this.platforms,this.player);
        // désactiver les collissions en fonction
        // de l'orientation du collider
        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;
        // suivre le personnage
        this.cameras.main.startFollow(this.player);
        // limiter la caméra à un tunnel vertical
        this.cameras.main.setDeadzone(this.scale.width * 1.5);
    }

    update(){
        const touchingDown = this.player.body.touching.down;

        if(touchingDown){
            this.player.setVelocityY(-300);
        }

        // left and right input logic
        if (this.cursors.left.isDown && !touchingDown){
            this.player.setVelocityX(-200)
        }
        else if (this.cursors.right.isDown && !touchingDown){
            this.player.setVelocityX(200)
        }
        else{
            // stop movement if not left or right
            this.player.setVelocityX(0)
        }

        // principe de pool
        this.platforms.children.iterate(child => {
            const platform = child;
            const scrollY = this.cameras.main.scrollY;
            if(platform.y >= scrollY + 700){
                platform.y = scrollY - Phaser.Math.Between(50,100);
                platform.body.updateFromGameObject();
            }
        })

        this.horizontalWrap(this.player);
    }

    /**
    * @param {Phaser.GameObjects.Sprite} sprite
    */
    horizontalWrap(sprite){
        const halfWidth = sprite.displayWidth * 0.5
        const gameWidth = this.scale.width
        if (sprite.x < -halfWidth){
            sprite.x = gameWidth + halfWidth
        }
        else if (sprite.x > gameWidth + halfWidth){
            sprite.x = -halfWidth
        }
    }
    // page 35

}
