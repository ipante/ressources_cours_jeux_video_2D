![image du cours](https://i.imgur.com/dBKrQKZ.jpg)

# Lien Zoom & serveur Discord

* [Lien Zoom : https://unil.zoom.us/my/isaacpante](https://unil.zoom.us/my/isaacpante)
* [Lien Discord](https://discord.gg/hwgdtytD)

# Développement de jeux vidéo 2D - Ressources

Retrouvez ici les différents ressources pédagogique mobilisées dans le cours [Développement de jeux vidéo 2D](https://applicationspub.unil.ch/interpub/noauth/php/Ud/ficheCours.php?v_enstyid=73011&v_ueid=174&v_langue=8) dispensé par [Isaac Pante](http://isaacpante.net) en Section des [sciences du langage et de l'information](http://unil.ch/sli) de l'[Université de Lausanne](http://unil.ch).

## Informations sur l'enseignement

Dispensé au SP2021, chaque semaine, de 16h15 à 17h45 en ligne. Première séance le 22 février 2021. Les informations sur la validation, le nombre de crédits ECTS, les prérequis et les plans autorisés sont disponibles sur [la page de l'enseignement](https://applicationspub.unil.ch/interpub/noauth/php/Ud/ficheCours.php?v_enstyid=73011&v_ueid=174&v_langue=8). 

* [Liste des jeux développés en 2019](https://docs.google.com/spreadsheets/d/13LCtmN9BV--MkqaHLbGGi5XGz1IbeXiJ-h4sMzdzrHQ/edit?usp=sharing)*

## Projet ANTHROPOLE

### Ressources

* [Github LikeLike](https://github.com/molleindustria/likelike-online)
* [DMC Workshop Zone](https://researching-gamemaking.glitch.me/) et [présentation](https://twitter.com/BRKeogh/status/1354349810589921282?s=20)

### Installation locale & lancement de serveur

1 [Installation de node](https://nodejs.org/en/download/)
2 [Installation de Github Desktop](https://desktop.github.com/)
3 [Cloner le répertoire LikeLike-online (Code > Github Desktop)](https://github.com/molleindustria/likelike-online)
4 Ouvrir le répertoire Github/likelike-online sous VS Code
5 Ouvrir un Terminal sous VS Code
6 npm install
7 node server.js

## Liste des travaux pratiques

1. [**kontra_jump**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/kontra_jump) : exemple de jeu complet en kontra.js; interaction utilisateur, exemple de saut "cran par cran", génération aléatoire d'obstacles et cycle de vie des sprites *(**bonus** : stockage et récupération du highScore dans le localStorage)*
2. [**phaser_json**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_json) : importation de données au format JSON et affichage aléatoire.
3. [**phaser_scenes_sequentielles**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_sequentielles) : exemple simple de transition entre trois scènes avec et sans interaction utilisateur; chaque scène dispose de sa propre classe écrite dans des fichiers distincts; des données sont transmises entre les scènes 2 et 3 *(**bonus** : chargement de musique de fond et accélération de cette musique dans la scène finale)*.
4. [**phaser_scenes_paralleles**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_scenes_paralleles) : exemple de scènes parallèles avec interaction ; le déplacement du pointeur dans la scène principale se répercute sur une "minimap" dessinée dans une autre scène.
5. [**phaser_input**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_input) : exemple de déplacement d'objet au clavier, coup par coup avec des combinaisons de touche ou de manière continue avec les curseurs *(**bonus** : ajout d'une police bitmap pour les instructions ; ajout d'un point d'arrêt contre les bords du monde avec physics : arcade)*.
6. [**système physique (***exemple commenté***)**](https://labs.phaser.io/view.html?src=src\physics\arcade\sprite%20vs%20sprite.js) : un exemple tout simple de deux sprites qui rebondissent contre le monde et entre eux.
7. [**phaser_jump**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_jump) : réécriture de kontra-jump en Phaser; ajout de scènes.
8. [**animations sans atlas**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_animations_sans_atlas) : importation d'une spritesheet et création des animations pour les 4 points cardinaux.
9. [**animations avec atlas et tweens**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_animations_avec_atlas_et_tweens) : importation de deux spritesheet ainsi que d'un atlas JSON; les animations sont soumises à deux transformations (tweens) chaînées *(**bonus** : évocation de l'alternative "timeline")*.
10. [**phaser_pool_input**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_pool_input) : création d'un pool, utilisation pour l'affichage et la suppression d'objets.
11. [**phaser_pool_animation**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_pool_animation) : code de Richard Davey sur la génération de sprites animés tirés d'un pool.
12. [**phaser_runner**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_runner) : un jeu complet d'Emanuele Feronato qui illustre l'utilisation de "pool" pour créer un infinite runner ; les identifiants ont été francisés pour faciliter la compréhension et des commentaires ajoutés.
13. [**phaser_boilerplate_webpack**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_boilerplate_webpack) : installation d'un boilerplate phaser utilisant webpack ; ajout d'un module externe et importation de la fonction de ce dernier.
14. [**phaser_plugin_global**](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_plugin_global) : écriture d'un plugin global.

## Code source du laboratoire de réécriture de JV

* [Breakout](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_breakout_manette)

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

#### Ressources thématiques

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
  
* Pool et cycle de vie des objets
  * [TP : phaser_pool_input](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_pool_input)
  * [TP : phaser_pool_animation](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_pool_animation)
  * [TP : phaser_runner](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_runner)

* Cartes
  * [Vidéo : créer une carte avec Tiled](https://www.youtube.com/watch?v=2_x1dOvgF1E)
  * [Vidéo : intégrer la carte à un jeu Phaser](https://www.youtube.com/watch?v=uznkhVMbVr8)
  * [Tutoriel : créer une carte avec Tiled](https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/)
  * [Tutoriel : ajouter une carte avec Tiled et gérer la physique avec Matter.js](https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6)
  * [Tutoriel : créer des cartes dynamiques](https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-2-dynamic-platformer-3d68e73d494a)
  * [Tutoriel : changement de pièce](http://www.geekwagon.net/index.php/2019/room-changing-phaser3-titled/)

* Utilisation de webpack
  * [TP : création d'un projet à partir d'un Boilerplate](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_boilerplate_webpack)
  
* Intégrations de plugins  
  * [TP : phaser_plugin_global](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_plugin_global)
  * [Documentation sur les types de plugin (scene et global)](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/pluginsystem/)
  * [Documentation complète sur le plugin mananger](https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html)
  * [Liste des exemples spécifiques aux plugins](https://labs.phaser.io/index.html?dir=plugins/&q=)    
  
* Partager votre jeu
  * Sur Facebook Instant Game
    * [Documentation officielle de Facebook]()
    * [Tutoriel officiel Phaser](https://phaser.io/tutorials/getting-started-facebook-instant-games/index)
    * [Tutoriel d'Emanuele Feronato](https://www.emanueleferonato.com/2018/05/18/my-first-facebook-instant-game-has-been-released-play-risky-steps-on-facebook-and-learn-how-to-build-your-own-game/?fbclid=IwAR0aEOjH8H4kdQtodoxScc0VqyPrC6NADpR0WGCwA0ZzpXSHNDzgv7vGtWs)
    * [Tutoriel de Zenva](https://phasertutorials.com/a-guide-to-using-the-facebook-instant-games-plugin-for-phaser-3-part-1/?a=13)
    * [Procédure de publication & checklist](https://www.facebook.com/fbgaminghome/developers/get-started)
    * [Forum dédié sur Phaser forums](http://www.html5gamedevs.com/forum/37-facebook-instant-games/)

#### Tutoriels de jeux complets

* [Créer un jeu Phaser complet en 13 vidéos de quelques minutes](https://www.youtube.com/playlist?list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no) par Luis Zuno
* [Recréer Asteroids en Kontra.js](https://medium.com/web-maker/making-asteroids-with-kontra-js-and-web-maker-95559d39b45f)
* [Création d'un Broughlike en pur JS](https://nluqo.github.io/broughlike-tutorial/stage0.html)
* [Site d'Emanuelle Feronato](https://www.emanueleferonato.com/) : près de 200 jeux avec code source commenté
* [Créer un Tetris en pur JS](https://medium.com/@michael.karen/learning-modern-javascript-with-tetris-92d532bcd057)
* [Créer un infinite Jumper](https://ourcade.co/books/infinite-jumper-phaser3/)
* [Créer un très simple "dinojump" en pur JS](https://www.youtube.com/watch?v=bG2BmmYr9NQ)

#### Jeux complets (avec code source)

* [Bunny game (Phaser)](http://www.emanueleferonato.com/2018/04/28/super-mario-who-html5-platformer-prototype-inspired-by-ios-hit-yeah-bunny-thanks-to-phaser-and-arcade-physics-updated-to-phaser-3-6-0/)
* [Mario Bros (Phaser)](https://github.com/nkholski/phaser3-es6-webpack)
* [A day in the life (Kontra)](https://js13kgames.com/entries/a-day-in-the-life)
* [Breakout](https://github.com/ipante/ressources_cours_jeux_video_2D/tree/master/phaser_breakout_manette)

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
* Outil de rotoscopie en Pixel Art : [Paint of Persia](https://dunin.itch.io/ptop)
* Création de sprites : [Piskel](https://www.piskelapp.com/)
* Création de sprites : [Aseprite](https://www.aseprite.org/) | $
* Création de sprites (iPad) : [Pixen](https://itunes.apple.com/us/app/pixen-pixel-art-editor/id1161880215?mt=8) | $
* Extraction d'images à partir d'une spritesheet : [Shoebox](https://renderhjs.net/shoebox/)
* Eclairage de sprites : [Sprite illuminator](https://www.codeandweb.com/spriteilluminator) | $

### Moteurs de jeu recommandés

#### Environnements génériques

* [Phaser.js](https://phaser.io/) : le plus célèbre des frameworks de développement de jeux vidéo en Javascript. Suppose une bonne connaissance de la programmation Javascript.
* [Kontra.js](https://straker.github.io/kontra/) : le plus léger des moteurs de jeu en Javascript, développé pour la compétition [js13k](https://js13kgames.com/). Se limite au strict minimum des fonctions proposées par Phaser.js. 
* [Construct 3](https://www.construct.net/fr) : webservice wysiwyg de développement web, il facilite grandement le développement de jeux vidéo Javascript. Reste qu'une connaissance de la programmation est nécessaire pour en tirer parti.  | $
* [Unity](https://unity.com/fr) : le plus célèbre des environnements de développement de jeux vidéo. La difficulté de la prise en main dépend de la complexité de votre projet et des sommes investies dans différents kits d'assets. A recommander aux étudiant·e·s les plus chevronné·e·s. | $
* [Script-8](https://script-8.github.io/) : un développemnt pur web ! Assets, son, musique et logique de jeu peuvent être créés directement dans Script-8, à l'instar de Pico-8, dont ce moteur s'inspire largement.
* [Bitmelo](https://bitmelo.com/) : un développement pur web à l'instar de Script 8. Bitmelo propose également un éditeur de carte.
* [Stage.js](http://piqnt.com/stage.js/) : une librairie pour le développement de JV2D multiplateforme en HTML5.
* [VoxelSpace](https://github.com/s-macke/VoxelSpace) : un algorithme de rendu pour générer des mondes en 2.5D.
* [Hex engine](https://github.com/suchipi/hex-engine) : un pur moteur JS inspiré de React encore en développement, à surveiller de près.
* [24 a 2](https://github.com/jamesroutley/24a2) : un moteur de jeu JS pour des jeux dans une grille de 24 par 24. 

#### Fictions interactives & Visual novel

* [Twine 2](https://twinery.org/2/) : moteur de développement de récits interactifs. Twine 2 est disponible en version logicielle et sous forme de webservice. Facile d'accès, il offre aussi des possibilités de scriptage avancé via du Javascript (***Recommandé pour les débutant·e·s en programmation***).
* [Inky](https://www.inklestudios.com/ink/) : Puissant outil de fiction interactive textuelle exploitant le langage ink. Autorise des exportations web et JSON (***Recommandé pour les débutant·e·s en programmation***).
* [Monogatari](https://monogatari.io/) : moteur de développement de visual novels. Facilite la prise en charge des dialogues et l'affichage des différentes scènes. Facile d'accès, il offre des possibilités d'animation et de scriptage avancés via du CSS et du Javascript (***Recommandé pour les débutant·e·s en programmation***).
* [Fungus](https://fungusgames.com/) : Librairie Unity 3D pour le développement de fictions interactives à partir de flowcharts (***Recommandé pour les débutant·e·s en programmation***).

## Boilerplates Phaser 3

* [Avec Brunch](https://github.com/samme/brunch-phaser)
* [Avec Webpack](https://github.com/photonstorm/phaser3-project-template)
* [Avec Webpack (Platformer)](https://github.com/nkholski/phaser3-es6-webpack)

___

## Assets

### Banques de sprites

* [Opengameart.org](https://opengameart.org/)
* [Assets sur itch.io](https://itch.io/game-assets)
* [The Spriters Resource](https://www.spriters-resource.com/)
* [Banque de personnages à assembler](https://www.openpeeps.com/)

### Banques audio

* [Soundtracks itch.io](https://itch.io/soundtracks/free)
* [The sounds Resource](https://www.sounds-resource.com/)
* [Bensound](https://www.bensound.com/)

___

## Projets d'étudiant·e·s

* ["Limited"](https://github.com/Sergenti/limited) : jeu de sensibilisation à l'épuisement des ressources naturelles.
* ["Cooking for the king"](https://github.com/Aubrays/cooking-for-the-king) : jeu de sensibilisation à la diététique médiévale.
* ["MuseeX"](https://github.com/raphaelgarnier/museeX) : fiction interactive de médiation en histoire de l'art.

___

## Inspirations

## jeux de médiation

* La confiance en psychologie sociale : [L'évolution de la confiance](https://ayowel.github.io/trust/) par [Nicky Case](https://ncase.me/)
* Simulateur de pauvreté : [Spent](http://playspent.org/html/)
* La vision du monde en psychologie sociale : [La sagesse et/ou la folie des foules](https://ncase.me/crowds/fr.html) par [Nicky Case](https://ncase.me/)
* Simulateur de gestion des données personnelles : [Datak](https://www.datak.ch/#/play)
* Simulateur de banalité du mal : [Papers Please](https://papersplea.se/)
* Street Fighter autour de l'anxiété : [Adventures with anxiety](https://ncase.me/anxiety-demo/) par [Nicky Case](https://ncase.me/)
* Simulateur de harcèlement journalistique (attention, Phaser 2!) : [Sorry to bother you](https://danhett.itch.io/sorry)
* Simulateur de charge mentale et de harcèlement psychologique (merci à Melissa Corboz pour la suggestion) : [Behind every great one](http://deconstructeam.com/games/behind-every-great-one/)

## jeux singuliers (interface atypique)

* [Her story](http://www.herstorygame.com/) & [Telling lies](http://tellingliesgame.com/) : exploration d'une base de donnée vidéo à partir recherche textuelle
* [Papa Sangre](https://www.youtube.com/watch?v=jxXwotksBdM) : orientation à l'aveugle

## annuaires de jeux

* [Jeux créés avec Phaser sur Itch.io](https://itch.io/games/made-with-phaser)

## Livres

* Théorie du jeu
  * Johan Huizinga, [*Homo Ludens*](https://fr.wikipedia.org/wiki/Homo_ludens) (1938)
* Game Design
  * George Skaff Elias, Richard Garfield and K. Robert Gutschera, [*Characteristics of Games*](https://mitpress.mit.edu/books/characteristics-games), MIT Press (2012)
* Développement
  * Emanuelle Feronato, [HTML5 Cross Platform Game Development Using Phaser 3](https://gumroad.com/l/odKJf)

## Evénements

* 24-26.10.19 : Colloque international [les langages du jeu vidéo](http://wp.unil.ch/culture-videoludique)
* 22 novembre 19 : [laboratoire de réécriture de jeu vidéo](http://isaacpante.net/une-game-jam-en-lettres/)
* 11 et 19.01.2020 : Evénement ["Press Start"](https://agenda.unil.ch/display/1574934317830) à l'Espace Arlaud dans le cadre des JOJ.

## Varia

* [Liste des codes clavier](https://keycode.info/)
* [Optimiser le chargement des assets](https://jwiese.eu/en/blog/2018/04/phaser-3-loading-screen-asset-organization/)
* [L'aléatoire dans les jeux](https://remysharp.com/2019/08/06/predictably-random)
* [Apprendre js13k en 4 vidéos](https://gamedevacademy.org/js13kgames-tutorial-video-series/)
* [Différents Plugins Phaser (interface, notamment)](https://github.com/rexrainbow/phaser3-rex-notes)
* [Tutoriels Twine](https://www.youtube.com/watch?v=iKFZhIHD7Xk&list=PLklITFhXtPCCKadv-0Gcbqoj3OCev695D)
* [Tutoriel d'un RTS 3D en moins de 13k](https://phoboslab.org/log/2019/09/voidcall-making-of)
* [Un excellent post-mortem de XyCore pour le js13k](https://64mega.github.io/js13k-2019-recap.html)
* [Mario Kart en pur CSS](https://vimeo.com/364369506)
* [Les jeux vidéo et l'accessibilité](https://www.24a11y.com/2019/game-accessibility-and-the-web/)

Cette liste ne demande qu'à s'enrichir! Merci d'envoyer vos suggestions à [Isaac Pante](mailto:isaac.pante@unil.ch).

![image d'échange, sprites créés par Louiza](https://i.imgur.com/oPLxCuB.jpg)
©[Louiza](http://louiza.ch/) pour les sprites
