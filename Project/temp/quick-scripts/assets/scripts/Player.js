(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f7a7FtlSND5pp5T0lE8TP4', 'Player', __filename);
// scripts/Player.js

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
        accel: 0,
        speedX: 0,
        speedY: 0,
        resistance: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.conlidManager = cc.director.getCollisionManager();
        this.conlidManager.enabled = true;
    },


    /*
     * 角色的碰撞事件
     */
    onCollisionEnter: function onCollisionEnter(other, self) {
        // 获取碰撞对象的类型
        var group = other.node.group;
        switch (group) {
            case 'Map':
                {
                    // 当碰到的是地图边界时
                    this.mapCollision(other);
                    break;
                }

            // Others
        }
    },


    /*
     * 与地图的碰撞事件
     */
    mapCollision: function mapCollision(obj_map) {
        var name = obj_map.node.name;
        switch (name) {
            case 'mapLeft':
                {
                    this.speedX = -this.speedX;
                    break;
                }
            case 'mapRight':
                {
                    this.speedX = -this.speedX;
                    break;
                }
            case 'mapUp':
                {
                    this.speedY = -this.speedY;
                    break;
                }
            case 'mapDown':
                {
                    this.speedY = -this.speedY;
                    break;
                }
        }
    },
    start: function start() {},
    update: function update(dt) {
        // 运动
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;

        // 阻力
        if (this.speedX > this.resistance) {
            this.speedX -= this.speedX * 0.01;
        } else if (this.speedX < -this.resistance) {
            this.speedX -= this.speedX * 0.01;
        }

        if (this.speedY > this.resistance) {
            this.speedY -= this.speedY * 0.01;
        } else if (this.speedY < -this.resistance) {
            this.speedY -= this.speedY * 0.01;
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
        //# sourceMappingURL=Player.js.map
        