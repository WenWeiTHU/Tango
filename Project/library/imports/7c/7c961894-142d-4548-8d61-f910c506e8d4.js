"use strict";
cc._RF.push(module, '7c961iUFC1FSI1h+RDFBujU', 'EnemyTrack');
// scripts/Game/EnemyTrack.js

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
    extends: require("Enemy"),

    properties: {
        Player: {
            type: cc.Node,
            default: null
        },
        maxSpeed: 400,
        iniAccel: 0.01
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        cc.director.getCollisionManager().enabled = true;
        this.speedX = 0;
        this.speedY = 0;
    },


    track: function track(dt) {
        this.dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y);

        this.distance = this.dir.mag();

        if (Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2)) < this.maxSpeed) {
            this.speedX += this.iniAccel * dt;
            this.speedY += this.iniAccel * dt;
        }

        this.node.x += this.speedX * this.dir.x / this.distance;
        this.node.y += this.speedY * this.dir.y / this.distance;
    },

    update: function update(dt) {
        this.rotate();
        this.track(dt);
    }
});

cc._RF.pop();