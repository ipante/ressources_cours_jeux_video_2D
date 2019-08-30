/* Ces fichiers ne se suffisent pas à eux-mêmes!

Pour lancer le boilerplate (qui utilise webpack)
1. téléchargez/clonez le répertoire à cette adresse
  https://github.com/photonstorm/phaser3-project-template
2. allez dans ledit dossier via le terminal ('cd chemin_du_dossier)
3. dans le terminal, tapez "npm install"
4. placez ce fichier et "mon_modal.js" dans le dossier "src"
5. lancez le serveur avec "npm start"

*/

// Phaser est importé comme dépendance
// dans node_modules
import Phaser from "phaser";
import Plugin_modal from "./plugin_modal";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  // ajout du plugin
  plugins: {
    // la déclaration sous forme "global"
    // crée une même instance du plugin
    // pour tout le jeu ; chaque scène pourra
    // ensuite l'invoquer (cf. documentation plus bas
    // pour la différence d'implémentation "global" vs "scene")
    global: [
        {
            // attention, ici c'est une chaîne
            key: 'modal',
            // l'ajout d'un paramètre "url" permet
            // de charger un plugin distant ! non utilisé ici
            // ici, c'est la variable (cf. import)
            plugin: Plugin_modal,
            start: false,
            mapping: 'nom_mapping'
        }
    ]
  },    
  scene: {
    preload: preload,
    create: create
  }
};

const jeu = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");
  this.nom_mapping.saluer();

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}

// documentation sur le système de plugin (scene et global)
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/pluginsystem/
// documentation sur le plugin mananger
// https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html
// liste des exemples spécifiques aux plugins
// https://labs.phaser.io/index.html?dir=plugins/&q=
// example de plugin distant utilisé dans le code
// https://codepen.io/rexrainbow/pen/MPZWZG?editors=0010