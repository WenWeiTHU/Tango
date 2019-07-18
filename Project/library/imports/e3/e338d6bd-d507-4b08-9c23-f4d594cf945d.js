"use strict";
cc._RF.push(module, 'e338da91QdLCJwj9NWUz5Rd', 'Target');
// scripts/Game/Target.js

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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {},
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == "Player") {
            //TODO: 加载场景
            cc.director.loadScene("Transition");
            this.writeResult();
        }
    },
    writeResult: function writeResult() {
        var sceneName = cc.director.getScene().name;
        var data = {
            "Stage": sceneName,
            "Win": true
        };
        cc.sys.localStorage.setItem('lastStage', JSON.stringify(data));
        var number = Number(sceneName[sceneName.length - 1]) + 1;
        sceneName = 'Stage' + String(number);
        cc.sys.localStorage.setItem(sceneName, true);
    }
    // update (dt) {},

});

cc._RF.pop();