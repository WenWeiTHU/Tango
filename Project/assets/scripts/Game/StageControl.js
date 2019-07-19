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
        target:  {
            type: cc.Node,
            default: null
        },
        targetX: 0,
        targetY: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.target.active = false
        this.showTarget = false
    },

    update (dt) {
        if (this.node.children.length == 0 && !this.showTarget) {
            this.target.active = true
            this.showTarget = true
        }
    },
});
