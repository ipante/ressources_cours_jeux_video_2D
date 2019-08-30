export default class Plugin_modal extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager)
    {
        super(pluginManager);
    }

    saluer ()
    {
        alert('Hello !');
    }

}