/* globals __DEV__ */
import Phaser from 'phaser'
import Map from '../code/Map'
import Ship from '../sprites/Ship'
import {UI, UIData} from '../code/UI'

export default class extends Phaser.State {
    init() { }
    preload() { }

    create() {
        this.createVars()

        this.game.world.setBounds(0, 0, 7200, this.game.height)

        this.map = new Map(this.game.rnd, {
            startX: this.game.width,
            endX: this.game.world.width - this.game.width
        })

        this.createPlayer()

        this.createKeys()

        this.game.camera.follow(this.ship)

        this.createUI()

        this.game.startTime = this.game.time.now
    }

    createVars() {
        this.wraps = 0
        this.wrapping = true
        this.speed = 300
        this._beforeWrap = true
    }

    createPlayer() {
        this.ship = new Ship({
            game: this.game,
            map: this.map,
            asset: "ship"
        })
        this.ship.setPosY(2)
        this.game.add.existing(this.ship)
    }
 
    createKeys() {
        let upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
        upKey.onDown.add(this.onUpKey, this)
        let downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        downKey.onDown.add(this.onDownKey, this)
    }

    createUI() {
        let ui = new UI({ game: this.game })
        ui.delegate = this
        ui.onPause = this.onPause
        this.ui = ui
        this.stats = new UIData({ui: this.ui})
        this.stats.life = 3
    }

    generateMap() {
        let difficulty = Math.min(Math.round(this.wraps / 2) + 1, 8)
        this.map.generate(difficulty)
        let newSpeed = this.map.infoForLevel(difficulty).speed
        if (newSpeed) {
            this.speed = 300 + newSpeed * 50
        }

        this.rocks = this.game.add.group()
        this.rocks.enableBody = true

        var rock
        for (let i = 0; i < this.map.rockNumber; i++) {
            var coords = this.map.rock(i)
            rock = this.rocks.create(coords.x, coords.y, "block")
            rock.width = this.map.tileWidth
            rock.height = this.map.tileHeight
            rock.body.velocity.x = 0
        }

        // if (this.wraps % 3 == 0) {
            let newShip = new Ship({
                game: this.game, 
                map: this.map,
                position: this.map.generateShip(),
                asset: 'ship'
            })
            this.game.add.existing(newShip)
            if (this.secondShip) {
                this.secondShip.destroy()
            }
            this.secondShip = newShip;
        // }
    }

    render() {
        if (__DEV__) {
            // this.game.debug.cameraInfo(this.game.camera, 32, 32);
        }
    }

    update() {

        if (this.ship.alive) {

            this.updateWrap()

            this.game.physics.arcade.overlap(this.ship, this.rocks, this.onHitRocks, null, this);
            this.game.physics.arcade.overlap(this.ship, this.secondShip, this.onHitShip, null, this);
            
            this.ship.body.velocity.x = this.speed;

            this.game.world.wrap(this.ship, -(this.game.width / 2), false, true, false)
            
        } else {

            this.ship.body.velocity.x = 0
        }
    }

    updateWrap() {
        let dist = this.game.world.width - this.ship.x
        if (this.wraps > 0 && dist <= this.game.width) {
            let lerpX = this.game.camera.lerp.x
            if (lerpX < 1) {
                this.game.camera.lerp.x += 0.01
            } else {
                this.game.camera.lerp.x = 1
            }

            if (!this._beforeWrap && dist <= this.game.width*0.55 ) {
                this._beforeWrap = true
                this.beforeWrap()
            }
        }

        if (!this.wrapping && this.ship.x < this.game.width) {
            
            if (this.wraps == 0) {
                this.startLevel()
            } else {
                this.afterWrap()
            }
            
            this.wrapping = true

            this.wraps++
            this._beforeWrap = false

        } else if (this.ship.x >= this.game.width) {

            this.wrapping = false
        }
    }

    startLevel() {
        this.generateMap()
    }

    afterWrap() {
    }

    beforeWrap() {
        this.secondShip.destroy()
        this.rocks.destroy()
        this.generateMap()
    }


    onHitRocks(ship, rock) {
        if (rock.hasCollided) {
            return
        }
        rock.body = null
        rock.hasCollided = true
        this.stats.life -= 1
        if (this.stats.life <= 0) {
            this.ship.alive = false
            this.game.state.start("Over")
        }
    }

    onHitShip(myShip, newShip) {
        this.stats.life = 4
        myShip.alive = false
        myShip.body = null
        
        this.secondShip = myShip
        this.ship = newShip
        
        this.game.camera.follow(newShip, this.game.camera.FOLLOW_LOCKON, 0.1, 1)
        
        newShip.body.velocity.x = this.speed
    }

    onUpKey() {
        this.ship.moveUp()
    }
    onDownKey() {
        this.ship.moveDown()
    }

    onPause() {
        this.ship.alive = !this.ship.alive
    }
}