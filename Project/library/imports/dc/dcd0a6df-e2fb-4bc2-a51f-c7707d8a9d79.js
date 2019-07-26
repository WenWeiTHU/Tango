"use strict";
cc._RF.push(module, 'dcd0abf4vtLwqUfx3B9ip15', 'EnemySpin');
// scripts/Game/EnemySpin.js

"use strict";

/*
 * 旋转围绕敌人脚本
 */

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

    /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
    onLoad: function onLoad() {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;

        this.angle = 0;
        this.circulateDir = 1;
    },


    /*
     * 自转函数
     * 功能：更新对象自转角度
     */
    circulate: function circulate() {
        this.angle += this.circulateDir * this.circulateUpdate;

        this.angle = this.angle > 360 ? this.angle - 360 : this.angle;

        this.node.x = this.centerX + this.radius * Math.sin(this.angle * Math.PI / 180);
        this.node.y = this.centerY + this.radius * Math.cos(this.angle * Math.PI / 180);
    },
    start: function start() {},


    /*
     * 碰撞检测函数
     * 功能：当敌人发生碰撞时，调用此函数对对象进行处理
     */
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == "Map") {
            // 如果碰到了地图边界，则直接反弹
            this.circulateDir *= -1;
            return;
        } else {
            // 如果碰到了其他对象，则发生爆炸并销毁
            this.explode();
        }
    },


    /*
     * 爆炸函数
     * 功能：产生爆炸动画并销毁自身
     */
    explode: function explode() {
        this.Explode.play();
        var blast = cc.instantiate(this.BlastPrefab);

        this.node.parent.addChild(blast);
        blast.setPosition(this.node.x, this.node.y);

        var animComponent = blast.getComponent(cc.Animation);
        animComponent.play('blast3');

        this.node.destroy();
    },


    /*
     * 更新位置函数
     * 功能：根据分速度来更新对象的下一个位置
     */
    updatePos: function updatePos(dt) {
        this.dir = cc.v2(this.Player.x - this.centerX, this.Player.y - this.centerY);
        this.distance = this.dir.mag();

        this.centerX += this.dir.x / this.distance * this.centerSpeed * dt;
        this.centerY += this.dir.y / this.distance * this.centerSpeed * dt;
    },


    // 系统调用的更新函数
    update: function update(dt) {
        this.rotate();
        this.updatePos();
        this.circulate();
    }
});

cc._RF.pop();