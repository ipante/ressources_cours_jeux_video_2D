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

	// déplacements du personnage
	for (const dir in DIRECTIONS) {
		k.onKeyDown(dir, () => {
			if (jeu.paused) return
			if (dir === "left"){
				perso.flipX = true;
				perso.move(DIRECTIONS[dir].scale(VITESSE))
			}
			else{
				perso.flipX = false;
				perso.move(DIRECTIONS[dir].scale(VITESSE))
			}
		})
	}

	// ajouter un élément d'interface, pause
	const text_pause = ui.add([
		k.pos(k.center()),
		k.text("PAUSE", { size: 60 }),
		k.anchor("center"),
		k.fixed(),
		k.opacity(),
	])

	text_pause.hidden = true;

	// caméra qui suit le personnage
	// k.onUpdate(() => {
	// 	k.camPos(dino.pos)
	// })

	// adaptation couleur écran / position perso
	onUpdate(p =>{
		let x = mapc(perso.pos.x,0,LARGEUR,100,255)
		let y = mapc(perso.pos.y,0,HAUTEUR,100,255)
		k.setBackground([x,0,y])
	})

	// fonction de pause
	k.onKeyPress("escape", () => {
		if (jeu.paused) {
			musique.paused = false
			jeu.paused = false
			perso.hidden = false
			text_pause.hidden = true
			k.usePostEffect("crt",effets["crt"]());
		} else {
			musique.paused = true
			jeu.paused = true
			perso.hidden = true
			text_pause.hidden = false
			k.usePostEffect("vhs",effets["vhs"]());
		}
	})
})


