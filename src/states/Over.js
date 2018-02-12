import Phaser from 'phaser'

export default class extends Phaser.State {

    create() {
        this.score = (this.game.time.now - this.game.startTime) * 0.001
        this.score = this.score.toFixed(2)
        this.createText()
        this.createButtons()
    }

    createText() {
        var style = { font: "26px Arial", fill: "#0000ff" }

        var t1 = this.game.add.text(this.game.width / 2, this.game.height / 2 - 50, "Your score:", style)
        t1.anchor.setTo(0.5)

        var t2 = this.game.add.text(this.game.width / 2, this.game.height / 2, this.score + " seconds", style)
        t2.anchor.setTo(0.5)
    }

    createButtons() {
        let button = game.add.button(game.width/2, 100, 'button', this.onClick, this);
        button.anchor.setTo(0.5)
    }

    onClick() {
        this.startGame()
    }

    startGame() {
        this.game.state.start("Game")
    }
}