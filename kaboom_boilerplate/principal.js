
// initialisation de l'environnement
const k = kaboom({
	canvas: document.querySelector("#jeu"),
	background: [ 0, 0, 255, ],
	font : "happy"
})

// définition des constantes
const VITESSE = 400;
const LARGEUR = window.innerWidth;
const HAUTEUR = window.innerHeight; 

// lister les noms des sprites à charger : "perso1","dino"
const sprites = [
	"dino"
]
// lister les noms des sons à charger : "musique1","musique2"
const sons = [
	"music",
	"son"
]

// chargement de tous les sprites
for (const sprite of sprites) {
	k.loadSprite(sprite, `assets/sprites/${sprite}.png`)
}
// chargement de tous les sons
for (const son of sons) {
	k.loadSound(son, `assets/sons/${son}.mp3`)
}

// chargement d'une police image
k.loadBitmapFont("happy", "assets/polices/happy_28x36.png", 28, 36, {})

// créer une scène initiale
scene("accueil", () => {

	const text = k.make([
		k.text("Press space or click to start", { size: 24 }),
		k.anchor("center"),
		k.fixed(),
		k.opacity(),
	])

	k.onKeyPress("space", () => {
		go("principale");
	})

})

// créer une scène de jeu
scene("principale",() =>{
	// lancer un morceau
	k.play("music", { loop: true })
	// changer le fond
	k.setBackground([ 255, 0, 255, ]);
	// ajouter le personnage
	const dino = k.add([
		k.pos(LARGEUR / 2, HAUTEUR / 2),
		k.sprite("dino"),
		k.anchor("center"),
		k.area({ scale: 0.8 }),
	])

})

// lancer la scène initiale
go("accueil");
