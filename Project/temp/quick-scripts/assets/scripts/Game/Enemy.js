(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Enemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b218dhOI0lDRr8aXJb2J3qE', 'Enemy', __filename);
// scripts/Game/Enemy.js

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
        accel: 0, // 敌机加速度
        speedX: 0, // 敌机X方向速度
        speedY: 0, // 敌机Y方向速度
        rotationUpdate: 20, // 敌机自转时长
        BlastPrefab: {
            type: cc.Prefab,
            default: null
        },
        Explode: {
            type: cc.AudioSource,
            default: null
        }
    },

    // 自转
    rotate: function rotate() {
        var newDegree = this.node.rotation + this.rotationUpdate / Math.PI;
        this.node.rotation = newDegree > 360 ? newDegree - 360 : newDegree;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
    },
    start: function start() {},
    onCollisionEnter: function onCollisionEnter(other, self) {
        // 直接回弹
        if (other.node.group === "Map") {
            this.speedX *= -1;
            this.speedY *= -1;
            return;
        }
        // 碰撞主角,链接,护盾则爆炸
        else {
                this.Explode.play();

                var blast = cc.instantiate(this.BlastPrefab);

                this.node.parent.addChild(blast);
                blast.setPosition(this.node.x, this.node.y);

                var animComponent = blast.getComponent(cc.Animation);
                animComponent.play('blast3');

                this.node.destroy();
            }
    },


    // 位置更新
    update: function update(dt) {
        this.rotate();

        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;
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
        //# sourceMappingURL=Enemy.js.map
        