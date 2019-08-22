// objet de configuration
const config = {
    width : 400,
    height : 400,
    pixelArt: true,
    backgroundColor : 'black',
    // activation du moteur physique
    // pour la collision avec les bords
    physics : {
        default : 'arcade',
        arcade : {
            // affiche le mode debug
            debug : true
        }
    },
    // ajout des fonctions retenues
    scene : {
        preload : preload,
        create : create,
        update : update
    }    
}
// initialisation des variables hors
// de create & update pour y accéder
// dans chaque fonction
let perso;
let fleches;

let jeu = new Phaser.Game(config);

function preload(){
    this.load.image('vaisseau', 'vaisseau.png');
    this.load.image('fond','ruined_city.png');
    
    // BONUS : chargement des polices en bitmap
    // deux fichiers nécessaires, l'image (PNG)
    // et les coordonnées XML
    this.load.bitmapFont('police', 'police.png', 'police.xml');
}

function create(){
    // ajout du fond
    this.add.image(0,0,'fond').setOrigin(0,0);
    
    // BONUS : chargement du texte, le dernier paramètre
    // définit l'alignement (2 = droite)
    this.add.bitmapText(50, 50, 'police', `DEPLACEMENT AVEC SHIFT + AWSD
    \n\n, OU AVEC LES FLECHES`,10,2);

    // création du vaisseau : atention à ajouter PHYSICS ! 
    perso = this.physics.add.image(185, 185,'vaisseau')
    // limitation du mouvement
    // permis par "arcade" dans "config"
    perso.setCollideWorldBounds(true);
    // mouvement discontinu peut être créé dans
    // create, pas besoin de 60 FPS
    this.input.keyboard.on('keyup', function (event){
        if(event.shiftKey){
            switch (event.keyCode) {
                case 65: // touche A
                    perso.x -= 20;
                    break;
                case 68: // touche D
                    perso.x += 20;
                    break;
                case 87: // touche W
                    perso.y -= 20;
                    break;
                case 83: // touche S
                    perso.y += 20;
                    break;                          
            }
        }
    })
    // création des curseurs pour le
    // mouvement continu dans update()
    fleches = this.input.keyboard.createCursorKeys();
}    

function update(){
    // définition de la vitesse sans intervention
    // sans cette ligne, le mouvement se poursuit
    // de frame en frame
    perso.setVelocity(0);
    if (fleches.left.isDown)
    {
        perso.setVelocityX(-300);
    }
    else if (fleches.right.isDown)
    {
        perso.setVelocityX(300);
    }

    if (fleches.up.isDown)
    {
        perso.setVelocityY(-300);
    }
    else if (fleches.down.isDown)
    {
        perso.setVelocityY(300);
    }    
}