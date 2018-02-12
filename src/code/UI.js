import Phaser from 'phaser'

export class UI {
    constructor({ game, delegate }) {
        this.game = game
        this.delegate = delegate
        this.createVars()
        this.createText()
        this.createButtons()
    }

    createVars() {
        this.onPause = null
    }

    createText() {
        var style1 = { font: "20px Arial", fill: "#f00" }
        var t1 = this.game.add.text(10, 20, "Lifes:", style1)
        t1.fixedToCamera = true

        var style2 = { font: "26px Arial", fill: "#0000ff" }
        this.lifesText = this.game.add.text(80, 18, "", style2)
        this.lifesText.fixedToCamera = true
    }

    createButtons() {
        let button = game.add.button(game.width - 50, 10, 'button', this.pause, this);
        button.width = 40
        button.height = 40
        button.anchor.setTo(0)
        button.fixedToCamera = true
    }

    update(data) {
        this.lifesText.text = data.life
    }

    pause() {
        this.onPause.call(this.delegate)
    }
}

export class UIData {

    constructor({ ui }) {
        this.ui = ui
    }

    set life(nr) {
        this._life = nr
        this.ui.update(this)
    }
    get life() {
        return this._life
    }

}