class GameOver extends Phaser.Scene{
    constructor(){
        super('gameover')
    }

    preload(){
    }
    create(){
        this.add.text(10,20,`${score} points`,{fontSize : '25pt'})
        setTimeout(()=>{
            this.scene.start('accueil');
        },2000)
    }
}