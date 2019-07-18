(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/GodCamera.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92507I+gfRMCoQ0idinpph1', 'GodCamera', __filename);
// scripts/Game/GodCamera.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        goToWhereX: 0,
        goToWhereY: 0,
        toWhereY: 0,
        toWhereX: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.toWhereX = -10;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.goToWhereX = 10;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.goToWhereY = 10;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.toWhereY = -10;
                        break;
                }
            },
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.toWhereX = 0;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.goToWhereX = 0;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.goToWhereY = 0;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.toWhereY = 0;
                        break;
                }
            }
        }, self.node);
    },

    goToLeft: function goToLeft() {
        this.node.runAction(cc.moveBy(0.25, cc.p(this.toWhereX, 0)));
        // this.node.x -=100;
    },

    goToRigth: function goToRigth() {
        this.node.runAction(cc.moveBy(0.25, cc.p(this.goToWhereX, 0)));
        // this.node.x +=100;
    },

    goToUp: function goToUp() {
        this.node.runAction(cc.moveBy(0.25, cc.p(0, this.goToWhereY)));
    },

    goToBottom: function goToBottom() {
        this.node.runAction(cc.moveBy(0.25, cc.p(0, this.toWhereY)));
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {

        this.goToLeft();
        this.goToRigth();
        this.goToUp();
        this.goToBottom();
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
        //# sourceMappingURL=GodCamera.js.map
        