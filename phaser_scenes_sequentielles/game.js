const config = {
    width : 400,
    height : 400,
    backgroundColor : 'black',
    // toutes les scenes doivent
    // être référencées ici
    // la première sera lancée
    // par défaut
    scene : [Scene1,Scene2,Scene3]
}

let jeu = new Phaser.Game(config);