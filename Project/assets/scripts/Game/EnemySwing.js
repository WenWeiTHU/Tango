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
        swingDuration: 0,
        rotateDuration: 0,
        targetPosX: 0,
        targetPosY: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        
        this.swingAction = this.setSwingAction()
        this.node.runAction(this.swingAction)
    },

    setSwingAction: function(){
        this.node.rotation = 180 * Math.atan(this.targetPosY / this.targetPosY) / Math.PI

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
