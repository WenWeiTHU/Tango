"use strict";
cc._RF.push(module, '393c3v/8d1GU75sOTmfQXWr', 'EnemyCopter');
// scripts/Game/EnemyCopter.js

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
    extends: require("EnemySpin"),

    properties: {
        BulletPrefab: {
            type: cc.Prefab,
            default: null
        },
        Body: {
            type: cc.Node,
            default: null
        },
        Fly: {
            type: cc.Node,
            default: null
        },
        shootTime: 3,
        shootInterval: 0.3,
        shootNum: 3,
        bulletSpeed: 100,
        flyRotationUpdate: 15
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    shoot: function shoot() {
        this.schedule(this.createBullet, this.shootInterval, this.shootNum - 1);
    },

    createBullet: function createBullet() {
        var dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y);

        // 构造新子弹，并设置参数
        var newBullet = cc.instantiate(this.BulletPrefab);
        var bulletSetting = newBullet.getComponent("Bullet");

        var r = Math.atan2(dir.y, dir.x);
        var degree = r * 180 / Math.PI;
        newBullet.rotation = 450 - degree;

        newBullet.x = this.node.x;
        newBullet.y = this.node.y;
        bulletSetting.direction = dir;
        bulletSetting.speed = this.bulletSpeed;

        this.node.parent.parent.addChild(newBullet);
        this.node.parent.sortAllChildren();
    },

    start: function start() {
        this.angle = 0;
        this.circulateDir = 1;
        this.flyDegree = 0;
        this.schedule(this.shoot, this.shootTime);
    },


    face: function face() {
        this.angle += this.circulateDir * this.circulateUpdate;
        this.angle = this.angle > 360 ? this.angle - 360 : this.angle;

        this.node.rotation = this.angle + 180;

        this.node.x = this.centerX + this.radius * Math.sin(this.angle * Math.PI / 180);
        this.node.y = this.centerY + this.radius * Math.cos(this.angle * Math.PI / 180);
    },

    update: function update(dt) {
        this.flyDegree += this.circulateDir * this.flyRotationUpdate / Math.PI;
        this.flyDegree = this.flyDegree > 360 ? this.flyDegree - 360 : this.flyDegree;
        this.Fly.rotation = this.flyDegree;

        this.dir = cc.v2(this.Player.x - this.centerX, this.Player.y - this.centerY);
        this.distance = this.dir.mag();

        this.centerX += this.dir.x / this.distance * this.centerSpeed * dt;
        this.centerY += this.dir.y / this.distance * this.centerSpeed * dt;
        this.face();
    }
});

cc._RF.pop();