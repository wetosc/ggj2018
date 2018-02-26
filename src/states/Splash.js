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
    this.load.image('rock1',      'assets/images/rock1.png')
    this.load.image('rock2',      'assets/images/rock2.png')
    this.load.image('ship',       'assets/images/ship1.png')
    this.load.image('button',     'assets/images/button.png')
    this.load.image('water_tile', 'assets/images/water_tile.png')
    this.load.image('land_b_tile', 'assets/images/land_b_tile.png')
    this.load.image('land_t_tile', 'assets/images/land_t_tile.png')

    this.load.image('ui_bg',      'assets/images/bg_big.png')
    this.load.image('ui_pause1',  'assets/images/pause_1.png')
    this.load.image('ui_pause2',  'assets/images/pause_2.png')
    this.load.image('ui_play',    'assets/images/play_button.png')
    this.load.image('ui_replay',  'assets/images/replay_button.png')

    this.load.audio('slosh', ['assets/audio/water_slosh.mp3','assets/audio/water_slosh.ogg'] )
    this.load.audio('crash', ['assets/audio/wood_split.mp3', 'assets/audio/wood_split.ogg'] )
    this.load.audio('bg_music', ['assets/audio/master_of_the_feast.mp3', 'assets/audio/master_of_the_feast.ogg'] )

  }

  create () {
    this.state.start('Menu')
  }
}
