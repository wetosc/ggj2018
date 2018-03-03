import Phaser from 'phaser'

export default class extends Phaser.State {

    create() {
        this.createBG()
        this.createButtons()
        this.game.sound.stopAll()
        this.music = this.game.add.audio("bg_music")
        this.music.play()
    }

    createBG() {
        let bg = game.add.image(0, 0, 'ui_bg')
        let ratio = this.game.width / this.game.height
        bg.height = this.game.height
        bg.width = this.game.width * ratio
    }

    createButtons() {
        let button1 = game.add.button(game.width/2, game.height/2 - 50, 'ui_play', this.onClick, this);
        button1.width = 200
        button1.height = 50
        button1.anchor.setTo(0.5, 0)
        let button2 = game.add.button(game.width/2, game.height/2 + 50, 'ui_credits', this.credits, this)
        button2.width = 200
        button2.height = 50
        button2.anchor.setTo(0.5, 0)
    }

    onClick() {
        this.game.state.start("Game")   
    }
    credits() {
        this.game.state.start("Credits")
    }
}