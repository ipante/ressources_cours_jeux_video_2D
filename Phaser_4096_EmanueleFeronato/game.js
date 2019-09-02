var game;
var optionsJeu = {
    largeurTuile: 200,
    vitesseInterpolation: 50,
    espacementTuile: 20,
    nomLocalStorage: "top4096score"
}
var LIGNE = 0;
var COLONNE = 1;
window.onload = function() {
    var configJeu = {
       type: Phaser.CANVAS,
       width: optionsJeu.largeurTuile * 4 + optionsJeu.espacementTuile * 5,
       height: (optionsJeu.largeurTuile * 4 + optionsJeu.espacementTuile * 5) * 16 / 9,
       backgroundColor: 0xecf0f1,
       scene: [preloadAssets, jouerJeu]
   };
    game = new Phaser.Game(configJeu);
    window.focus()
    redimensionner();
    window.addEventListener("resize", redimensionner, false);
}

var preloadAssets = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function preloadAssets(){
        Phaser.Scene.call(this, {key: "PreloadAssets"});
    },
    preload: function(){
        this.load.image("spot", "assets/sprites/spot.png");
        this.load.image("gametitle", "assets/sprites/gametitle.png");
        this.load.image("restart", "assets/sprites/restart.png");
        this.load.image("scorepanel", "assets/sprites/scorepanel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels.png");
        this.load.image("logo", "assets/sprites/logo.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay.png");
        this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
            frameWidth: optionsJeu.largeurTuile,
            frameHeight: optionsJeu.largeurTuile
        });
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        this.load.audio("move", ["assets/sounds/move.ogg", "assets/sounds/move.mp3"]);
        this.load.audio("grow", ["assets/sounds/grow.ogg", "assets/sounds/grow.mp3"]);
    },
    create: function(){
        this.scene.start("JouerJeu");
    }
})

var jouerJeu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function jouerJeu(){
        Phaser.Scene.call(this, {key: "JouerJeu"});
    },
    create: function(){
        this.tableauTerrain = [];
        this.groupeTerrain = this.add.group();
        this.score = 0;
        this.bestScore = localStorage.getItem(optionsJeu.nomLocalStorage) == null ? 0 : localStorage.getItem(optionsJeu.nomLocalStorage);
        // créer la grille
        // les SPOTS (cases de fond) restent fixes
        // les TILES (tuiles de jeu) s'alignent dessus
        // les tuiles initiales sont créées
        // création d'un tableau à deux dimensions
        for(var i = 0; i < 4; i++){
            this.tableauTerrain[i] = [];
            for(var j = 0; j < 4; j++){
                // ajouter la case "de fond" à l'écran
                var spot = this.add.sprite(this.destinationTuile(j, COLONNE), this.destinationTuile(i, LIGNE), "spot")
                // ajouter le contneu de la case
                var tile = this.add.sprite(this.destinationTuile(j, COLONNE), this.destinationTuile(i, LIGNE), "tiles");
                // rendre chaque tuile invisible
                tile.alpha = 0;
                tile.visible = 0;
                // l'ajouter au groupe de tuiles
                this.groupeTerrain.add(tile);
                this.tableauTerrain[i][j] = {
                    // valeur initiale : 0 vaut "aucune"
                    valeurTuile: 0,
                    spriteTuile: tile,
                    peutAugmenter: true
                }
            }
        }
        // ajout de l'interface
        var boutonRestart = this.add.sprite(this.destinationTuile(3, COLONNE), this.destinationTuile(0, LIGNE) - 200, "restart");
        boutonRestart.setInteractive();
        boutonRestart.on("pointerdown", function(){
            this.scene.start("JouerJeu");
        }, this)
        this.add.sprite(this.destinationTuile(1, COLONNE), this.destinationTuile(0, LIGNE) - 200, "scorepanel");
        this.add.sprite(this.destinationTuile(1, COLONNE), this.destinationTuile(0, LIGNE) - 270, "scorelabels");
        this.add.sprite(10, 5, "gametitle").setOrigin(0, 0);
        var howTo = this.add.sprite(game.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        logo.setOrigin(0.5, 1);
        logo.setInteractive();
        logo.on("pointerdown", function(){
            window.location.href = "http://www.emanueleferonato.com/"
        });
        this.texteScore = this.add.bitmapText(this.destinationTuile(0, COLONNE) - 80, this.destinationTuile(0, LIGNE) - 225, "font", "0");
        this.texteMeilleurScore = this.add.bitmapText(this.destinationTuile(2, COLONNE) - 190, this.destinationTuile(0, LIGNE) - 225, "font", this.bestScore.toString());
        this.input.keyboard.on("keydown", this.gererTouche, this);
        
        // interdire le mouvement
        this.peutBouger = false;
        // ajouter 2 tuiles
        this.ajouterTuile();
        this.ajouterTuile();
        // éléments d'interaction
        this.input.on("pointerup", this.finSwipe, this);
        this.sonMouvement = this.sound.add("move");
        this.sonAugmentation = this.sound.add("grow");
    },
    finSwipe: function(e){
        var tempsSwipe = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(swipeMagnitude > 20 && tempsSwipe < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
            var children = this.groupeTerrain.getChildren();
            if(swipeNormal.x > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.width - children[i].x;
                }
                this.gererMouvement(0, 1);
            }
            if(swipeNormal.x < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].x;
                }
                this.gererMouvement(0, -1);
            }
            if(swipeNormal.y > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.height - children[i].y;
                }
                this.gererMouvement(1, 0);
            }
            if(swipeNormal.y < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].y;
                }
                this.gererMouvement(-1, 0);
            }
        }
    },
    ajouterTuile: function(){
        var emptyTiles = [];
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.tableauTerrain[i][j].valeurTuile == 0){
                    emptyTiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        if(emptyTiles.length > 0){
            var tuileChoisie = Phaser.Utils.Array.GetRandomElement(emptyTiles);
            this.tableauTerrain[tuileChoisie.row][tuileChoisie.col].valeurTuile = 1;
            this.tableauTerrain[tuileChoisie.row][tuileChoisie.col].spriteTuile.visible = true;
            this.tableauTerrain[tuileChoisie.row][tuileChoisie.col].spriteTuile.setFrame(0);
            this.tweens.add({
                targets: [this.tableauTerrain[tuileChoisie.row][tuileChoisie.col].spriteTuile],
                alpha: 1,
                duration: optionsJeu.vitesseInterpolation,
                // une fois les animations achevées...
                onComplete: function(tween){
                    // on autorise le mouvement
                    tween.parent.scene.peutBouger = true;
                },
            });
        }
	},
    gererTouche: function(e){
        if(this.peutBouger){
            var children = this.groupeTerrain.getChildren();
            switch(e.code){
                case "KeyA":
                case "ArrowLeft":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].x;
                    }
                    this.gererMouvement(0, -1);
                    break;
                case "KeyD":
                case "ArrowRight":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.width - children[i].x;
                    }
                    this.gererMouvement(0, 1);
                    break;
                case "KeyW":
                case "ArrowUp":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].y;
                    }
                    this.gererMouvement(-1, 0);
                    break;
                case "KeyS":
                case "ArrowDown":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.height - children[i].y;
                    }
                    this.gererMouvement(1, 0);
                    break;
            }
        }
    },
    gererMouvement: function(deltaRow, deltaCol){
        this.peutBouger = false;
        var qqchABouge = false;
        this.movingTiles = 0;
        var scoreMouvements = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                var colAObserver = deltaCol == 1 ? (4 - 1) - j : j;
                var ligneAObserver = deltaRow == 1 ? (4 - 1) - i : i;
                var valeurTuile = this.tableauTerrain[ligneAObserver][colAObserver].valeurTuile;
                if(valeurTuile != 0){
                    var colSteps = deltaCol;
                    var rowSteps = deltaRow;
                    while(this.isInsideBoard(ligneAObserver + rowSteps, colAObserver + colSteps) && this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile == 0){
                        colSteps += deltaCol;
                        rowSteps += deltaRow;
                    }
                    if(this.isInsideBoard(ligneAObserver + rowSteps, colAObserver + colSteps) && (this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile == valeurTuile) && this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].peutAugmenter && this.tableauTerrain[ligneAObserver][colAObserver].peutAugmenter && valeurTuile < 12){
                        this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile ++;
                        scoreMouvements += Math.pow(2, this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile);
                        this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].peutAugmenter = false;
                        this.tableauTerrain[ligneAObserver][colAObserver].valeurTuile = 0;
                        this.moveTile(this.tableauTerrain[ligneAObserver][colAObserver], ligneAObserver + rowSteps, colAObserver + colSteps, Math.abs(rowSteps + colSteps), true);
                        qqchABouge = true;
                    }
                    else{
                        colSteps = colSteps - deltaCol;
                        rowSteps = rowSteps - deltaRow;
                        if(colSteps != 0 || rowSteps != 0){
                            this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile = valeurTuile;
                            this.tableauTerrain[ligneAObserver][colAObserver].valeurTuile = 0;
                            this.moveTile(this.tableauTerrain[ligneAObserver][colAObserver], ligneAObserver + rowSteps, colAObserver + colSteps, Math.abs(rowSteps + colSteps), false);
                            qqchABouge = true;
                        }
                    }
                }
            }
        }
        // si rien n'a bougé
        // ce mouvement est inutile
        // il faut pouvoir jouer à nouveau
        // pour ne pas bloquer le jeu
        if(!qqchABouge){
            // on autorise le mouvement
            this.peutBouger = true;
        }
        else{
            this.sonMouvement.play();
            this.score += scoreMouvements;
            if(this.score > this.bestScore){
                this.bestScore = this.score;
                localStorage.setItem(optionsJeu.nomLocalStorage, this.bestScore);
            }
        }
    },
    moveTile: function(tile, row, col, distance, changeNumber){
        this.movingTiles ++;
        this.tweens.add({
            targets: [tile.spriteTuile],
            x: this.destinationTuile(col, COLONNE),
            y: this.destinationTuile(row, LIGNE),
            duration: optionsJeu.vitesseInterpolation * distance,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(changeNumber){
                    tween.parent.scene.transformTile(tile, row, col);
                }
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.texteScore.text = tween.parent.scene.score.toString();
                    tween.parent.scene.texteMeilleurScore.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.ajouterTuile();
                }
            }
        })
    },
    transformTile: function(tile, row, col){
        this.sonAugmentation.play();
        this.movingTiles ++;
        tile.spriteTuile.setFrame(this.tableauTerrain[row][col].valeurTuile - 1);
        this.tweens.add({
            targets: [tile.spriteTuile],
            scaleX: 1.1,
            scaleY: 1.1,
            duration: optionsJeu.vitesseInterpolation,
            yoyo: true,
            repeat: 1,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.texteScore.text = tween.parent.scene.score.toString();
                    tween.parent.scene.texteMeilleurScore.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.ajouterTuile();
                }
            }
        })
    },
    resetTiles: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                this.tableauTerrain[i][j].peutAugmenter = true;
                this.tableauTerrain[i][j].spriteTuile.x = this.destinationTuile(j, COLONNE);
                this.tableauTerrain[i][j].spriteTuile.y = this.destinationTuile(i, LIGNE);
                if(this.tableauTerrain[i][j].valeurTuile > 0){
                    this.tableauTerrain[i][j].spriteTuile.alpha = 1;
                    this.tableauTerrain[i][j].spriteTuile.visible = true;
                    this.tableauTerrain[i][j].spriteTuile.setFrame(this.tableauTerrain[i][j].valeurTuile - 1);
                }
                else{
                    this.tableauTerrain[i][j].spriteTuile.alpha = 0;
                    this.tableauTerrain[i][j].spriteTuile.visible = false;
                }
            }
        }
    },
    isInsideBoard: function(row, col){
        return (row >= 0) && (col >= 0) && (row < 4) && (col < 4);
    },
    destinationTuile: function(pos, axis){
        var offset = (axis == LIGNE) ? (game.config.height - game.config.width) / 2 : 0;
        return pos * (optionsJeu.largeurTuile + optionsJeu.espacementTuile) + optionsJeu.largeurTuile / 2 + optionsJeu.espacementTuile + offset;
    }
});
function redimensionner() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
