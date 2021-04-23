import Phaser from '../lib/phaser.js'

export default class Carrot extends Phaser.GameObjects.Sprite{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    */

    /*
    The line with super() is to call the constructor of the parent class: Phaser.GameObjects.Sprite.
    We must do this so that initialization code in the Sprite class is executed.     
    */
    constructor(scene, x, y, texture){
    super(scene, x, y, texture);
    this.setScale(0.5); 
    }
}