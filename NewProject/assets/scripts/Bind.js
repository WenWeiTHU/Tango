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
    extends: cc.Component,

    properties: {
        Player1: {
            type: cc.Node,
            default: null
        },

        Player2: {
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y)
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / (Math.PI);
        degree = 360 - degree + 90;
        this.node.rotation = degree;

        this.node.height = this.dir.mag()
        this.node.x = this.Player2.x
        this.node.y = this.Player2.y
    },


    update (dt) {
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y)
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / (Math.PI);
        degree = 360 - degree + 90;
        this.node.rotation = degree;

        this.node.height = this.dir.mag()

        this.node.x = this.Player2.x
        this.node.y = this.Player2.y
    },
});