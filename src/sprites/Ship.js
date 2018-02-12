import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({ game, map, asset, position }) {
        
        let coords = position || map.ship(2)
        
        super(game, coords.x, coords.y, asset)

        this.map = map

        this.anchor.setTo(0.5, 0.5)
        this.width = 200
        this.height = 60

        this.game.physics.arcade.enable(this)
        this.body.allowGravity = false;
        
        this.setPosY(coords.posY == null ? 2 : coords.posY)
        
        this.createVars()
    }

    createVars() {
        this.health = 3
        this.angMult = -0.2
    }

    setPosY(posY) {
        this.posY = posY
    }


    update() {
        if (!this.alive) {  return  }
        this.updateAngle()
        if (this.animatePos) {
            this.updatePos()
        }
    }

    updateAngle() {
        if (Math.abs(this.angle) > 5) {
            this.angMult *= -1
        }
        this.angle += 1 * this.angMult
    }

    updatePos() {
        if (Math.abs(this.y - this.newY) > 0.5) {
            this.y += Math.sign(this.newY - this.y) * Math.max(0.25, Math.abs(this.newY - this.y) / 5)
        } else {
            this.animatePos = false
        }
    }

    moveUp() {
        if (!this.alive) {  return  }
        if (this.posY > 0) {
            this.posY -= 1
        }
        this.move()
    }

    moveDown() {
        if (!this.alive) {  return  }
        if (this.posY < 4) {
            this.posY += 1
        }
        this.move()
    }

    move() {
        let coords = this.map.ship(this.posY)
        this.newY = coords.y
        this.animatePos = true
    }
}
