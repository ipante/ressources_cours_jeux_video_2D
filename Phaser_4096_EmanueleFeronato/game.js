let jeu;
let optionsJeu = {
    largeurTuile: 200,
    vitesseInterpolation: 50,
    espacementTuile: 20,
    nomLocalStorage: "top4096score"
}
let LIGNE = 0;
let COLONNE = 1;
window.onload = function() {
    let configJeu = {
       type: Phaser.CANVAS,
       width: optionsJeu.largeurTuile * 4 + optionsJeu.espacementTuile * 5,
       height: (optionsJeu.largeurTuile * 4 + optionsJeu.espacementTuile * 5) * 16 / 9,
       backgroundColor: 0xecf0f1,
       scene: [prechargerAssets, jouerJeu]
   };
    jeu = new Phaser.Game(configJeu);
    window.focus()
    redimensionner();
    window.addEventListener("resize", redimensionner, false);
}

let prechargerAssets = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function prechargerAssets(){
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

let jouerJeu = new Phaser.Class({
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
        for(let i = 0; i < 4; i++){
            this.tableauTerrain[i] = [];
            for(let j = 0; j < 4; j++){
                // ajouter la case "de fond" à l'écran
                let spot = this.add.sprite(this.destinationTuile(j, COLONNE), this.destinationTuile(i, LIGNE), "spot")
                // ajouter le contneu de la case
                let tile = this.add.sprite(this.destinationTuile(j, COLONNE), this.destinationTuile(i, LIGNE), "tiles");
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
        let boutonRestart = this.add.sprite(this.destinationTuile(3, COLONNE), this.destinationTuile(0, LIGNE) - 200, "restart");
        boutonRestart.setInteractive();
        boutonRestart.on("pointerdown", function(){
            this.scene.start("JouerJeu");
        }, this)
        this.add.sprite(this.destinationTuile(1, COLONNE), this.destinationTuile(0, LIGNE) - 200, "scorepanel");
        this.add.sprite(this.destinationTuile(1, COLONNE), this.destinationTuile(0, LIGNE) - 270, "scorelabels");
        this.add.sprite(10, 5, "gametitle").setOrigin(0, 0);
        let howTo = this.add.sprite(jeu.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        let logo = this.add.sprite(jeu.config.width / 2, jeu.config.height, "logo");
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
        let tempsSwipe = e.upTime - e.downTime;
        let swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        let swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        let swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(swipeMagnitude > 20 && tempsSwipe < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
            let children = this.groupeTerrain.getChildren();
            if(swipeNormal.x > 0.8) {
                for (let i = 0; i < children.length; i++){
                    children[i].depth = jeu.config.width - children[i].x;
                }
                this.gererMouvement(0, 1);
            }
            if(swipeNormal.x < -0.8) {
                for (let i = 0; i < children.length; i++){
                    children[i].depth = children[i].x;
                }
                this.gererMouvement(0, -1);
            }
            if(swipeNormal.y > 0.8) {
                for (let i = 0; i < children.length; i++){
                    children[i].depth = jeu.config.height - children[i].y;
                }
                this.gererMouvement(1, 0);
            }
            if(swipeNormal.y < -0.8) {
                for (let i = 0; i < children.length; i++){
                    children[i].depth = children[i].y;
                }
                this.gererMouvement(-1, 0);
            }
        }
    },
    ajouterTuile: function(){
        let tableauTuilesVides = [];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(this.tableauTerrain[i][j].valeurTuile == 0){
                    tableauTuilesVides.push({
                        ligne: i,
                        colonne: j
                    })
                }
            }
        }
        if(tableauTuilesVides.length > 0){
            let tuileChoisie = Phaser.Utils.Array.GetRandomElement(tableauTuilesVides);
            this.tableauTerrain[tuileChoisie.ligne][tuileChoisie.colonne].valeurTuile = 1;
            this.tableauTerrain[tuileChoisie.ligne][tuileChoisie.colonne].spriteTuile.visible = true;
            this.tableauTerrain[tuileChoisie.ligne][tuileChoisie.colonne].spriteTuile.setFrame(0);
            this.tweens.add({
                targets: [this.tableauTerrain[tuileChoisie.ligne][tuileChoisie.colonne].spriteTuile],
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
            let children = this.groupeTerrain.getChildren();
            switch(e.code){
                case "KeyA":
                case "ArrowLeft":
                    for (let i = 0; i < children.length; i++){
                        children[i].depth = children[i].x;
                    }
                    this.gererMouvement(0, -1);
                    break;
                case "KeyD":
                case "ArrowRight":
                    for (let i = 0; i < children.length; i++){
                        children[i].depth = jeu.config.width - children[i].x;
                    }
                    this.gererMouvement(0, 1);
                    break;
                case "KeyW":
                case "ArrowUp":
                    for (let i = 0; i < children.length; i++){
                        children[i].depth = children[i].y;
                    }
                    this.gererMouvement(-1, 0);
                    break;
                case "KeyS":
                case "ArrowDown":
                    for (let i = 0; i < children.length; i++){
                        children[i].depth = jeu.config.height - children[i].y;
                    }
                    this.gererMouvement(1, 0);
                    break;
            }
        }
    },
    gererMouvement: function(deltaRow, deltaCol){
        this.peutBouger = false;
        let qqchABouge = false;
        this.movingTiles = 0;
        let scoreMouvements = 0;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                let colAObserver = deltaCol == 1 ? (4 - 1) - j : j;
                let ligneAObserver = deltaRow == 1 ? (4 - 1) - i : i;
                let valeurTuile = this.tableauTerrain[ligneAObserver][colAObserver].valeurTuile;
                if(valeurTuile != 0){
                    let colSteps = deltaCol;
                    let rowSteps = deltaRow;
                    while(this.estDansLePlateau(ligneAObserver + rowSteps, colAObserver + colSteps) && this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile == 0){
                        colSteps += deltaCol;
                        rowSteps += deltaRow;
                    }
                    if(this.estDansLePlateau(ligneAObserver + rowSteps, colAObserver + colSteps) && (this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].valeurTuile == valeurTuile) && this.tableauTerrain[ligneAObserver + rowSteps][colAObserver + colSteps].peutAugmenter && this.tableauTerrain[ligneAObserver][colAObserver].peutAugmenter && valeurTuile < 12){
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
    moveTile: function(tile, ligne, colonne, distance, changeNumber){
        this.movingTiles ++;
        this.tweens.add({
            targets: [tile.spriteTuile],
            x: this.destinationTuile(colonne, COLONNE),
            y: this.destinationTuile(ligne, LIGNE),
            duration: optionsJeu.vitesseInterpolation * distance,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(changeNumber){
                    tween.parent.scene.transformerTuile(tile, ligne, colonne);
                }
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.texteScore.text = tween.parent.scene.score.toString();
                    tween.parent.scene.texteMeilleurScore.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.reinitialiserTuiles();
                    tween.parent.scene.ajouterTuile();
                }
            }
        })
    },
    transformerTuile: function(tile, ligne, colonne){
        this.sonAugmentation.play();
        this.movingTiles ++;
        tile.spriteTuile.setFrame(this.tableauTerrain[ligne][colonne].valeurTuile - 1);
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
                    tween.parent.scene.reinitialiserTuiles();
                    tween.parent.scene.ajouterTuile();
                }
            }
        })
    },
    reinitialiserTuiles: function(){
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
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
    estDansLePlateau: function(ligne, colonne){
        return (ligne >= 0) && (colonne >= 0) && (ligne < 4) && (colonne < 4);
    },
    destinationTuile: function(pos, axis){
        let offset = (axis == LIGNE) ? (jeu.config.height - jeu.config.width) / 2 : 0;
        return pos * (optionsJeu.largeurTuile + optionsJeu.espacementTuile) + optionsJeu.largeurTuile / 2 + optionsJeu.espacementTuile + offset;
    }
});
// fonction de redimensionnement de la page
function redimensionner() {
    let canvas = document.querySelector("canvas");
    let largeurFenetre = window.innerWidth;
    let hauteurFenetre = window.innerHeight;
    let ratioFenetre = largeurFenetre / hauteurFenetre;
    let ratioJeu = jeu.config.width / jeu.config.height;
    if(ratioFenetre < ratioJeu){
        canvas.style.width = largeurFenetre + "px";
        canvas.style.height = (largeurFenetre / ratioJeu) + "px";
    }
    else{
        canvas.style.width = (hauteurFenetre * ratioJeu) + "px";
        canvas.style.height = hauteurFenetre + "px";
    }
}