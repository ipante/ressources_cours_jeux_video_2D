class Jeu extends Phaser.Scene{
    constructor(){
        super('jeu')
    }
    preload(){
    }

    create(){
        // création du groupe d'obstacles
        this.groupe_obstacles = this.add.group();

        // générer autant d'obstacles que nécessaire
        for(let i = 0; i < n_obstacles; i++){
            let obstacle = this.add.graphics();
            obstacle.fillStyle('0xffffff');
            obstacle.fillRect(
                20 * Math.random() * 14,
                20 * Math.random() * 28,
                15,
                15
            );
            // ajout de l'obstacle au groupe
            this.groupe_obstacles.add(obstacle);
        }

        // création du joueur
        let perso = this.add.graphics();
        perso.fillStyle(0xff0000);
        perso.fillRect(0, 580, 20, 20);

    }    

}