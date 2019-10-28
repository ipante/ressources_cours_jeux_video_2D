class Accueil extends Phaser.Scene{
    constructor(){
        // la clef d'accès à la scène
        super('accueil')
    }

    preload(){
    }

    create(){
        // ajout du texte
        this.add.text(10,30,'WEDDINVADERS',{fontSize : '30pt'})
        // définition du bouton
        let bouton = this.add.text(90,450,'JOUER',{font : '30pt', fill : 'red'})
        bouton.setInteractive();

        // ajout de la touche "barre espace"
        this.input.keyboard.on('keyup', e => {
            if(e.keyCode == 32){
                this.scene.start('jeu')
            }
        })
    }

}