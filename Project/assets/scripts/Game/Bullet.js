/*
 * 子弹运行脚本
 */

cc.Class({
    extends: cc.Component,

    properties: {
        direction: 0,
        speed: 0,
        BulletBreakPrefab: {
            type:cc.Prefab,
            default: null,
        }
    },


    /*
     * 初始化函数
     * 功能：初始化子弹运行所需要的设置
     */
    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.setDirection()
    },

    start () {
    },

    /*
     * 设置方向函数
     * 功能：设置子弹飞行的方向
     */
    setDirection () {
        if (this.direction === 0) {
            return
        }
        this.directionX = this.direction.x / this.direction.mag()
        this.directionY = this.direction.y / this.direction.mag()
    },
    
    /*
     * 碰撞函数
     * 功能：发生碰撞时调用，当发生碰撞时，产生一个动画效果，并销毁节点本身
     */
    onCollisionEnter (other, self) {
        // 实例化动画并设置其参数
        var blast = cc.instantiate(this.BulletBreakPrefab)
        this.node.parent.addChild(blast)
        blast.setPosition(this.node.x, this.node.y)
        var animComponent = blast.getComponent(cc.Animation)
        animComponent.play('bulletBreak')
     
        // 销毁自身节点
        this.node.destroy();
    },

    /*
     * 更新位置函数
     * 功能：根据方向和时间更新节点的下一个位置
     */
    updatePos (dt) {
        this.node.x += this.speed * this.directionX * dt
        this.node.y += this.speed * this.directionY * dt
    },

    // 每帧更新时系统调用的更新函数
    update (dt) {
        this.updatePos(dt)
    },
});
