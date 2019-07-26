
cc.Class({
    extends: cc.Component,

    properties: {
        MainCamera: {
            type: cc.Camera,
            default: null
        },
    },


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
