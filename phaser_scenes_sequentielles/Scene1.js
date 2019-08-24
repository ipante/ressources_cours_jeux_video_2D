// le nom de la Scene
class Scene1 extends Phaser.Scene{
    constructor(){
        // la clef d'accès à la scène
        super('boot')
    }

    preload(){
        // morceau de Benjamin Tissot tiré de
        // https://www.bensound.com/
        const url = 'assets/bensound-theelevatorbossanova.mp3'
        // image anonyme disponible sur
        // https://imgur.com/gallery/DNsXXq9
        this.load.image('skeleton','assets/skeleton.jpg')
        this.load.audio('ascenseur',url)
    }

    create(){
        this.musique = this.sound.add('ascenseur')
        this.musique.play()
        this.add.image(200,200,'skeleton')
        this.add.text(20,20,'Chargement... Veuillez patienter.')
        setTimeout(()=>{
            this.musique.stop()
            // appel de Scene2.js, via le nom
            // déclaré dans le constructeur de Scene2
            this.scene.start('accueil')
        },8500);
        // nous pourrions aussi nous passer du
        // Timeout en utilisant les transitions
        // this.scene.transition({
        //     target: 'accueil',
        //     duration: 8500,
        //     moveAbove: true
        // });
        // toutes les informations dans le devlog 120
        // https://phaser.io/phaser3/devlog/120

    }
}