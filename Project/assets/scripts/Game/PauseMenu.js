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
        ContinueBtn: {
            type: cc.Button,
            default: null
        },
        HomeBtn: {
            type: cc.Button,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.ContinueBtn.node.on('click', this.Continue, this)
        this.HomeBtn.node.on('click', function(){
            var sceneName = cc.director._loadingScene
            if (sceneName != 'beginMenu') {
                cc.director.loadScene('beginMenu')
            }
        }, this)
    },

    Continue () {
        var s = this.node.parent.parent
        s._components[1].stateChange = true
        this.node.destroy()
    }

    // update (dt) {},
});