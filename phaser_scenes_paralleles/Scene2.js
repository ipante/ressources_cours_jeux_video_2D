class Scene2 extends Phaser.Scene{
    constructor(){
        super({key : 'minimap', active : true})
    }
    preload(){
    }
    create(){
        // création du fond
        let fond = this.add.graphics();
        fond.fillStyle(0xff0000, 0.3);
        fond.fillRect(343, 5, 52, 50);
        // création de l'indicateur
        let indicateur = this.add.graphics();
        indicateur.fillStyle(0xff0000, 0.8);
        indicateur.fillRect(375, 25, 2, 2);
        
        // créer une référence à la première scène
        let scene_boot = this.scene.get('boot');

        // réagir à l'événement nommé "souris_bouge"
        scene_boot.events.on('souris_bouge', valeurs => {
            // modifier la position du second carré
            indicateur.x = (valeurs[0]/8)-32;
            indicateur.y = (valeurs[1]/8)-20;
        })
    }
}