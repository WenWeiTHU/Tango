(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/StageCamera.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f53b7ZndGpPDotOB8wswIQ3', 'StageCamera', __filename);
// scripts/Game/StageCamera.js

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
        MapCamera: {
            type: cc.Camera,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.cameraMove(2338, -206, -2, -206, 0.3);
    },


    cameraMove: function cameraMove(srcx, srcy, dstx, dsty, initRatio) {
        this.MapCamera.node.x = srcx;
        this.MapCamera.node.y = srcy;

        var x = dstx - srcx;
        var y = dsty - srcy;

        this.scheduleOnce(function () {
            this.schedule(function () {
                if (this.MapCamera.zoomRatio > 1) {
                    this.MapCamera.node.active = false;
                } else {
                    this.MapCamera.zoomRatio += 0.001;
                    this.MapCamera.node.x += x * 0.001 / (1 - initRatio);
                    this.MapCamera.node.y += y * 0.001 / (1 - initRatio);
                }
            }, 0.0001);
        }, 0.8);
    }

    // update (dt) {
    // },
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
        //# sourceMappingURL=StageCamera.js.map
        