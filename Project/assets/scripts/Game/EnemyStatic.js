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
    extends: require("Enemy"),

    properties: {
        shootNum: 8,
        BulletPrefab: {
            type: cc.Prefab,
            default: null,
        },
        bulletSpeed: 60,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter(other, self) {
        if (other.node.group === "Bind" || other.node.group === "Player" || other.node.group === "Shield" ) {

            for (let i = 0; i < 360; i += 360 / this.shootNum) {
                // 构造新子弹，并设置参数
                let newBullet = cc.instantiate(this.BulletPrefab)
                let bulletSetting = newBullet.getComponent("Bullet")

                newBullet.rotation = 90 - i

                newBullet.x = this.node.x
                newBullet.y = this.node.y
                bulletSetting.direction = cc.v2(Math.cos(i * Math.PI / 180), Math.sin(i * Math.PI / 180))
                bulletSetting.speed = this.bulletSpeed

                this.node.parent.parent.addChild(newBullet)
            }

        }
        
        this.Explode.play()
        var blast = cc.instantiate(this.BlastPrefab)

        this.node.parent.addChild(blast)
        blast.setPosition(this.node.x, this.node.y)

        var animComponent = blast.getComponent(cc.Animation)
        animComponent.play('blast3')

        this.node.destroy()
        this.node.parent.sortAllChildren()
    },

    start() {},

    update(dt) {
        this.rotate()
    },
});