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
        let strings = [
            'Sound:',
            '"Destruction, Wooden, A.wav" by InspectorJ of Freesound.org',
            '"Master of the Feast" Kevin MacLeod (incompetech.com)\n' +
            'Licensed under Creative Commons: By Attribution 3.0 License\n' +
            'http://creativecommons.org/licenses/by/3.0/'
        ]

        let y = 150
        var style = { font: "bold 36px dimboregular", fill: "#0000ff" }

        var t1 = this.game.add.text(this.game.width / 2, y, strings[0], style)
        t1.anchor.setTo(0.5, 0)
        y += 70

        var t2 = this.game.add.text(this.game.width / 2, y, strings[1], style)
        t2.anchor.setTo(0.5, 0)
        y += 70
        
        var t3 = this.game.add.text(this.game.width / 2, y, strings[2], style)
        t3.anchor.setTo(0.5, 0)
        y += 70
    }

    createButtons() {
        let button = game.add.button(this.game.width-40, 30, 'ui_cancel', this.onClick, this);
        button.width = 60
        button.height = 60
        button.anchor.setTo(1, 0)
    }

    onClick() {
        this.game.state.start("Menu")
    }
}