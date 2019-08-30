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
import mon_modal from "./mon_modal";
import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");
  console.log(mon_modal);
  mon_modal(10)

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
