"use strict";
cc._RF.push(module, 'bf43bFZBr9Fa5lkxhrrbxAN', 'Canvas');
// scripts/Canvas.js

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

    properties: {
        StaticEnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        staticEnemyNum: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},


    generateNewStaticEnemy: function generateNewStaticEnemy() {
        var newEnemy = cc.instantiate(this.StaticEnemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(0, 0);
    },

    getNewEnemyPos: function getNewEnemyPos() {
        return cc.v2(100, 100);
    },
    start: function start() {
        this.generateNewStaticEnemy();
    }
}

// update (dt) {},
);

cc._RF.pop();