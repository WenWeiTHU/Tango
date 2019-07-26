(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Gravity.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89667EI+KZG85YHxp2bpQL2', 'Gravity', __filename);
// scripts/Game/Gravity.js

"use strict";

/* 
 * 弹簧的重力系统脚本
 */

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
        Grav: 0.0005,
        Step: 200,
        resistence: 0.02,
        MaxSpeed: 8
    },

    // LIFE-CYCLE CALLBACKS:

    start: function start() {},


    /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
    onLoad: function onLoad() {
        // 将初始化速度设成0
        this.speedX1 = 0;
        this.speedX2 = 0;
        this.speedY1 = 0;
        this.speedY2 = 0;

        // 计算两个主角之间的位移向量
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        this.distance = this.dir.mag();

        // 计算出加速度的大小
        var a = this.Grav * (this.distance - this.Equilibrium);
        this.acce = cc.v2(a * this.dir.x / this.distance, a * this.dir.y / this.distance);
    },


    /*
     * 更新位置函数
     * 功能：根据速度更新主角的位置
     */
    updatePos: function updatePos() {
        this.Player1.x += this.speedX1;
        this.Player1.y += this.speedY1;

        this.Player2.x += this.speedX2;
        this.Player2.y += this.speedY2;
    },


    /*
     * 更新速度函数
     * 功能：根据加速度来更新主角的速度
     */
    updateSpeed: function updateSpeed(dt) {
        // 计算两个主角之间的位移向量
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        this.distance = this.dir.mag();

        // 计算加速度
        var a = this.Grav * (this.distance - this.Equilibrium);
        this.acce = cc.v2(a * this.dir.x / this.distance, a * this.dir.y / this.distance);

        // 更新速度
        this.speedX1 -= this.acce.x;
        this.speedY1 -= this.acce.y;

        this.speedX2 += this.acce.x;
        this.speedY2 += this.acce.y;

        // 为速度乘以一个衰减系数，使得移动具有一定的阻力
        this.speedX1 -= this.speedX1 * this.resistence;
        this.speedX2 -= this.speedX2 * this.resistence;
        this.speedY1 -= this.speedY1 * this.resistence;
        this.speedY2 -= this.speedY2 * this.resistence;
    },
    update: function update(dt) {
        this.updateSpeed(dt);
        this.updatePos();
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
        //# sourceMappingURL=Gravity.js.map
        