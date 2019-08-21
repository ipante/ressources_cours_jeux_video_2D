class Scene3 extends Phaser.Scene{
    constructor(){
        super('merci')
    }

    preload(){
        const url = 'assets/bensound-theelevatorbossanova.mp3'
        this.load.audio('ascenseur',url)
        // source de l'image
        // https://www.salud180.com/salud-dia-a-dia/
        // cuantos-dias-de-vacaciones-debes-pedir-para-evitar-una-muerte-prematura
        this.load.image('vacances','assets/vacation.jpg')
    }

    create(){
        this.add.image(0,0,'vacances').setOrigin(0,0)
        this.musique = this.sound.add('ascenseur')
        // accélérer la musique (2 fois)
        this.musique.setRate(2)
        this.musique.play()
        this.add.text(40,330,'MERCI POUR VOTRE ATTENTION !',{font : '20px', fill : 'white'})
    }
}