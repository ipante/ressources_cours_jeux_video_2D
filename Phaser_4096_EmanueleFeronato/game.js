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
       scene: [preloadAssets, playGame]
   };
    game = new Phaser.Game(configJeu);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
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
        this.scene.start("PlayGame");
    }
})

var playGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function playGame(){
        Phaser.Scene.call(this, {key: "PlayGame"});
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
                var spot = this.add.sprite(this.tileDestination(j, COLONNE), this.tileDestination(i, LIGNE), "spot")
                // ajouter le contneu de la case
                var tile = this.add.sprite(this.tileDestination(j, COLONNE), this.tileDestination(i, LIGNE), "tiles");
                // rendre chaque tuile invisible
                tile.alpha = 0;
                tile.visible = 0;
                // l'ajouter au groupe de tuiles
                this.groupeTerrain.add(tile);
                this.tableauTerrain[i][j] = {
                    // valeur initiale : 0 vaut "aucune"
                    tileValue: 0,
                    tileSprite: tile,
                    canUpgrade: true
                }
            }
        }
        // ajout de l'interface
        var restartButton = this.add.sprite(this.tileDestination(3, COLONNE), this.tileDestination(0, LIGNE) - 200, "restart");
        restartButton.setInteractive();
        restartButton.on("pointerdown", function(){
            this.scene.start("PlayGame");
        }, this)
        this.add.sprite(this.tileDestination(1, COLONNE), this.tileDestination(0, LIGNE) - 200, "scorepanel");
        this.add.sprite(this.tileDestination(1, COLONNE), this.tileDestination(0, LIGNE) - 270, "scorelabels");
        this.add.sprite(10, 5, "gametitle").setOrigin(0, 0);
        var howTo = this.add.sprite(game.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        logo.setOrigin(0.5, 1);
        logo.setInteractive();
        logo.on("pointerdown", function(){
            window.location.href = "http://www.emanueleferonato.com/"
        });
        this.scoreText = this.add.bitmapText(this.tileDestination(0, COLONNE) - 80, this.tileDestination(0, LIGNE) - 225, "font", "0");
        this.bestScoreText = this.add.bitmapText(this.tileDestination(2, COLONNE) - 190, this.tileDestination(0, LIGNE) - 225, "font", this.bestScore.toString());
        this.input.keyboard.on("keydown", this.handleKey, this);
        
        // interdire le mouvement
        this.canMove = false;
        // ajouter 2 tuiles
        this.addTile();
        this.addTile();
        // éléments d'interaction
        this.input.on("pointerup", this.endSwipe, this);
        this.moveSound = this.sound.add("move");
        this.growSound = this.sound.add("grow");
    },
    endSwipe: function(e){
        var swipeTime = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
            var children = this.groupeTerrain.getChildren();
            if(swipeNormal.x > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.width - children[i].x;
                }
                this.handleMove(0, 1);
            }
            if(swipeNormal.x < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].x;
                }
                this.handleMove(0, -1);
            }
            if(swipeNormal.y > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.height - children[i].y;
                }
                this.handleMove(1, 0);
            }
            if(swipeNormal.y < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].y;
                }
                this.handleMove(-1, 0);
            }
        }
    },
    addTile: function(){
        var emptyTiles = [];
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.tableauTerrain[i][j].tileValue == 0){
                    emptyTiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        if(emptyTiles.length > 0){
            var chosenTile = Phaser.Utils.Array.GetRandomElement(emptyTiles);
            this.tableauTerrain[chosenTile.row][chosenTile.col].tileValue = 1;
            this.tableauTerrain[chosenTile.row][chosenTile.col].tileSprite.visible = true;
            this.tableauTerrain[chosenTile.row][chosenTile.col].tileSprite.setFrame(0);
            this.tweens.add({
                targets: [this.tableauTerrain[chosenTile.row][chosenTile.col].tileSprite],
                alpha: 1,
                duration: optionsJeu.vitesseInterpolation,
                // une fois les animations achevées...
                onComplete: function(tween){
                    // on autorise le mouvement
                    tween.parent.scene.canMove = true;
                },
            });
        }
	},
    handleKey: function(e){
        if(this.canMove){
            var children = this.groupeTerrain.getChildren();
            switch(e.code){
                case "KeyA":
                case "ArrowLeft":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].x;
                    }
                    this.handleMove(0, -1);
                    break;
                case "KeyD":
                case "ArrowRight":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.width - children[i].x;
                    }
                    this.handleMove(0, 1);
                    break;
                case "KeyW":
                case "ArrowUp":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].y;
                    }
                    this.handleMove(-1, 0);
                    break;
                case "KeyS":
                case "ArrowDown":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.height - children[i].y;
                    }
                    this.handleMove(1, 0);
                    break;
            }
        }
    },
    handleMove: function(deltaRow, deltaCol){
        this.canMove = false;
        var somethingMoved = false;
        this.movingTiles = 0;
        var moveScore = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                var colToWatch = deltaCol == 1 ? (4 - 1) - j : j;
                var rowToWatch = deltaRow == 1 ? (4 - 1) - i : i;
                var tileValue = this.tableauTerrain[rowToWatch][colToWatch].tileValue;
                if(tileValue != 0){
                    var colSteps = deltaCol;
                    var rowSteps = deltaRow;
                    while(this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == 0){
                        colSteps += deltaCol;
                        rowSteps += deltaRow;
                    }
                    if(this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && (this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == tileValue) && this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade && this.tableauTerrain[rowToWatch][colToWatch].canUpgrade && tileValue < 12){
                        this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].tileValue ++;
                        moveScore += Math.pow(2, this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].tileValue);
                        this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade = false;
                        this.tableauTerrain[rowToWatch][colToWatch].tileValue = 0;
                        this.moveTile(this.tableauTerrain[rowToWatch][colToWatch], rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), true);
                        somethingMoved = true;
                    }
                    else{
                        colSteps = colSteps - deltaCol;
                        rowSteps = rowSteps - deltaRow;
                        if(colSteps != 0 || rowSteps != 0){
                            this.tableauTerrain[rowToWatch + rowSteps][colToWatch + colSteps].tileValue = tileValue;
                            this.tableauTerrain[rowToWatch][colToWatch].tileValue = 0;
                            this.moveTile(this.tableauTerrain[rowToWatch][colToWatch], rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), false);
                            somethingMoved = true;
                        }
                    }
                }
            }
        }
        // si rien n'a bougé
        // ce mouvement est inutile
        // il faut pouvoir jouer à nouveau
        // pour ne pas bloquer le jeu
        if(!somethingMoved){
            // on autorise le mouvement
            this.canMove = true;
        }
        else{
            this.moveSound.play();
            this.score += moveScore;
            if(this.score > this.bestScore){
                this.bestScore = this.score;
                localStorage.setItem(optionsJeu.nomLocalStorage, this.bestScore);
            }
        }
    },
    moveTile: function(tile, row, col, distance, changeNumber){
        this.movingTiles ++;
        this.tweens.add({
            targets: [tile.tileSprite],
            x: this.tileDestination(col, COLONNE),
            y: this.tileDestination(row, LIGNE),
            duration: optionsJeu.vitesseInterpolation * distance,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(changeNumber){
                    tween.parent.scene.transformTile(tile, row, col);
                }
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.scoreText.text = tween.parent.scene.score.toString();
                    tween.parent.scene.bestScoreText.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.addTile();
                }
            }
        })
    },
    transformTile: function(tile, row, col){
        this.growSound.play();
        this.movingTiles ++;
        tile.tileSprite.setFrame(this.tableauTerrain[row][col].tileValue - 1);
        this.tweens.add({
            targets: [tile.tileSprite],
            scaleX: 1.1,
            scaleY: 1.1,
            duration: optionsJeu.vitesseInterpolation,
            yoyo: true,
            repeat: 1,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.scoreText.text = tween.parent.scene.score.toString();
                    tween.parent.scene.bestScoreText.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.addTile();
                }
            }
        })
    },
    resetTiles: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                this.tableauTerrain[i][j].canUpgrade = true;
                this.tableauTerrain[i][j].tileSprite.x = this.tileDestination(j, COLONNE);
                this.tableauTerrain[i][j].tileSprite.y = this.tileDestination(i, LIGNE);
                if(this.tableauTerrain[i][j].tileValue > 0){
                    this.tableauTerrain[i][j].tileSprite.alpha = 1;
                    this.tableauTerrain[i][j].tileSprite.visible = true;
                    this.tableauTerrain[i][j].tileSprite.setFrame(this.tableauTerrain[i][j].tileValue - 1);
                }
                else{
                    this.tableauTerrain[i][j].tileSprite.alpha = 0;
                    this.tableauTerrain[i][j].tileSprite.visible = false;
                }
            }
        }
    },
    isInsideBoard: function(row, col){
        return (row >= 0) && (col >= 0) && (row < 4) && (col < 4);
    },
    tileDestination: function(pos, axis){
        var offset = (axis == LIGNE) ? (game.config.height - game.config.width) / 2 : 0;
        return pos * (optionsJeu.largeurTuile + optionsJeu.espacementTuile) + optionsJeu.largeurTuile / 2 + optionsJeu.espacementTuile + offset;
    }
});
function resize() {
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
