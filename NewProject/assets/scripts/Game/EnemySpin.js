// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: require("EnemyTrack"),

    properties: {
        Player: {
            type: cc.Node,
            default: null,
            override: true
        },
        centerX: 0,
        centerY: 0,
        centerSpeed: 50,
        radius: 100,
        circulateUpdate: 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    circulate: function () {
        this.angle += this.circulateDir*this.circulateUpdate;

        this.angle = this.angle > 360 ? this.angle - 360 : this.angle

        this.node.x = this.centerX + this.radius * Math.sin(this.angle * Math.PI / 180)
        this.node.y = this.centerY + this.radius * Math.cos(this.angle * Math.PI / 180)
    },

    start() {
        this.angle = 0
        this.circulateDir = 1
    },
    onCollisionEnter (other, self) {
        if (other.node.group == "Map") {
            this.circulateDir *= -1
            return
        }
        else {
            this.node.destroy()
        }
    },

    update(dt) {
        this.rotate()

        this.dir = cc.v2(this.Player.x - this.centerX, this.Player.y - this.centerY)
        this.distance = this.dir.mag()

        this.centerX += this.dir.x / this.distance * this.centerSpeed * dt
        this.centerY += this.dir.y / this.distance * this.centerSpeed * dt
        this.circulate()
    },
});