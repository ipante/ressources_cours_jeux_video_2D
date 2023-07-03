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
const FOND_GENERAL = [ 0, 0, 255, ];
const FOND_JEU = [ 255, 0, 255, ]
const DIRECTIONS = {
	"left": k.LEFT,
	"right": k.RIGHT,
	"up": k.UP,
	"down": k.DOWN,
}

// lister les noms des sprites à charger : "perso1","dino"
const sprites = [
	"dino"
]
// lister les noms des sons à charger : "musique1","musique2"
const sons = [
	"musique",
	"son"
]

// lister les shaders à charger
const effets = {
	crt: () => ({
		"u_flatness": 3,
	}),
	vhs: () => ({
		"u_intensity": 12,
	}),
	pixelate: () => ({
		"u_resolution": vec2(width(), height()),
		"u_size": wave(2, 16, time() * 2),
	}),
	// invert: () => ({
	// 	"u_invert": 1,
	// }),
	// light: () => ({
	// 	"u_radius": 64,
	// 	"u_blur": 64,
	// 	"u_resolution": vec2(width(), height()),
	// 	"u_mouse": mousePos(),
	// }),
}

// chargement de tous les sprites
for (const sprite of sprites) {
	k.loadSprite(sprite, `assets/sprites/${sprite}.png`)
}
// chargement de tous les sons
for (const son of sons) {
	k.loadSound(son, `assets/sons/${son}.mp3`)
}

// chargement de tous les shaders
for (const effet in effets) {
	loadShaderURL(effet, null, `assets/shaders/${effet}.frag`)
}

// chargement d'une police image
k.loadBitmapFont("happy", "assets/polices/happy_28x36.png", 28, 36, {})

// lancer la scène initiale
// créer une scène initiale
scene("accueil", () => {

	const text = k.add([
		k.pos(k.center()),
		k.text("Press space", { size: 60 }),
		k.anchor("center"),
		k.fixed(),
		k.opacity(),
	])

	k.onKeyPress("space", () => {
		go("principale");
	})
})


go("accueil");