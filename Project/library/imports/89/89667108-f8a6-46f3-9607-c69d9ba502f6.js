"use strict";
cc._RF.push(module, '89667EI+KZG85YHxp2bpQL2', 'Gravity');
// scripts/Gravity.js

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
        Grav: 1,
        Step: 200
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        this.distance = this.dir.mag();

        var a = this.Grav * (this.distance - this.Equilibrium);

        console.log('grav', this.Grav);

        this.acce = cc.v2(a * this.dir.x / this.distance, a * this.dir.y / this.distance);
    },
    update: function update(dt) {
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        this.distance = this.dir.mag();
        var a = this.Grav * (this.distance - this.Equilibrium);
        this.acce = cc.v2(a * this.dir.x / this.distance, a * this.dir.y / this.distance);

        var player1 = this.Player1.getComponents("Player")[0];
        var player2 = this.Player2.getComponents("Player")[0];

        player1.speedX -= this.acce.x * dt;
        player1.speedY -= this.acce.y * dt;

        player2.speedX += this.acce.x * dt;
        player2.speedY += this.acce.y * dt;
    }
});

cc._RF.pop();