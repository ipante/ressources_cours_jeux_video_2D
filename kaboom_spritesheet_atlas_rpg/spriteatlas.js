kaboom({
	scale: 4,
	background: [0, 0, 0],
})

// https://0x72.itch.io/dungeontileset-ii
loadSpriteAtlas("assets/spritesheets/dungeon.png", "/assets/spritesheets/dungeon.json")

// floor
addLevel([
	"xxxxxxxxxx",
	"          ",
	"          ",
	"          ",
	"          ",
	"          ",
	"          ",
	"          ",
	"          ",
	"          ",
], {
	tileWidth: 16,
	tileHeight: 16,
	tiles: {
		" ": () => [
			sprite("floor", { frame: ~~rand(0, 8) }),
		],
	},
})

// objects
const map = addLevel([
	"tttttttttt",
	"cwwwwwwwwd",
	"l        r",
	"l        r",
	"l        r",
	"l      $ r",
	"l        r",
	"l $      r",
	"attttttttb",
	"wwwwwwwwww",
], {
	tileWidth: 16,
	tileHeight: 16,
	tiles: {
		"$": () => [
			sprite("chest"),
			area(),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
			{ opened: false },
			"chest",
		],
		"a": () => [
			sprite("wall_botleft"),
			area({ shape: new Rect(vec2(0), 4, 16) }),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"b": () => [
			sprite("wall_botright"),
			area({ shape: new Rect(vec2(12, 0), 4, 16) }),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"c": () => [
			sprite("wall_topleft"),
			area(),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"d": () => [
			sprite("wall_topright"),
			area(),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"w": () => [
			sprite("wall"),
			area(),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"t": () => [
			sprite("wall_top"),
			area({ shape: new Rect(vec2(0, 12), 16, 4) }),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"l": () => [
			sprite("wall_left"),
			area({ shape: new Rect(vec2(0), 4, 16) }),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
		"r": () => [
			sprite("wall_right"),
			area({ shape: new Rect(vec2(12, 0), 4, 16) }),
			body({ isStatic: true }),
			tile({ isObstacle: true }),
		],
	},
})

const player = map.spawn([
	sprite("hero", { anim: "idle" }),
	area({ shape: new Rect(vec2(0, 6), 12, 12) }),
	body(),
	anchor("center"),
	tile(),
	z(2)
], 2, 2)

const sword = player.add([
	pos(-4, 9),
	sprite("sword"),
	anchor("bot"),
	rotate(0),
	spin(),
	z(2)
])

map.spawn([
	sprite("ogre"),
	anchor("bot"),
	area({ scale: 0.5 }),
	body({ isStatic: true }),
	tile({ isObstacle: true }),
	z(1)
], 5, 4)

function spin() {
	let spinning = false
	return {
		id: "spin",
		update() {
			if (spinning) {
				this.angle += 1200 * dt()
				if (this.angle >= 360) {
					this.angle = 0
					spinning = false
				}
			}
		},
		spin() {
			spinning = true
		},
	}
}

function interact() {
	let interacted = false
	for (const col of player.getCollisions()) {
		const c = col.target
		if (c.is("chest")) {
			if (c.opened) {
				c.play("close")
				c.opened = false
			} else {
				c.play("open")
				c.opened = true
			}
			interacted = true
		}
	}
	if (!interacted) {
		sword.spin()
	}
}

onKeyPress("space", interact)

const SPEED = 120

const dirs = {
	"left": LEFT,
	"right": RIGHT,
	"up": UP,
	"down": DOWN,
}

player.onUpdate(() => {
	camPos(player.pos)
})

onKeyDown("right", () => {
	player.flipX = false
	sword.flipX = false
	player.move(SPEED, 0)
	sword.pos = vec2(-4, 9)
});

onKeyDown("left", () => {
	player.flipX = true
	sword.flipX = true
	player.move(-SPEED, 0)
	sword.pos = vec2(4, 9)
});

onKeyDown("up", () => {
	player.move(0, -SPEED)
});

onKeyDown("down", () => {
	player.move(0, SPEED)
});

["left", "right", "up", "down"].forEach((key) => {
	onKeyPress(key, () => {
		player.play("run")
	})
	onKeyRelease(key, () => {
		if (
			!isKeyDown("left")
			&& !isKeyDown("right")
			&& !isKeyDown("up")
			&& !isKeyDown("down")
		) {
			player.play("idle")
		}
	})
})
