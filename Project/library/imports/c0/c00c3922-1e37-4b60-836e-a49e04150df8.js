"use strict";
cc._RF.push(module, 'c00c3kiHjdLYINupJ4EFQ34', 'Bullet');
// scripts/Game/Bullet.js

'use strict';

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
        direction: 0,
        speed: 0,
        BulletBreakPrefab: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {
        if (this.direction === 0) return;
        this.directionX = this.direction.x / this.direction.mag();
        this.directionY = this.direction.y / this.direction.mag();
    },


    // 直接消失
    onCollisionEnter: function onCollisionEnter(other, self) {
        var blast = cc.instantiate(this.BulletBreakPrefab);

        this.node.parent.addChild(blast);
        blast.setPosition(this.node.x, this.node.y);

        var animComponent = blast.getComponent(cc.Animation);
        animComponent.play('bulletBreak');

        this.node.destroy();
    },


    // 位置更新
    update: function update(dt) {
        this.node.x += this.speed * this.directionX * dt;
        this.node.y += this.speed * this.directionY * dt;
    }
});

cc._RF.pop();