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
        MainCamera: {
            type: cc.Camera,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.end = false
    },

    update (dt) {
        if(this.MainCamera.node.y >= -3770){
            this.MainCamera.node.y -= 1.4
        }
        else if(!this.end && this.MainCamera.node.y < -3770){
            this.end = true
            this.scheduleOnce(()=>{
                cc.director.loadScene('beginMenu')
            }, 3)
        }
    },
});
