class Scene2 extends Phaser.Scene{
    constructor(){
        super('accueil')
    }
    preload(){
        this.load.image('fond','assets/ruined_city.png')
    }
    create(){
        this.add.image(0,0,'fond').setOrigin(0,0)
        let bouton = this.add.text(20,180,'CLIQUER ICI POUR CHANGER DE SCENE',{font : '18px'})
        // transformation du texte en bouton
        bouton.setInteractive();
        // ajout de l'événement
        bouton.on('pointerdown', pointer => {
            // profitons-en pour récupérer
            // les coordonnées du click...
            let touchX = pointer.x;
            let touchY = pointer.y;
            // et les passer à la scène 3
            this.scene.start('merci',[touchX,touchY])
        },this);
    }
}