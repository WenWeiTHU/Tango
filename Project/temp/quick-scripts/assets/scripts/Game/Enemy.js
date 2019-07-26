(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Enemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b218dhOI0lDRr8aXJb2J3qE', 'Enemy', __filename);
// scripts/Game/Enemy.js

"use strict";

/*
 * 普通敌人脚本
 */

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

    /*
     * 自转函数
     * 功能：更新对象的旋转角度，使其发生旋转
     */
    rotate: function rotate() {
        var newDegree = this.node.rotation + this.rotationUpdate / Math.PI;
        this.node.rotation = newDegree > 360 ? newDegree - 360 : newDegree;
    },


    /*
     * 初始化函数
     * 功能：初始化脚本运行所需的参数
     */
    onLoad: function onLoad() {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {},


    /*
     * 碰撞函数
     * 功能：在发生碰撞时对对象进行处理
     */
    onCollisionEnter: function onCollisionEnter(other, self) {
        // 如果碰到了地图边界，则直接进行回弹
        if (other.node.group === "Map") {
            this.speedX *= -1;
            this.speedY *= -1;
            return;
        } else {
            // 碰到其他对象，则直接爆炸，并设置动画
            this.explode();
        }
    },


    /*
     * 爆炸函数
     * 功能：销毁对象，并产生爆炸动画
     */
    explode: function explode() {
        // 产生动画和音效
        this.Explode.play();
        var blast = cc.instantiate(this.BlastPrefab);
        this.node.parent.addChild(blast);
        blast.setPosition(this.node.x, this.node.y);
        var animComponent = blast.getComponent(cc.Animation);
        animComponent.play('blast3');

        // 销毁本节点
        this.node.destroy();
    },


    /*
     * 更新位置函数
     * 根据 X 轴和 Y 轴的分速度来更新对象的位置
     */
    updatePos: function updatePos(dt) {
        debugger;
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;
    },


    // 系统调用的更新函数
    update: function update(dt) {
        this.rotate();
        this.updatePos(dt);
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
        