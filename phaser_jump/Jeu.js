class Jeu extends Phaser.Scene{
    constructor(){
        super('jeu')
    }
    preload(){
        this.load.image('joueur','assets/joueur.jpg');
        this.load.image('ennemi_inactif','assets/ennemi_inactif.jpg');
        this.load.audio('musique','assets/bensound-summer.mp3');
    }

    create(){
        this.musique = this.sound.add('musique');
        this.musique.play();
        // initialiser le score
        score = 0;
        let compteur_impacts = 0;
        // ajout du joueur
        this.joueur = this.physics.add.image(8,590,'joueur');
        this.joueur.setCollideWorldBounds(true);
        this.joueur.setVelocity(200,0);
        this.joueur.setBounce(1,0);
        // création du groupe d'obstacles
        this.groupe_obstacles = this.add.group();   

        // générer autant d'obstacles que nécessaire
        for(let i = 0; i < n_obstacles; i++){
            let obstacle = this.physics.add.image(
                20 * Math.random() * 14,
                20 * Math.random() * 28,
                'ennemi_inactif'
            );
            // ajout de l'obstacle au groupe
            this.groupe_obstacles.add(obstacle);
        }
        // ajout de la touche "barre espace"
        this.input.keyboard.on('keyup', e => {
            if(e.keyCode == 32){
                this.joueur.y -= 20;
            }
        })
        // activation des collisions
        // on préfère "overlap" pour désactiver
        // les réactions physiques (rebond, etc.)
        this.physics.add.overlap(this.groupe_obstacles,this.joueur,(o,j)=>{
            // si cet adversaire n'a pas déjà été touché
            if(o.texture.key == 'ennemi_inactif'){
                // augmenter le compteur d'impacts
                compteur_impacts++;
                // si le compte est bon
                if(compteur_impacts == max_impacts){
                    // lancer la scène game over
                    this.scene.start('gameover');
                }
            }
            // changement du statut de l'objet
            o.texture.key = 'ennemi_actif';
            // coloration de l'objet
            o.setTint(0xff0000);
            // réinitialisation de la position du joueur
            j.x = 8;
            j.y = 590;           
        });
    }
    
    update(){
        if(this.joueur.x>400){
            this.joueur.setVelocityX(-200); 
        }
        // si le joueur gagne
        if(this.joueur.y<22){
            score++;
            // réinitialisation de la position du joueur
            this.joueur.x = 8;
            this.joueur.y = 590; 
            // ajout de deux obstacles
            for(let i = 0; i < 2; i++){
                let obstacle = this.physics.add.image(
                    20 * Math.random() * 14,
                    20 * Math.random() * 28,
                    'ennemi_inactif'
                );
                // ajout de l'obstacle au groupe
                this.groupe_obstacles.add(obstacle);
            } 
        }
    }
}