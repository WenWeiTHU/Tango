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
        bonus:{
            type: cc.AudioSource,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true
    },

    start () {

    },
    onCollisionEnter (other, self) {
        if (other.node.group == "Player") {
            this.bonus.play()
            //TODO: 加载场景
            this.writeResult()
            cc.director.loadScene("Transition")
        }
    },

    writeResult () {
        var sceneName = cc.director.getScene().name
        var data = {
            "Stage" : sceneName,
            "Win" : true
        }
        cc.sys.localStorage.setItem('lastStage', JSON.stringify(data))
        var temp = Number(sceneName.slice(sceneName.length - 2))
        var number = isNaN(temp) ? Number(sceneName[sceneName.length - 1]) + 1 : temp + 1
        sceneName = 'Stage' + String(number)
        cc.sys.localStorage.setItem(sceneName, true)
    },
    update (dt) {
        this.node.rotation += 1
    },
});
