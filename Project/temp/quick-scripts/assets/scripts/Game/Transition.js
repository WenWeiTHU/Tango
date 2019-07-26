(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Transition.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e58f5MzD3NFWYT0lyPOuI2/', 'Transition', __filename);
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
        var sceneName = cc.director.getScene().name;
        if (sceneName == 'Transition_INF') {
            var score = cc.sys.localStorage.getItem('SurviveScore');
            var highestScore = cc.sys.localStorage.getItem('highestScore');
            this.node.getChildByName('Score').getComponent(cc.Label).string = 'SurvivalTime: ' + score + 's';
            this.node.getChildByName('Score').getComponent(cc.Label).string += '\nHighest Score: ' + highestScore + 's';
            this.node.getChildByName('rankBtn').on('click', function () {
                cc.director.loadScene('Ranking');
            }, this);
        }
    },
    loadBeginMenu: function loadBeginMenu() {
        cc.director.loadScene("beginMenu");
    },
    loadContinue: function loadContinue() {
        var s = cc.sys.localStorage.getItem("lastStage");
        s = JSON.parse(s);
        if (s.Stage == 'Infinity War') {
            cc.director.loadScene('Infinity War');
            return;
        }
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Transition.js.map
        