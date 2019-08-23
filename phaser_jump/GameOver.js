class GameOver extends Phaser.Scene{
    constructor(){
        super('gameover')
    }

    preload(){
        this.load.image('skull','assets/skull.png');
    }
    create(){
        this.add.image(0,0,'skull').setOrigin(0,0);
        this.add.text(10,20,'VOUS ÊTES MORT',{fontSize : '25pt'})
        this.cameras.main.setBackgroundColor('0xff0000');
        setTimeout(()=>{
            this.scene.start('accueil');
        },2000)
    }
}