import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('rock1', 'assets/images/rock1.png')
    this.load.image('rock2', 'assets/images/rock2.png')
    this.load.image('ship', 'assets/images/ship1.png')
    this.load.image('button', 'assets/images/button.png')
  }

  create () {
    this.state.start('Menu')
  }
}
