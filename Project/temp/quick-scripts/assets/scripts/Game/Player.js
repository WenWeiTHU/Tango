(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f7a7FtlSND5pp5T0lE8TP4', 'Player', __filename);
// scripts/Game/Player.js

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
        // accel: 0,       // 主角加速度
        // speedX: 0,      // 主角X方向速度
        // speedY: 0,      // 主角Y方向速度
        // resistance: 0,  // 地图阻力
        life: 3, // 主角生命
        shield: 3, // 主角护盾数
        immortalDuration: 2,
        BlastPrefab: {
            type: cc.Prefab,
            default: null
        },
        // 音效
        PlayerHit: {
            type: cc.AudioSource,
            default: null
        },
        Death: {
            type: cc.AudioSource,
            default: null
        },
        Bonus: {
            type: cc.AudioSource,
            default: null
        },
        LifeLabel: {
            type: cc.Label,
            default: null
        },
        ShieldLabel: {
            type: cc.Label,
            default: null
        },
        speed: 5,
        Dead: false
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.blastName = 'blast' + this.node.name[6];
        this.immortal = false;
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
            case 'Enemy':
                {
                    // 当碰到了敌人时
                    this.enemyCollision(other);
                    break;
                }
            case 'Supply':
                {
                    // 当碰到了补给
                    if (other.node._name === 'supply') {
                        this.life++;
                    } else if (other.node._name === 'shieldSupply') {
                        this.shield++;
                    }
                    this.Bonus.play();
                    break;
                }
            case 'Bullet':
                {
                    // 当碰到了子弹
                    var blast = cc.instantiate(this.BlastPrefab);
                    this.node.parent.addChild(blast);
                    blast.setPosition(this.node.x, this.node.y);
                    var animComponent = blast.getComponent(cc.Animation);
                    animComponent.play(this.blastName);

                    this.PlayerHit.play();

                    this.lostLife();
                    break;
                }
            default:
                {
                    // Others
                    break;
                }
        }
    },
    onCollisionStay: function onCollisionStay(other, self) {
        // 获取碰撞对象的类型
        var group = other.node.group;
        switch (group) {
            case 'Map':
                {
                    // 当碰到的是地图边界时
                    this.mapCollision(other);
                    break;
                }
            default:
                {
                    // Others
                    break;
                }
        }
    },


    lostLife: function lostLife() {
        if (!this.immortal) {
            this.life--;
            this.immortal = true;
            if (this.life < 0) {
                this.GameOver();
                return;
            }
            setTimeout(function () {
                this.immortal = false;
            }.bind(this), 1000 * this.immortalDuration);
        }
    },

    GameOver: function GameOver() {
        var sceneName = cc.director.getScene().name;
        var data = {
            "Stage": sceneName,
            "Win": false
        };
        cc.sys.localStorage.setItem('lastStage', JSON.stringify(data));
        this.Dead = true;
    },

    /*
     * 与地图的碰撞事件
     */
    mapCollision: function mapCollision(obj_map) {
        var name = obj_map.node._name;
        // 直接回弹
        switch (name) {
            case 'mapV':
                {
                    if (obj_map.node.x < this.node.x) {
                        this.node.x = this.node.x + this.speed + 1;
                    } else if (obj_map.node.x > this.node.x) {
                        this.node.x = this.node.x - this.speed - 1;
                    }

                    break;
                }
            case 'mapH':
                {
                    if (obj_map.node.y < this.node.y) {
                        this.node.y = this.node.y + this.speed + 1;
                    } else if (obj_map.node.y > this.node.y) {
                        this.node.y = this.node.y - this.speed - 1;
                    }
                }
        }
    },


    /*
     * 与敌人的碰撞事件
     */
    enemyCollision: function enemyCollision(obj_enemy) {
        var name = obj_enemy.node.name;
        switch (name) {
            // 直接回弹
            case 'battery':
                {
                    this.speedX = -this.speedX;
                    this.speedY = -this.speedY;
                    break;
                }
            // 生命减少
            case 'enemy':
            case 'enemy_static':
            case 'enemy_spin':
            case 'enemy_swing':
            case 'enemy_copter':
            case 'enemy_track':
                {
                    var blast = cc.instantiate(this.BlastPrefab);
                    this.node.parent.addChild(blast);
                    blast.setPosition(this.node.x, this.node.y);

                    var animComponent = blast.getComponent(cc.Animation);
                    animComponent.play(this.blastName);

                    this.PlayerHit.play();

                    this.lostLife();
                    break;
                }

        }
    },
    start: function start() {
        this.lifeLabel = this.LifeLabel.getComponent(cc.Label);
        this.lifeLabel.string = this.life;
        this.shieldLabel = this.ShieldLabel.getComponent(cc.Label);
        this.shieldLabel.string = this.shield;
    },
    update: function update(dt) {
        //生命值更新
        this.lifeLabel.string = this.life;
        this.shieldLabel.string = this.shield;
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
        