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
        SurviveBtn: {
            type: cc.Button,
            default: null
        },
        BattleBtn: {
            type: cc.Button,
            default: null
        },
        HomeBtn: {
            type: cc.Button,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.SurviveBtn.node.on("click", this.loadSurviveScene, this)
        this.BattleBtn.node.on("click", this.loadStageSelectScene, this)
        this.HomeBtn.node.on("click", this.loadHomeScene, this)
    },

    loadSurviveScene () {
        cc.director.loadScene("Infinity War")
    },

    loadStageSelectScene () {
        cc.director.loadScene("StageSelect")
    },

    loadHomeScene () {
        cc.director.loadScene("beginMenu")
    }
    // update (dt) {},
});
