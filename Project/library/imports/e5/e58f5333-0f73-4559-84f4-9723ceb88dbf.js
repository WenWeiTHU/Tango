"use strict";
cc._RF.push(module, 'e58f5MzD3NFWYT0lyPOuI2/', 'Transition');
// scripts/Game/Transition.js

"use strict";

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

    onLoad: function onLoad() {
        this.homeBtn.node.on("click", this.loadBeginMenu, this);
        this.continueBtn.node.on("click", this.loadContinue, this);
    },
    loadBeginMenu: function loadBeginMenu() {
        cc.director.loadScene("beginMenu");
    },
    loadContinue: function loadContinue() {
        var s = cc.sys.localStorage.getItem("lastStage");
        s = JSON.parse(s);
        var temp = Number(s.Stage.slice(s.Stage.length - 2));
        var sceneID = isNaN(temp) ? Number(s.Stage[s.Stage.length - 1]) : temp;
        sceneID = s.Win ? sceneID + 1 : sceneID;
        var newSceneName = 'Stage' + String(sceneID);
        var sceneName = cc.director._loadingScene;
        if (sceneName != newSceneName) {
            cc.director.loadScene(newSceneName);
        }
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();