class Jeu extends Phaser.Scene{
    constructor(){
        super('jeu')
    }
    preload(){
        // chargement des sprites
        this.load.spritesheet("invaders","assets/invader.png",{
            // dimensions des deux sprites
            frameWidth : 32,
            frameHeight : 32
        }) 
        // ajouter la spritesheet
        this.load.image('joueur','assets/joueur.jpg');
        this.load.image('ennemi_inactif','assets/ennemi_inactif.jpg');
        this.load.bitmapFont('police', 'assets/police.png', 'assets/police.xml');
    }

    create(){
        // initialiser le score
        score = 0;
        this.peut_bouger = true;
        // peut_bouger = true;
        let compteur_impacts = 0;
        this.joueur = this.physics.add.sprite(50,50,'invaders',1);
        this.autre = this.physics.add.sprite(250,550,'invaders',2);
        Phaser.Actions.ScaleXY([this.joueur,this.autre],1.3,1.3);
        this.joueur.setCollideWorldBounds(true);
        this.autre.setCollideWorldBounds(true);
        this.joueur.setVelocity(0,vitesse_initiale);
        this.autre.setVelocity(0,-vitesse_initiale);
        this.joueur.setBounce(0,force_rebond);
        this.autre.setBounce(0,force_rebond);

        //this.texte_highscore = this.add.bitmapText(180, 30, 'police', `RECORD ${highscore}`,14,2);        
        this.texte_score = this.add.bitmapText(10, 30, 'police', 'SCORE 0',13,2);        


        // ajout de la touche "barre espace"
        this.input.keyboard.on('keyup', e => {
            if(e.keyCode == 32 ){//&& this.peut_bouger){
                // stocker la vitesse courante
                let vitesse_courante = this.joueur.body.velocity.y;
                // arrêter les deux personnages en y
                this.joueur.setVelocity(0,0);
                this.autre.setVelocity(0,0);
                // ajouter l'animation du joueur
                this.tweens.add({
                    targets: this.joueur,
                    x: 150,
                    ease: 'bounce',
                    duration: 100,
                    yoyo: true,
                    onStart: function () {
                        this.peut_bouger = false;
                        console.log(this.peut_bouger);
                    },
                    onComplete: function () {
                        this.peut_bouger = true;
                    },
                });
                // ajouter l'animation de l'autre
                this.tweens.add({
                    targets: this.autre,
                    x: 150,
                    ease: 'bounce',
                    duration: 100,
                    yoyo: true,
                });
                // mesurer l'écart
                // calculer l'écart en position x
                let ecart = Math.round(Math.abs(this.joueur.y-this.autre.y));
                if(ecart >= ecart_1pt){
                }
                else if(ecart >= ecart_2pts){
                    score +=1;
                    this.texte_score.text = 'SCORE ' + score;                    
                }
                else if(ecart >= ecart_3pts){
                    score +=2;
                    this.texte_score.text = 'SCORE ' + score;                     
                }
                else{
                    score +=3;
                    this.texte_score.text = 'SCORE ' + score; 
                }
            // remettre les vitesses courantes
                this.joueur.setVelocity(0,vitesse_courante);
                this.autre.setVelocity(0,-vitesse_courante);   
            }
        })

    }
    
    update(){

    }
}