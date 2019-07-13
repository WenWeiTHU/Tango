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
        supplyPrefab:{
            default: null,
            type: cc.Prefab
        },
        // mapUp:{
        //     default: null,
        //     type: cc.Prefab
        // },
        // mapDown:{
        //     default: null,
        //     type: cc.Prefab
        // },
        // mapLeft:{
        //     default: null,
        //     type: cc.Prefab
        // },
        // mapRight:{
        //     default: null,
        //     type: cc.Prefab
        // },
        supplyTimeGap: 1,
    },

    // LIFE-CYCLE CALLBACKS:
    getNewPosition: function(){
        var maxX = this.node.width/2;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        var maxY = this.node.height/2;
        var randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
    },

    generateSupply: function(){
        console.log(2)
        var newSupply = cc.instantiate(this.supplyPrefab)
        this.node.addChild(newSupply)
        newSupply.setPosition(this.getNewPosition())
        console.log(newSupply.x, newSupply.y)
        newSupply.getComponent('Supply').game = this
    },

    onLoad () {
        // this.goundDown = this.mapDown + this.mapDown.height / 2
        // this.goundUp = this.mapUp - this.mapUp.height / 2
        // this.goundLeft = this.mapLeft + this.mapLeft.width / 2
        // this.goundRight = this.mapRight - this.mapRight.width / 2
    },

    start () {
        this.supplyTimeCounter = 0
    },

    update (dt) {
        this.supplyTimeCounter++
        if(this.supplyTimeCounter === this.supplyTimeGap){
            this.supplyTimeCounter = 0
            console.log(1)
            this.generateSupply()
        }
    },
});
