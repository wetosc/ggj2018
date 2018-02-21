import Phaser from 'phaser'

export default class extends Phaser.State {

    create() {
        this.createBG()
        this.score = (this.game.time.now - this.game.startTime) * 0.001
        this.score = this.score.toFixed(2)
        this.createText()
        this.createButtons()
    }

    createBG() {
        let bg = game.add.image(0, 0, 'ui_bg')
        let ratio = this.game.width / this.game.height
        bg.height = this.game.height
        bg.width = this.game.width * ratio
    }

    createText() {
        let y = 220
        var style = { font: "bold 36px dimboregular", fill: "#0000ff" }

        var t1 = this.game.add.text(this.game.width / 2, y, "Your score:", style)
        t1.anchor.setTo(0.5)
        y += 50

        var t2 = this.game.add.text(this.game.width / 2, y, this.score + " seconds", style)
        t2.anchor.setTo(0.5)
    }

    createButtons() {
        let button = game.add.button(game.width/2, this.game.height / 2 + 100, 'ui_replay', this.onClick, this);
        button.width = 200
        button.height = 50
        button.anchor.setTo(0.5)
    }

    onClick() {
        this.startGame()
    }

    startGame() {
        this.game.state.start("Game")
    }
}