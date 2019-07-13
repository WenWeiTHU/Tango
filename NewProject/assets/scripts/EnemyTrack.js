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
    extends: require("Enemy"),

    properties: {
        Player: {
            type: cc.Node,
            default: null,
        },
        maxSpeed: 400,
        iniAccel: 60,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    track: function (dt) {
        this.dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y)

        this.distance = this.dir.mag()

        if (Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2)) <= this.maxSpeed) {
            this.speedX += this.iniAccel * this.dir.x / this.distance * dt
            this.speedY += this.iniAccel * this.dir.y / this.distance * dt
        }

        this.node.x += this.speedX * dt
        this.node.y += this.speedY * dt
    },

    update(dt) {
        this.rotate()
        this.track(dt)
    },
});