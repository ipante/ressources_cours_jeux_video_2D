![image du cours](https://i.imgur.com/dBKrQKZ.jpg)

# Développement de jeux vidéo 2D - Ressources

Retrouvez ici les différents ressources pédagogique mobilisées dans le cours [Développement de jeux vidéo 2D](https://applicationspub.unil.ch/interpub/noauth/php/Ud/ficheCours.php?v_enstyid=73011&v_ueid=174&v_langue=8) dispensé par [Isaac Pante](http://isaacpante.net) en Section des [sciences du langage et de l'information](http://unil.ch/sli) de l'[Université de Lausanne](http://unil.ch).

## Informations sur l'enseignement

Dispensé au SA2019, toutes les deux semaines, de 16h15 à 18h en salle 5183. Première séance le 23 septembre 2019. Les informations sur la validation, le nombre de crédits ECTS, les prérequis et les plans autorisés sont disponibles sur [la page de l'enseignement](https://applicationspub.unil.ch/interpub/noauth/php/Ud/ficheCours.php?v_enstyid=73011&v_ueid=174&v_langue=8). **Attention, en 2019, ce cours ne sera dispensé qu'au semestre d'automne! Il sera  ensuite dispensé – dès 2021 – chaque semestre de printemps.**

## Liste des travaux pratiques

1. [**kontra_jump**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/kontra_jump) : exemple de jeu complet en kontra.js; interaction utilisateur, exemple de saut "cran par cran", génération aléatoire d'obstacles et cycle de vie des sprites *(**bonus** : stockage et récupération du highScore dans le localStorage)*
2. [**phaser_scenes_sequentielles**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_sequentielles) : exemple simple de transition entre trois scènes avec et sans interaction utilisateur; chaque scène dispose de sa propre classe écrite dans des fichiers distincts; des données sont transmises entre les scènes 2 et 3 *(**bonus** : chargement de musique de fond et accélération de cette musique dans la scène finale)*.
3. [**phaser_scenes_paralleles**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_paralleles) : exemple de scènes parallèles avec interaction ; le déplacement du pointeur dans la scène principale se répercute sur une "minimap" dessinée dans une autre scène.
4. [**phaser_input**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_input) : exemple de déplacement d'objet au clavier, coup par coup avec des combinaisons de touche ou de manière continue avec les curseurs *(**bonus** : ajout d'une police bitmap pour les instructions ; ajout d'un point d'arrêt contre les bords du monde avec physics : arcade)*.
5. [**système physique (***exemple commenté***)**](https://labs.phaser.io/view.html?src=src\physics\arcade\sprite%20vs%20sprite.js) : un exemple tout simple de deux sprites qui rebondissent contre le monde et entre eux.
6. [**phaser_jump**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_jump) : réécriture de kontra-jump en Phaser; ajout de scènes.
7. [**animations sans atlas**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_animations_sans_atlas) : importation d'une spritesheet et création des animations pour les 4 points cardinaux.
8. [**animations avec atlas et tweens**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_animations_avec_atlas_et_tweens) : importation de deux spritesheet ainsi que d'un atlas JSON; les animations sont soumises à deux transformations (tweens) chaînées *(**bonus** : évocation de l'alternative "timeline")*.
9. [**phaser_pool**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_pool) : création d'un pool, utilisation pour l'affichage et la suppression d'objets. **TO COMPLETE**
10. [**phaser runner**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_runner) : un jeu complet d'Emanuele Feronato qui illustre l'utilisation de "pool" pour créer un infinite runner ; les identifiants ont été francisés pour faciliter la compréhension et des commentaires ajoutés. **TO COMPLETE**

## Liste des ressources externes

#### Documentation officielle de Phaser

* [Phaser Notes](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html) : la documentation officielle de l'API de Phaser 3 est souvent difficile à lire. Ces notes reprennent l'essentiel de la documentation sous une forme nettement plus adaptée.
* [Documentation officielle de l'API](https://photonstorm.github.io/phaser3-docs/) : la documentation officielle (et brute) de Phaser 3.
* [Liste d'exemples en Phaser 3](http://labs.phaser.io/) : des exemples classés par thématiques sur la plupart des composantes essentielles de Phaser 3.
* [PhaserWorld](https://phaser.io/community/newsletter) : la newsletter de Phaser, soit la meilleur source de tutoriels et d'informations sur les évolutions du framework. Abonnez-vous pendant la durée de ce cours!

#### Demande de support (Phaser)

* [Forums Phaser 3](https://phaser.discourse.group/c/phaser3) : le meilleur endroit où poser une question spécifique au framework. Grande réactivité et information à la source.
* [Phaser sur StackOverflow](https://stackoverflow.com/questions/tagged/phaser-framework) : questions sur le framework ainsi que sur Javascript en général.
* [Demande de tutoriels](https://phaser.discourse.group/t/tutorial-requests/98/14) : un tutoriel vous manque? Demandez-le sur ce thread. Egalement un excellent lieu où retrouver une liste de tutoriels suggérés par les participant·e·s.

#### Tutoriels thématiques

* Javascript pur
  * [Typescript en 50 minutes](https://www.youtube.com/watch?v=WBPrJSw7yQA)
  * [ES6 : Objets, méthodes et prototype (Ocean Digital)](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript#constructor-functions)
  * [ES6, idem autre tutoriel](https://javascript.info/class)
  * [ES6, idem, autre tutoriel](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)
  * [ES6, idem, autre tutoriel](https://medium.com/@robertgrosse/how-es6-classes-really-work-and-how-to-build-your-own-fd6085eb326a)

* Scènes
  * [Rapide introduction vidéo aux scènes](https://youtu.be/gFXx7lgxK9A)
  * [Guide des scènes dans Phaser 3 (partie 1)](https://phaser.io/phaser3/devlog/119)
  * [TP : phaser_scenes_sequentielles](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_sequentielles)
  * [TP : phaser_scenes_paralleles](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_paralleles)
  * [Guide des scènes dans Phaser 3 (partie 2)](https://phaser.io/phaser3/devlog/121)
  * [Ajouter des transitions à vos scènes](https://phaser.io/phaser3/devlog/120)
  
* Spritesheet, Animations & Tweens
  * [Rapide introduction vidéo aux spritesheets & aux animations](https://www.youtube.com/watch?v=U0K0YTifb1w&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=6&t=0s)
  * [Tutoriel vidéo d'animations avec et sans texture atlas](https://www.youtube.com/watch?v=RrOGj6x5Y8I)
  * [TP : animation sans atlas](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_animations_sans_atlas)
  * [TP : animation avec atlas et tweens](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_animations_avec_atlas_et_tweens)

#### Tutoriels de jeux complets

* [Créer un jeu Phaser complet en 13 vidéos de quelques minutes](https://www.youtube.com/playlist?list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no) par Luis Zuno
* [Recréer Asteroids en Kontra.js](https://medium.com/web-maker/making-asteroids-with-kontra-js-and-web-maker-95559d39b45f)
* [Site d'Emanuelle Feronato](https://www.emanueleferonato.com/) : près de 200 jeux avec code source commenté

#### Jeux complets (avec code source)

* [Bunny game (Phaser)](http://www.emanueleferonato.com/2018/04/28/super-mario-who-html5-platformer-prototype-inspired-by-ios-hit-yeah-bunny-thanks-to-phaser-and-arcade-physics-updated-to-phaser-3-6-0/)
* [Mario Bros (Phaser)](https://github.com/nkholski/phaser3-es6-webpack)
* [A day in the life (Kontra)](https://js13kgames.com/entries/a-day-in-the-life)

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
* Création de Texture Atlas : [Atlas Packer Phaser 3](https://gammafp.github.io/atlas-packer-phaser/)
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

* [Opengameart.org](https://opengameart.org/)
* [Assets sur itch.io](https://itch.io/game-assets)
* [The Spriters Resource](https://www.spriters-resource.com/)

### Banques de sons

* [Soundtracks itch.io](https://itch.io/soundtracks/free)
* [The sounds Resource](https://www.sounds-resource.com/)
* [Bensound](https://www.bensound.com/)

___

## Projets d'étudiant·e·s

*Bientôt rempli par vos contributions !*

___

## Inspirations en médiation

* Simulateur de pauvreté : [Spent](http://playspent.org/html/)
* Simulateur de banalité du mal : [Papers Please](https://papersplea.se/)
* Simulateur de gestion des données personnelles : [Datak](https://www.datak.ch/#/play)

## Livres

* Théorie du jeu
  * Johan Huizinga, [*Homo Ludens*](https://fr.wikipedia.org/wiki/Homo_ludens) (1938)
* Game Design
  * George Skaff Elias, Richard Garfield and K. Robert Gutschera, [*Characteristics of Games*](https://mitpress.mit.edu/books/characteristics-games), MIT Press (2012)
* Développement
  * Emanuelle Feronato, [HTML5 Cross Platform Game Development Using Phaser 3](https://gumroad.com/l/odKJf)

## Varia

* [Liste des codes clavier](https://keycode.info/)
* [Optimiser le chargement des assets](https://jwiese.eu/en/blog/2018/04/phaser-3-loading-screen-asset-organization/)
* [Shoebox](https://renderhjs.net/shoebox/) : extraction d'images à partir d'une spritesheet
* [L'aléatoire dans les jeux](https://remysharp.com/2019/08/06/predictably-random)
* [Apprendre js13k en 4 vidéos](https://gamedevacademy.org/js13kgames-tutorial-video-series/)
* [Facebook Instant Game](https://phasertutorials.com/a-guide-to-using-the-facebook-instant-games-plugin-for-phaser-3-part-1/?a=13)
* Fiction interactive :  [Wardialler](https://nervoustestpilot.itch.io/wardialler)

Cette liste ne demande qu'à s'enrichir! Merci d'envoyer vos suggestions à [Isaac Pante](mailto:isaac.pante@unil.ch).

![image d'échange, sprites créés par Louiza](https://i.imgur.com/oPLxCuB.jpg)
©[Louiza](http://louiza.ch/) pour les sprites
