(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9edacm/KdxNBJfVQ66kry1A', 'Game', __filename);
// scripts/Game.js

'use strict';

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
        supplyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // mapUp:{
        //     default: null,
        //     type: cc.Prefab
        // },
        // mapDown:{
        //     default: null,
        //     type: cc.Prefab
        // },
        // mapLeft:{
        //     default: null,
        //     type: cc.Prefab
        // },
        // mapRight:{
        //     default: null,
        //     type: cc.Prefab
        // },
        supplyTimeGap: 1
    },

    // LIFE-CYCLE CALLBACKS:
    getNewPosition: function getNewPosition() {
        var maxX = this.node.width / 2;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        var maxY = this.node.height / 2;
        var randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
    },

    generateSupply: function generateSupply() {
        console.log(2);
        var newSupply = cc.instantiate(this.supplyPrefab);
        this.node.addChild(newSupply);
        newSupply.setPosition(this.getNewPosition());
        console.log(newSupply.x, newSupply.y);
        newSupply.getComponent('Supply').game = this;
    },

    onLoad: function onLoad() {
        // this.goundDown = this.mapDown + this.mapDown.height / 2
        // this.goundUp = this.mapUp - this.mapUp.height / 2
        // this.goundLeft = this.mapLeft + this.mapLeft.width / 2
        // this.goundRight = this.mapRight - this.mapRight.width / 2
    },
    start: function start() {
        this.supplyTimeCounter = 0;
    },
    update: function update(dt) {
        this.supplyTimeCounter++;
        if (this.supplyTimeCounter === this.supplyTimeGap) {
            this.supplyTimeCounter = 0;
            console.log(1);
            this.generateSupply();
        }
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
        //# sourceMappingURL=Game.js.map
        