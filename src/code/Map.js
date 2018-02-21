import Phaser from 'phaser'

export default class Map {
    constructor(rnd, { startX, endX }) {
        this.rnd = rnd
        this.startX = startX
        this.endX = endX
        this.tileWidth = 90
        this.tileHeight = 90
        this.startY = 100
        this.endY = this.startY + 5 * this.tileHeight
    }

    generate(difficulty) {
        this.level = difficulty
        this.tileNr = (this.endX - this.startX) / this.tileWidth
        this.generateRocks(this.tileNr * 2)
    }

    generateRocks(n) {
        let info = this.infoForLevel(this.level)
        this.rocks = new Array()
        var x = 1

        while (x < this.tileNr) {
            let usedY = new Array()
            for (let i = 0; i < info.rocks; i++) {
                var newY = this.rnd.integerInRange(0, 4)
                while (usedY.includes(newY)) { newY = this.rnd.integerInRange(0, 4) }
                usedY.push(newY)
                let rock = {
                    x: x,
                    y: newY
                }
                this.rocks.push(rock)
            }
            x += info.dist + 1
        }

        this.rockNumber = this.rocks.length
    }

    generateShip() {
        var newX = this.rocks[Math.floor(Math.random() * this.rocks.length)].x
        let rocks = this.rocks.filter(x => x.x == newX).map(x => x.y)
        var arr = new Array()
        let allNr = [0, 1, 2, 3, 4]
        allNr.forEach(function (x) {
            if (!rocks.includes(x)) { arr.push(x) }
        })
        let newY = arr[Math.floor(Math.random() * arr.length)]
        return {
            x: this.startX + newX * this.tileWidth,
            y: this.startY + (newY + 0.5) * this.tileHeight,
            posY: Math.round(newY)
        }
    }

    rock(index) {
        let rock = this.rocks[index]
        return {
            x: this.startX + rock.x * this.tileWidth,
            y: this.startY + rock.y * this.tileHeight,
            width: this.tileWidth,
            height: this.tileHeight
        }
    }

    ship(posY) {
        return {
            x: 200,
            y: this.startY + this.tileHeight * (posY + 0.5),
            posY: posY
        }
    }

    infoForLevel(level) {
        var res
        switch (level) {
            case 1: res = { dist: 5, rocks: 1 }; break;
            case 2: res = { dist: 5, rocks: 2 }; break;
            case 3: res = { dist: 4, rocks: 2 }; break;
            case 4: res = { dist: 4, rocks: 3 }; break;
            case 5: res = { dist: 4, rocks: 4 }; break;
            case 6: res = { dist: 4, rocks: 4, speed: 1 }; break;
            case 7: res = { dist: 4, rocks: 4, speed: 2 }; break;
            case 8: res = { dist: 4, rocks: 4, speed: 3 }; break;
            default: res = { dist: 5, rocks: 1 }; break;
        }
        return res
    }

}