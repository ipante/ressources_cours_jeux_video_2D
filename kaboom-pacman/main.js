// Initialiser le jeu Kaboom
kaboom();

// Dessiner Pac-Man et les points à manger
const pacman = add([
  rect(30, 30),
  pos(width() / 2, height() / 2),
  anchor('center'),
  color(1, 1, 0.2),
]);

const dots = [];

for (let i = 0; i < 100; i++) {
  const dot = add([
    rect(10, 10),
    pos(rand(width()), rand(height())),
    color(1, 1, 1),
    'dot',
  ]);
  dots.push(dot);
}

// Mouvement de Pac-Man
onKeyDown('left', () => {
  pacman.move(-120, 0);
  pacman.scale.x = -1;
});

onKeyDown('right', () => {
  pacman.move(120, 0);
  pacman.scale.x = 1;
});

onKeyDown('up', () => {
  pacman.move(0, -120);
});

onKeyDown('down', () => {
  pacman.move(0, 120);
});

// Points de score
let score = 0;
const scoreLabel = add([
  text(score),
  pos(12, 12),
]);

// Collision avec les points
pacman.onCollide('dot', (dot) => {
  destroy(dot);
  score++;
  scoreLabel.text = score;
});

// Boucle de jeu
const speed = 100;
let lastDir = vec2(0, 0);
const ghost = add([
  rect(20, 20),
  pos(rand(width()), rand(height())),
  color(1, 0, 0),
]);
action(() => {
  const dir = vec2(0, 0);
  if (keyIsDown('left')) dir.x -= 1;
  if (keyIsDown('right')) dir.x += 1;
  if (keyIsDown('up')) dir.y -= 1;
  if (keyIsDown('down')) dir.y += 1;
  if (dir.x != 0 || dir.y != 0) {
    lastDir = dir.scale(speed * dt());
  }
  ghost.move(lastDir);
  if (pacman.isColliding(ghost)) {
    scoreLabel.text = 'Game Over!';
    pause();
  }
});