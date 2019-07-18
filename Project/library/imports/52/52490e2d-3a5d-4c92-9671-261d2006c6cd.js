"use strict";
cc._RF.push(module, '524904tOl1MkpZxJh0gBsbN', 'Supply');
// scripts/Game/Supply.js

"use strict";

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

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },


    // 碰到则消失
    onCollisionEnter: function onCollisionEnter(other, self) {
        // TODO 消失动画
        this.node.destroy();
    },


    // TODO 补给只能存在一定时长

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();