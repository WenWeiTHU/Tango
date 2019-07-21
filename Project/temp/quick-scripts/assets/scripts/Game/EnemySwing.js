(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/EnemySwing.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3cbb76JyBtC14/Hlo9NPPC0', 'EnemySwing', __filename);
// scripts/Game/EnemySwing.js

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
    extends: require("Enemy"),

    properties: {
        swingDuration: 0,
        rotateDuration: 0,
        targetPosX: 0,
        targetPosY: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},


    setSwingAction: function setSwingAction() {
        if (this.targetPosX === 0) {
            this.targetPosX = 1;
        }
        this.node.rotation = 90 - 180 * Math.atan(this.targetPosY / this.targetPosX) / Math.PI;

        var swingUp = cc.moveBy(this.swingDuration, cc.v2(this.targetPosX, this.targetPosY)).easing(cc.easeCubicActionInOut());
        var rotate = cc.rotateBy(this.rotateDuration, 180);
        var swingDown = cc.moveBy(this.swingDuration, cc.v2(-this.targetPosX, -this.targetPosY)).easing(cc.easeCubicActionInOut());
        var rotate = cc.rotateBy(this.rotateDuration, 180);
        // 不断重复
        return cc.repeatForever(cc.sequence(swingUp, rotate, swingDown, rotate));
    },

    start: function start() {
        cc.director.getCollisionManager().enabled = true;

        this.swingAction = this.setSwingAction();
        this.node.runAction(this.swingAction);
    }
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
        //# sourceMappingURL=EnemySwing.js.map
        