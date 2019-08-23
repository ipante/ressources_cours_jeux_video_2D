![image du cours](https://i.imgur.com/dBKrQKZ.jpg)

# Développement de jeux vidéo 2D - Ressources

Retrouvez ici les différents ressources pédagogique mobilisées dans le cours [Développement de jeux vidéo 2D](https://applicationspub.unil.ch/interpub/noauth/php/Ud/ficheCours.php?v_enstyid=73011&v_ueid=174&v_langue=8) dispensé par [Isaac Pante](http://isaacpante.net) en Section des [sciences du langage et de l'information](http://unil.ch/sli) de l'[Université de Lausanne](http://unil.ch).

## Informations sur l'enseignement

Dispensé au SA2019, toutes les deux semaines, de 16h15 à 18h en salle 5183. Première séance le 23 septembre 2019. Les informations sur la validation, le nombre de crédits ECTS, les prérequis et les plans autorisés sont disponibles sur [la page de l'enseignement](https://applicationspub.unil.ch/interpub/noauth/php/Ud/ficheCours.php?v_enstyid=73011&v_ueid=174&v_langue=8). **Attention, en 2019, ce cours ne sera dispensé qu'au semestre d'automne! Il sera  ensuite dispensé – dès 2021 – chaque semestre de printemps.**

## Liste des ressources internes

1. [**kontra_jump**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/kontra_jump) : exemple de jeu complet en kontra.js; interaction utilisateur, exemple de saut "cran par cran", génération aléatoire d'obstacles et cycle de vie des sprites *(**bonus** : stockage et récupération du highScore dans le localStorage)*
2. [**phaser_scenes_sequentielles**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_sequentielles) : exemple simple de transition entre trois scènes avec et sans interaction utilisateur; chaque scène dispose de sa propre classe écrite dans des fichiers distincts; des données sont transmises entre les scènes 2 et 3 *(**bonus** : chargement de musique de fond et accélération de cette musique dans la scène finale)*.
3. [**phaser_scenes_paralleles**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_paralleles) : exemple de scènes parallèles avec interaction ; le déplacement du pointeur dans la scène principale se répercute sur une "minimap" dessinée dans une autre scène.
4. [**phaser_input**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_input) : exemple de déplacement d'objet au clavier, coup par coup avec des combinaisons de touche ou de manière continue avec les curseurs *(**bonus** : ajout d'une police bitmap pour les instructions ; ajout d'un point d'arrêt contre les bords du monde avec physics : arcade)*.
5. [**phaser_jump**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_jump) : réécriture de kontra-jump en Phaser; ajout de scènes.

## Liste des ressources externes

#### Documentation officielle de Phaser

* [Phaser Notes (documentation officielle mieux présentée)](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html)
* [Documentation officielle (et brute) de l'API](https://photonstorm.github.io/phaser3-docs/)
* [Liste d'exemples en Phaser 3](http://labs.phaser.io/)

#### Tutoriels thématiques

* Scènes
  * [Rapide introduction vidéo aux scènes](https://youtu.be/gFXx7lgxK9A)
  * [Guide des scènes dans Phaser 3 (partie 1)](https://phaser.io/phaser3/devlog/119)
  * [Guide des scènes dans Phaser 3 (partie 2)](https://phaser.io/phaser3/devlog/121)

#### Tutoriels de jeux complets

* [Créer un jeu Phaser complet en 13 vidéos de quelques minutes](https://www.youtube.com/playlist?list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no) par Luis Zuno
* [Recréer Asteroids en Kontra.js](https://medium.com/web-maker/making-asteroids-with-kontra-js-and-web-maker-95559d39b45f)
* [Site d'Emanuelle Feronato](https://www.emanueleferonato.com/) : près de 200 jeux avec code source commenté

#### Jeux complets (avec code source)

* [Bunny game (Phaser)](http://www.emanueleferonato.com/2018/04/28/super-mario-who-html5-platformer-prototype-inspired-by-ios-hit-yeah-bunny-thanks-to-phaser-and-arcade-physics-updated-to-phaser-3-6-0/)
* [Mario Bros (Phaser)](https://github.com/nkholski/phaser3-es6-webpack)

#### Demande de support (Phaser)

* [Forums Phaser 3](https://phaser.discourse.group/c/phaser3)
* [Phaser sur StackOverflow](https://stackoverflow.com/questions/tagged/phaser-framework)
* [Demande de tutoriels](https://phaser.discourse.group/t/tutorial-requests/98/14)

___

### Logiciels

##### Logiciels génériques de développement informatique

* Editer du code : [Visual Studio Code](https://code.visualstudio.com/)
  * Lancer un serveur local (VSCode): [Extension live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  * Accéder directement aux librairies JS (VSCode) : [Extension CDNJS](https://marketplace.visualstudio.com/items?itemName=JakeWilson.vscode-cdnjs)
  * Coder collaborativement (VSCode) : [Extension VS Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
* Gérer votre espace Github : [Github Desktop](https://desktop.github.com/)

##### Logiciels spécifiques au développement de jeux vidéo

* Création de cartes : [Tiled](https://www.mapeditor.org/)
* Création de Texture Atlas : [Free Texture Packer](http://free-tex-packer.com/)
* Création d'Atlas (webservice) : [Atlas Packer Phaser 3](https://gammafp.github.io/atlas-packer-phaser/)
* Pixellisation d'images : [Pixel Art Camera](https://itunes.apple.com/ch/app/pixel-art-camera/id1107180652?l=fr&mt=8)
* Création de sprites : [Aseprite](https://www.aseprite.org/) | $
* Création de sprites (iPad) : [Pixen](https://itunes.apple.com/us/app/pixen-pixel-art-editor/id1161880215?mt=8) | $
* Eclairage de sprites : [Sprite illuminator](https://www.codeandweb.com/spriteilluminator) | $

### Moteurs de jeu recommandés

* [Phaser.js](https://phaser.io/) : le plus célèbre des frameworks de développement de jeux vidéo en Javascript. Suppose une bonne connaissance de la programmation Javascript.
* [Kontra.js](https://straker.github.io/kontra/) : le plus léger des moteurs de jeu en Javascript, développé pour la compétition [js13k](https://js13kgames.com/). Se limite au strict minimum des fonctions proposées par Phaser.js. 
* [Construct 3](https://www.construct.net/fr) : webservice wysiwyg de développement web, il facilite grandement le développement de jeux vidéo Javascript. Reste qu'une connaissance de la programmation est nécessaire pour en tirer parti.  | $
* [Twine 2](https://twinery.org/2/) : moteur de développement de récits interactifs. Twine 2 est disponible en version logicielle et sous forme de webservice. Facile d'accès, il offre aussi des possibilités de scriptage avancé via du Javascript (***Recommandé pour les débutant·e·s en programmation***).
* [Monogatari](https://monogatari.io/) : moteur de développement de visual novels. Facilite la prise en charge des dialogues et l'affichage des différentes scènes. Facile d'accès, il offre des possibilités d'animation et de scriptage avancés via du CSS et du Javascript (***Recommandé pour les débutant·e·s en programmation***).
* [Unity](https://unity.com/fr) : le plus célèbre des environnements de développement de jeux vidéo. La difficulté de la prise en main dépend de la complexité de votre projet et des sommes investies dans différents kits d'assets. A recommander aux étudiant·e·s les plus chevronné·e·s. | $

___

## Assets

### Banques de sprites

* [opengameart.org](https://opengameart.org/)
* [Assets sur itch.io](https://itch.io/game-assets)
* [The Spriters Resource](https://www.spriters-resource.com/)

### Banques de sons

* [Soundtracks itch.io](https://itch.io/soundtracks/free)
* [The sounds Resource](https://www.sounds-resource.com/)
* [Bensound](https://www.bensound.com/)

___

## Projets d'étudiant·e·s

*Bientôt rempli par vos contributions !*

## Varia

* [Liste des codes clavier](https://keycode.info/)
* [Shoebox](https://renderhjs.net/shoebox/) : extraction d'images à partir d'une spritesheet

Cette liste ne demande qu'à s'enrichir! Merci d'envoyer vos suggestions à [Isaac Pante](mailto:isaac.pante@unil.ch).

![image d'échange, sprites créés par Louiza](https://i.imgur.com/oPLxCuB.jpg)
©[Louiza](http://louiza.ch/) pour les sprites
