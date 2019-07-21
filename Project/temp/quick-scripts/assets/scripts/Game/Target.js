(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Target.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e338da91QdLCJwj9NWUz5Rd', 'Target', __filename);
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
        bonus: {
            type: cc.AudioSource,
            default: null
        },
        win: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {},
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == "Player") {
            this.bonus.play();
            //TODO: 加载场景
            this.writeResult();
            this.win = true;
        }
    },
    writeResult: function writeResult() {
        var sceneName = cc.director.getScene().name;
        var data = {
            "Stage": sceneName,
            "Win": true
        };
        cc.sys.localStorage.setItem('lastStage', JSON.stringify(data));
        var temp = Number(sceneName.slice(sceneName.length - 2));
        var number = isNaN(temp) ? Number(sceneName[sceneName.length - 1]) + 1 : temp + 1;
        sceneName = 'Stage' + String(number);
        cc.sys.localStorage.setItem(sceneName, true);
    },
    update: function update(dt) {
        this.node.rotation += 1;
    }
});

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
        //# sourceMappingURL=Target.js.map
        