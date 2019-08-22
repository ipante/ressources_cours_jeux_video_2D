// le nom de la Scene
class Accueil extends Phaser.Scene{
    constructor(){
        // la clef d'accès à la scène
        super('accueil')
    }

    preload(){
    }

    create(){
        // ajout du texte
        this.add.text(70,30,'JUMP',{fontSize : '50pt'})
        let instructions = this.add.text(0,150,"Atteignez le sommet avec\n\nla barre d'espace pour\n\nmarquer. Chaque victoire\n\najoute de nouveaux obstacles.\n\nVous perdez sitôt que vous\n\navez touché 5\n\nobstacles distincts.",{align : 'center'})
        instructions.setFixedSize(300,500)
        // définition du bouton
        let bouton = this.add.text(90,450,'JOUER',{font : '30pt', fill : 'red'})
        bouton.setInteractive();

        // création d'un personnage fictif
        let perso = this.add.graphics();
        perso.fillStyle(0xff0000);
        perso.fillRect(0, 580, 20, 20);

        // lancement du jeu au clic sur le bouton
        bouton.on('pointerdown', () => {
            this.scene.start('jeu')
        },this);
    }

}