const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: window.innerWidth,
  height: window.innerHeight,   
  scene: {
    preload: preload,
    create: create,
    update : update
  }
};

const jeu = new Phaser.Game(config);

function preload(){
  // charger une image
  this.load.image('fond','fond.png');
  // charger les données JSON
  this.load.json('donnees','donnees.json');
}

function create(){
  // afficher l'image
  this.add.image(0,0,'fond').setOrigin(0,0);
  // récupérer les données dans le cache
  this.donnees = this.cache.json.get('donnees');
}

function update(){
  // ajouter du texte à chaque frame
  this.add.text(
    Phaser.Math.Between(0,config.width),
    Phaser.Math.Between(0,config.height),
    tirer_phrase(this.donnees),
    {
      'color' : 'lightgreen',
      'font': `${Phaser.Math.Between(1,30)}pt`
    }
  );
}

function tirer_phrase(mes_donnees){
    // 1. tirer l'humeur : positif ou négatif
    let mood = Phaser.Math.Between(0,1) === 0 ? 'negatif' : 'positif';
    // 2. tirer au hasard une valeur du tableau
    return Phaser.Math.RND.pick(mes_donnees[mood]);
}