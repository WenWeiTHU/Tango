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
        rotationUpdate : 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
    },

    start () {
        
    },

    onCollisionEnter (other, self) {
        debugger;
        console.log("hit!");
        this.node.destroy();
    },

    update (dt) {
        var newDegree = this.node.rotation + (this.rotationUpdate/Math.PI);
        this.node.rotation = newDegree > 360 ? newDegree - 360 : newDegree;
    },
});
