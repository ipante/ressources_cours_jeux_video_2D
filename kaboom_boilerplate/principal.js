
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
	})
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

// créer une scène de jeu
scene("principale",() =>{
	// définir un objet parent pour tous les éléments
	const jeu = k.add([])
	// faire de l'ui un enfant
	const ui = jeu.add([
		k.fixed(),
		k.z(100),
	]);

	// lancer un morceau
	const musique = k.play("musique", { loop: true })
	
	// changer le fond
	k.setBackground([ 255, 0, 255, ]);

	// ajouter un shader
	k.usePostEffect("crt",effets["crt"]());
	
	// ajouter le personnage
	const perso = jeu.add([
		k.pos(LARGEUR / 2, HAUTEUR / 2),
		k.sprite("dino"),
		k.anchor("center"),
		k.area({ scale: 0.8 }),
	])

	// ajouter un élément d'interface, pause
	const text_pause = ui.add([
		k.pos(k.center()),
		k.text("PAUSE", { size: 60 }),
		k.anchor("center"),
		k.fixed(),
		k.opacity(),
	])

	text_pause.hidden = true;

	// fonction de pause
	k.onKeyPress("escape", () => {
		if (jeu.paused) {
			musique.paused = false
			jeu.paused = false
			perso.hidden = false
			text_pause.hidden = true
			k.setBackground(FOND_JEU);
		} else {
			musique.paused = true
			jeu.paused = true
			perso.hidden = true
			text_pause.hidden = false
			k.setBackground([0,0,0]);
		}
	})
})

// lancer la scène initiale
go("accueil");
