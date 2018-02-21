import Phaser from 'phaser'

export default class extends Phaser.State {

    create() {
        this.createBG()
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
        // var style = { font: "26px Arial", fill: "#0000ff" }

        // var t1 = this.game.add.text(this.game.width / 2, this.game.height / 2 - 50, "Your score:", style)
        // t1.anchor.setTo(0.5)

        // var t2 = this.game.add.text(this.game.width / 2, this.game.height / 2, this.score + " seconds", style)
        // t2.anchor.setTo(0.5)
    }

    createButtons() {
        let button = game.add.button(game.width/2, game.height/2, 'ui_play', this.onClick, this);
        button.width = 200
        button.height = 50
        button.anchor.setTo(0.5)
    }

    onClick() {
        this.game.state.start("Game")   
    }
}