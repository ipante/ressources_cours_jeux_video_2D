// code original des exaemples Phaser
// par Richard Davey disponible ici
// http://labs.phaser.io/view.html?src=src\game%20objects\group\sprite%20pool.js
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let group;
let caption;
let captionStyle = {
    fill: '#7fdbff',
    fontFamily: 'monospace',
    lineSpacing: 4
};

// indicateurs d'évolution du pool
let captionTextFormat = (
    'Total:    %1\n' +
    'Max:      %2\n' +
    'Active:   %3\n' +
    'Inactive: %4\n' +
    'Used:     %5\n' +
    'Free:     %6\n' +
    'Full:     %7\n'
);

let game = new Phaser.Game(config);

function preload () {
    // spritesheet contenant deux frames
    this.load.spritesheet('alien', 'invader1.png', { frameWidth: 32, frameHeight: 32 });
}

function create () {
    // ajout de l'animation
    this.anims.create({
        key: 'creep',
        frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 1 }),
        frameRate: 2,
        // répétition infinie
        repeat: -1
    });

    group = this.add.group({
        defaultKey: 'alien',
        maxSize: 100,
        createCallback: function (alien) {
            alien.setName('alien' + this.getLength());
            // ouvrez la console pour constater
            // que seul 100 images ont été créées
            console.log('Created', alien.name);
        },
        removeCallback: function (alien) {
            console.log('Removed', alien.name);
        }
    });

    // Le groupe pourrait être créé avant
    // group.createMultiple({
    //     active: false,
    //     key: group.defaultKey,
    //     repeat: group.maxSize - 1
    // });

    caption = this.add.text(16, 16, '', captionStyle);

    this.time.addEvent({
        delay: 100,
        loop: true,
        callback: addAlien
    });
}

function update () {
    Phaser.Actions.IncY(group.getChildren(), 1);

    group.children.iterate(function (alien) {
        if (alien.y > 600) {
            group.killAndHide(alien);
        }
    });

    caption.setText(Phaser.Utils.String.Format(captionTextFormat, [
        group.getLength(),
        group.maxSize,
        group.countActive(true),
        group.countActive(false),
        group.getTotalUsed(),
        group.getTotalFree(),
        group.isFull()
    ]));
}

function activateAlien (alien) {
     alien.setActive(true)
        .setVisible(true)
        .setTint(Phaser.Display.Color.RandomRGB().color)
        .play('creep');
}

function addAlien () {
    let alien = group.get(Phaser.Math.Between(250, 800), Phaser.Math.Between(-64, 0));
    if (!alien) return; // None free
    activateAlien(alien);
}
