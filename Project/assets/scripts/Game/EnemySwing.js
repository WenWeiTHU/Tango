/*
 * 来回移动敌人脚本
 */
cc.Class({
    extends: require("Enemy"),

    properties: {
        swingDuration: 0,
        rotateDuration: 0,
        targetPosX: 0,
        targetPosY: 0,
    },



    /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
    onLoad () {
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        
        // 为对象设定一个环绕和旋转的行为
        this.swingAction = this.setSwingAction()
        this.node.runAction(this.swingAction)
    },

    /*
     * 设置环绕行为函数 
     * 功能：给对象设定一个环绕着主角旋转的行为
     */
    setSwingAction () {
        if(this.targetPosX === 0){
            this.targetPosX = 1
        }
        this.node.rotation = 90 - 180 * Math.atan(this.targetPosY / this.targetPosX) / Math.PI

        var swingUp = cc.moveBy(this.swingDuration, cc.v2(this.targetPosX, this.targetPosY)).easing(cc.easeCubicActionInOut()); 
        var rotate = cc.rotateBy(this.rotateDuration, 180)
        var swingDown = cc.moveBy(this.swingDuration, cc.v2(-this.targetPosX, -this.targetPosY)).easing(cc.easeCubicActionInOut())
        var rotate = cc.rotateBy(this.rotateDuration, 180)
        // 不断重复
        return cc.repeatForever(cc.sequence(swingUp, rotate, swingDown, rotate));
    },

    start () {
        
    },

    // update (dt) {},
});
