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
        this.isPaused = false
    }

    createText() {
        var style1 = { font: "34px dimboregular", fill: "#f00" }
        var t1 = this.game.add.text(10, 12, "Lifes:", style1)
        t1.fixedToCamera = true

        var style2 = { font: "36px dimboregular", fill: "#0000ff" }
        var t2 = this.game.add.text(100, 10, "", style2)
        t2.fixedToCamera = true
        this.lifesText = t2
    }

    createButtons() {
        let button = game.add.button(game.width - 50, 10, 'ui_pause1', this.pause, this);
        button.width = 40
        button.height = 40
        button.anchor.setTo(0)
        button.fixedToCamera = true
        this.pauseButton = button
    }

    update(data) {
        this.lifesText.text = data.life
    }

    pause() {
        let pauseButtonImg = this.isPaused ? "ui_pause1" : "ui_pause2"
        this.pauseButton.loadTexture(pauseButtonImg)
        this.isPaused = !this.isPaused
        
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