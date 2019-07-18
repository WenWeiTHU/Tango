"use strict";
cc._RF.push(module, '89667EI+KZG85YHxp2bpQL2', 'Gravity');
// scripts/Game/Gravity.js

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
        Player1: {
            type: cc.Node,
            default: null
        },

        Player2: {
            type: cc.Node,
            default: null
        },

        Equilibrium: 500,
        Delta: 200,
        Grav: 0.0005,
        Step: 200,
        resistence: 0.02
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.speedX1 = 0;
        this.speedX2 = 0;
        this.speedY1 = 0;
        this.speedY2 = 0;

        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        this.distance = this.dir.mag();

        var a = this.Grav * (this.distance - this.Equilibrium);
        this.acce = cc.v2(a * this.dir.x / this.distance, a * this.dir.y / this.distance);
    },
    update: function update(dt) {

        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        this.distance = this.dir.mag();

        var a = this.Grav * (this.distance - this.Equilibrium);
        this.acce = cc.v2(a * this.dir.x / this.distance, a * this.dir.y / this.distance);

        this.speedX1 -= this.acce.x;
        this.speedY1 -= this.acce.y;

        this.speedX2 += this.acce.x;
        this.speedY2 += this.acce.y;

        this.speedX1 -= this.speedX1 * this.resistence;
        this.speedX2 -= this.speedX2 * this.resistence;
        this.speedY1 -= this.speedY1 * this.resistence;
        this.speedY2 -= this.speedY2 * this.resistence;

        this.Player1.x += this.speedX1;
        this.Player1.y += this.speedY1;

        this.Player2.x += this.speedX2;
        this.Player2.y += this.speedY2;
    }
});

cc._RF.pop();