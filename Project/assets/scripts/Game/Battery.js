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
        rotationUpdate : 0,
        bulletSpeed:0,
        shootNum: 1,
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
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getCollisionManager().enabled = true;
     },

    start () {
        this.target = Math.random() > 0.5 ? this.Player1 : this.Player2;
        this.schedule(this.createBullet, 2);
    },

    /*
     * 产生新子弹的函数
     */
    createBullet () {
        // 从炮台到目标位置的向量
        var dir = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);

        // 构造新子弹，并设置参数
        var newBullet = cc.instantiate(this.BulletPrefab);
        var bulletSetting = newBullet.getComponent("Bullet");
        
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / (Math.PI);
        newBullet.rotation = 450 - degree;

        newBullet.x = this.node.x;
        newBullet.y = this.node.y;
        newBullet.zIndex = -1;
        bulletSetting.direction = dir;
        bulletSetting.speed = this.bulletSpeed;
        this.node.parent.addChild(newBullet);
        this.node.parent.sortAllChildren();
    },

     update (dt) {
        this.dir = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / (Math.PI);
        degree = 360 - degree + 90;
        this.node.rotation = degree;
     },
});
