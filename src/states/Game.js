/* globals __DEV__ */
import Phaser from 'phaser'
import Map from '../code/Map'
import Ship from '../sprites/Ship'

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

        this.placeRocks()

        this.createKeys()

        this.game.camera.follow(this.ship)

        this.createText()
    }

    createVars() {
        this.wraps = 1
        this.wrapping = true
        this.stopped = false
        this.speed = 300
    }

    createPlayer() {
        this.ship = new Ship({
            game: this.game,
            map: this.map,
            asset: "ship"
        })
        this.ship.setPosY(3)
        this.game.add.existing(this.ship)
    }

    createKeys() {
        let upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
        upKey.onDown.add(this.ship.moveUp, this.ship)
        let downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        downKey.onDown.add(this.ship.moveDown, this.ship)
    }

    createText() {
        var style1 = { font: "20px Arial", fill: "#ff0" };
        var t1 = this.game.add.text(10, 20, "Life:", style1);
        var t2 = this.game.add.text(this.game.width - 300, 20, "Remaining Flea Scratches:", style1);
        t1.fixedToCamera = true;
        t2.fixedToCamera = true;
    }

    placeRocks() {
        let difficulty = Math.min(Math.round(this.wraps / 2), 8)
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
    }

    render() {
        if (__DEV__) {
            // this.game.debug.bodyInfo(this.ship, 32, 32)
        }

    }

    update() {

        if (this.ship.alive && !this.stopped) {

            this.game.physics.arcade.overlap(this.ship, this.rocks, this.onHitRocks, null, this);
            this.ship.body.velocity.x = this.speed;

            this.updateWrap()

            this.game.world.wrap(this.ship, -(this.game.width / 2), false, true, false)

        } else {

            this.ship.body.velocity.x = 0
        }
    }

    updateWrap() {

        if (!this.wrapping && this.ship.x < this.game.width) {

            this.wraps++

            this.wrapping = true

            this.rocks.destroy()
            this.placeRocks()

        } else if (this.ship.x >= this.game.width) {

            this.wrapping = false
        }
    }

    onHitRocks(ship, rock) {
        rock.body = null
        this.ship.health -= 1
        if (this.ship.health <= 0) {
            this.ship.alive = false
        }
    }
}