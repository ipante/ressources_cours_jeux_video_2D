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


