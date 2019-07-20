"use strict";
cc._RF.push(module, 'dcd0abf4vtLwqUfx3B9ip15', 'EnemySpin');
// scripts/Game/EnemySpin.js

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
        circulateUpdate: 2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },


    circulate: function circulate() {
        this.angle += this.circulateDir * this.circulateUpdate;

        this.angle = this.angle > 360 ? this.angle - 360 : this.angle;

        this.node.x = this.centerX + this.radius * Math.sin(this.angle * Math.PI / 180);
        this.node.y = this.centerY + this.radius * Math.cos(this.angle * Math.PI / 180);
    },

    start: function start() {
        this.angle = 0;
        this.circulateDir = 1;
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == "Map") {
            this.circulateDir *= -1;
            return;
        } else {
            this.Explode.play();
            var blast = cc.instantiate(this.BlastPrefab);

            this.node.parent.addChild(blast);
            blast.setPosition(this.node.x, this.node.y);

            var animComponent = blast.getComponent(cc.Animation);
            animComponent.play('blast3');

            this.node.destroy();
        }
    },
    update: function update(dt) {
        this.rotate();

        this.dir = cc.v2(this.Player.x - this.centerX, this.Player.y - this.centerY);
        this.distance = this.dir.mag();

        this.centerX += this.dir.x / this.distance * this.centerSpeed * dt;
        this.centerY += this.dir.y / this.distance * this.centerSpeed * dt;
        this.circulate();
    }
});

cc._RF.pop();