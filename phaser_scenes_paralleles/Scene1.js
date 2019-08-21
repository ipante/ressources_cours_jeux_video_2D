class Scene1 extends Phaser.Scene{
    constructor(){
        super('boot')
    }

    preload(){
    }

    create(){
        this.input.on('pointermove', pointer => {
            let touchX = pointer.x;
            let touchY = pointer.y;
            console.log(touchX,touchY);
            this.events.emit('souris_bouge',[touchX,touchY]);
         });
    }

    update(){
        //jeu.input.mousePointer.x;
    }
}