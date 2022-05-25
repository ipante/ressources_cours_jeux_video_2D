kaboom({
   //    scale: 4,
   //    background: [0, 0, 0],
});

// https://opengameart.org/content/pug-rework
loadSpriteAtlas("pug_frogger.png", {
   pug: {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
      sliceX: 3,
      sliceY: 4,
      anims: {
         idle: {
            from: 0,
            to: 2,
            speed: 1,
            loop: true,
         },
         haut: {
            from: 0,
            to: 2,
            speed: 3,
            loop: true,
         },
         droite: {
            from: 3,
            to: 5,
            speed: 3,
            loop: true,
         },
         bas: {
            from: 6,
            to: 8,
            speed: 3,
            loop: true,
         },
         gauche: {
            from: 9,
            to: 11,
            speed: 3,
            loop: true,
         },
      },
   },
});

// floor
// const niveau = addLevel(
//    [
//       "xxxxxxxxxxx",
//       "           ",
//       "           ",
//       "           ",
//       "           ",
//       "           ",
//       "           ",
//       "           ",
//       "           ",
//       "           ",
//    ],
//    {
//       width: 32,
//       height: 32,
//       " ": () => add[sprite("pug")],
//    }
// );

const pug = add([
   sprite("pug", { anim: "idle" }),
   pos(200, 200),
   area({ width: 32, height: 32, offset: vec2(0, 0) }),
   solid(),
   origin("center"),
]);
