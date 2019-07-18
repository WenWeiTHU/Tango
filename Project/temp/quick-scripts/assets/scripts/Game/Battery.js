(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Battery.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '79fddd2NzRP5oudh+AU9zUE', 'Battery', __filename);
// scripts/Game/Battery.js

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
        rotationUpdate: 0,
        bulletSpeed: 0,
        shootNum: 2,
        Player1: {
            type: cc.Node,
            default: null
        },
        Player2: {
            type: cc.Node,
            default: null
        },
        BulletPrefab: {
            type: cc.Prefab,
            default: null
        },
        Orbit: {
            type: cc.AudioSource,
            default: null
        },
        shootTime: 2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {
        this.target = Math.random() > 0.5 ? this.Player1 : this.Player2;
        this.schedule(this.createBullet, this.shootTime);
    },


    /*
     * 产生新子弹的函数
     */
    createBullet: function createBullet() {
        this.Orbit.play();

        // 从炮台到目标位置的向量
        var dir = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);

        // 构造新子弹，并设置参数
        var newBullet = cc.instantiate(this.BulletPrefab);
        var bulletSetting = newBullet.getComponent("Bullet");

        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / Math.PI;
        newBullet.rotation = 450 - degree;

        newBullet.x = this.node.x;
        newBullet.y = this.node.y;
        newBullet.zIndex = -1;
        bulletSetting.direction = dir;
        bulletSetting.speed = this.bulletSpeed;
        this.node.parent.addChild(newBullet);

        for (var i = 1; i < this.shootNum; i++) {
            var _newBullet = cc.instantiate(this.BulletPrefab);
            var _bulletSetting = _newBullet.getComponent("Bullet");
            var _r = Math.atan2(this.dir.y, this.dir.x);
            var _degree = _r * 180 / Math.PI + 5 * i;
            _newBullet.rotation = 450 - _degree;
            _newBullet.x = this.node.x;
            _newBullet.y = this.node.y;
            _newBullet.zIndex = -1;

            _bulletSetting.direction = cc.v2(Math.cos(_degree * Math.PI / 180), Math.sin(_degree * Math.PI / 180));
            _bulletSetting.speed = this.bulletSpeed;
            this.node.parent.addChild(_newBullet);
        }

        for (var _i = 1; _i < this.shootNum; _i++) {
            var _newBullet2 = cc.instantiate(this.BulletPrefab);
            var _bulletSetting2 = _newBullet2.getComponent("Bullet");
            var _r2 = Math.atan2(this.dir.y, this.dir.x);
            var _degree2 = _r2 * 180 / Math.PI - 5 * _i;
            _newBullet2.rotation = 450 - _degree2;
            _newBullet2.x = this.node.x;
            _newBullet2.y = this.node.y;
            _newBullet2.zIndex = -1;

            _bulletSetting2.direction = cc.v2(Math.cos(_degree2 * Math.PI / 180), Math.sin(_degree2 * Math.PI / 180));
            _bulletSetting2.speed = this.bulletSpeed;
            this.node.parent.addChild(_newBullet2);
        }

        this.node.parent.sortAllChildren();
    },
    update: function update(dt) {
        this.dir = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / Math.PI;
        degree = 360 - degree + 90;
        this.node.rotation = degree;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Battery.js.map
        