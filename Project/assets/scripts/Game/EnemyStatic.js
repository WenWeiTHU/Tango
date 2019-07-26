/*
 * 静态敌人脚本
 */

cc.Class({
    extends: require("Enemy"),

    properties: {
        shootNum: 8,
        BulletPrefab: {
            type: cc.Prefab,
            default: null,
        },
        bulletSpeed: 60,
    },


    /*
     * 初始化函数
     * 功能：初始化脚本运行所需的设定
     */
    onLoad() {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

    /*
     * 碰撞函数
     * 功能：对象被碰撞时调用此函数
     */
    onCollisionEnter(other, self) {
        if (other.node.group === "Bind" || other.node.group === "Player" || other.node.group === "Shield" ) {
        // 如果被链接、主角或者护盾撞击，则该对象发生爆炸
            this.shoot()
            this.explode()
        }
    },

    /*
     * 射击函数
     * 功能：当敌人破裂时向四周发射子弹
     */
    shoot () {
        for (let i = 0; i < 360; i += 360 / this.shootNum) {
            // 构造新子弹，并设置参数
            this.createBullet(this.node.x, this.node.y, 
                cc.v2(Math.cos(i * Math.PI / 180), Math.sin(i * Math.PI / 180)),
                -1, 90 - i, this.bulletSpeed
            )
        }

    },

    /*
     * 爆炸函数
     * 功能：产生爆炸动画并销毁自身
     */
    explode () {
        // 产生动画
        this.Explode.play()
        var blast = cc.instantiate(this.BlastPrefab)
        this.node.parent.addChild(blast)
        blast.setPosition(this.node.x, this.node.y)
        var animComponent = blast.getComponent(cc.Animation)
        animComponent.play('blast3')

        // 销毁本节点
        this.node.destroy()
    },

    /*
     * 产生子弹函数
     * 功能：按照给定的参数实例化一个子弹对象，并加入到父节点中
     */ 
    createBullet (x, y, direction, zIndex, rotation, speed) {
        var newBullet = cc.instantiate(this.BulletPrefab)
        var bulletSetting = newBullet.getComponent('Bullet')
        newBullet.rotation = 450 - rotation
        newBullet.x = x
        newBullet.y = y
        newBullet.zIndex = zIndex
        bulletSetting.direction = direction
        bulletSetting.speed = speed
        this.node.parent.addChild(newBullet)
    },

    start() {},

    // 系统调用的更新函数
    update(dt) {
        this.rotate()
    },
});