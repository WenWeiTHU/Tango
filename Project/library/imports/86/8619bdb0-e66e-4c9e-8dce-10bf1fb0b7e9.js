"use strict";
cc._RF.push(module, '8619b2w5m5Mno3OEL8fsLfp', 'End');
// scripts/Game/End.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        MainCamera: {
            type: cc.Camera,
            default: null
        }
    },

    start: function start() {
        this.end = false;
    },
    update: function update(dt) {
        if (this.MainCamera.node.y >= -3770) {
            this.MainCamera.node.y -= 1.4;
        } else if (!this.end && this.MainCamera.node.y < -3770) {
            this.end = true;
            this.scheduleOnce(function () {
                cc.director.loadScene('beginMenu');
            }, 3);
        }
    }
});

cc._RF.pop();