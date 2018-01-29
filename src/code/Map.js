import Phaser from 'phaser'

export default class Map {
    constructor(rnd, { startX, endX }) {
        this.rnd = rnd
        this.startX = startX
        this.endX = endX
        this.tileWidth = 90
        this.tileHeight = 90
        this.startY = 100
    }

    generate(difficulty) {
        this.level = difficulty
        this.tileNr = (this.endX - this.startX) / this.tileWidth
        this.generateRocks(this.tileNr * 2)
    }

    generateRocks(n) {
        let info = this.infoForLevel(this.level)
        this.rocks = Array()
        var x = 1
        
        while (x < this.tileNr) {
            for (let i = 0; i < info.rocks; i++) {
                let rock = {
                    x: x,
                    y: this.rnd.integerInRange(0,4)
                }
                this.rocks.push(rock)
            }
            x += info.dist + 1
        }

        this.rocks = [...new Set(this.rocks)]

        this.rockNumber = this.rocks.length
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
            y: this.startY + this.tileHeight * (posY + 0.5)
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