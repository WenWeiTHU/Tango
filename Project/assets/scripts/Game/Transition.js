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
        continueBtn: {
            type: cc.Button,
            default: null
        },
        homeBtn: {
            type: cc.Button,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.homeBtn.node.on("click", this.loadBeginMenu, this)
        this.continueBtn.node.on("click", this.loadContinue, this)
        var sceneName = cc.director.getScene().name
        debugger;
        if (sceneName == 'Transition_INF') {
            var score = cc.sys.localStorage.getItem('SurviveScore')
            this.node.getChildByName('Score').getComponent(cc.Label).string = 'SurvivalTime: ' + score + 's'
            
        }
    },

    loadBeginMenu () {
        cc.director.loadScene("beginMenu")
    },

    loadContinue () {
        var s = cc.sys.localStorage.getItem("lastStage");
        s = JSON.parse(s)
        debugger
        if(s.Stage == 'Infinity War') {
            cc.director.loadScene('Infinity War')
            return
        }
        var temp = Number(s.Stage.slice(s.Stage.length - 2))
        var sceneID = isNaN(temp) ? Number(s.Stage[s.Stage.length - 1]) : temp
        sceneID = s.Win ? sceneID + 1 : sceneID
        var newSceneName = 'Stage' + String(sceneID)
        var sceneName = cc.director._loadingScene
        if (sceneName != newSceneName) {
            cc.director.loadScene(newSceneName)
        }
    },

    start () {
    },

    // update (dt) {},
});
