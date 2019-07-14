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
        direction: 0,
        speed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    start () {
        if(this.direction === 0)
            return;
        this.directionX = this.direction.x / this.direction.mag();
        this.directionY = this.direction.y / this.direction.mag();
    },

    onCollisionEnter (other, self) {
        this.node.destroy();
    },

    update (dt) {
        this.node.x += this.speed * this.directionX * dt;
        this.node.y += this.speed * this.directionY * dt;
    },
});
