"use strict";
cc._RF.push(module, '7c961iUFC1FSI1h+RDFBujU', 'EnemyTrack');
// scripts/Game/EnemyTrack.js

"use strict";

/*
 * 追踪敌人函数
 */

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

    /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
    onLoad: function onLoad() {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;

        // 设置初速度为0
        this.speedX = 0;
        this.speedY = 0;
    },


    /*
     * 更新位置函数
     * 功能：计算出对象与主角的方向，然后更新对象的速度和位置
     */
    updatePos: function updatePos(dt) {
        // 计算对象和主角的位移向量
        this.dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y);

        this.distance = this.dir.mag();

        // 如果速度未达到上限，则继续加速
        if (Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2)) < this.maxSpeed) {
            this.speedX += this.iniAccel * dt;
            this.speedY += this.iniAccel * dt;
        }

        // 更新位置
        this.node.x += this.speedX * this.dir.x / this.distance;
        this.node.y += this.speedY * this.dir.y / this.distance;
    },
    update: function update(dt) {
        this.rotate();
        this.updatePos(dt);
    }
});

cc._RF.pop();