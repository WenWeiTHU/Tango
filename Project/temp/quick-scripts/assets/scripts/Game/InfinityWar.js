(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/InfinityWar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0312dg2YytIMZQFtUdXTEFQ', 'InfinityWar', __filename);
// scripts/Game/InfinityWar.js

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
        Player1: {
            type: cc.Node,
            default: null
        },
        Player2: {
            type: cc.Node,
            default: null
        },
        SupplyPrefab: {
            default: null,
            type: cc.Prefab
        },
        ShieldSupplyPrefab: {
            default: null,
            type: cc.Prefab
        },
        EnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        StaticEnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        TrackEnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        SpinEnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        SwingEnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        CopterEnemyPrefab: {
            type: cc.Prefab,
            default: null
        },
        BatteryPrefab: {
            type: cc.Prefab,
            default: null
        },
        BulletPrefab: {
            type: cc.Prefab,
            default: null
        },
        MapVPrefab: {
            type: cc.Prefab,
            default: null
        },
        MapHPrefab: {
            type: cc.Prefab,
            default: null
        },
        Explode1: {
            type: cc.AudioSource,
            default: null
        },
        Explode2: {
            type: cc.AudioSource,
            default: null
        },
        Explode3: {
            type: cc.AudioSource,
            default: null
        },
        Width: 2500,
        Height: 2500,
        borderSize: 35
    },

    // TODO 避免重叠
    // LIFE-CYCLE CALLBACKS:
    getRandomPosition: function getRandomPosition() {
        var maxX = this.Width / 2 - this.borderSize;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        var maxY = this.Height / 2 - this.borderSize;
        var randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
    },

    generate: function generate(posX, posY, name) {
        var thing = void 0;
        switch (name) {
            case 'enemy':
                thing = cc.instantiate(this.EnemyPrefab);
                thing.getComponent('Enemy').Explode = this.Explode1;
                break;
            case 'staticEnemy':
                thing = cc.instantiate(this.StaticEnemyPrefab);
                thing.getComponent('EnemyStatic').Explode = this.Explode3;
                break;
            case 'trackEnemy':
                thing = cc.instantiate(this.TrackEnemyPrefab);
                thing.getComponent('EnemyTrack').Explode = this.Explode1;
                thing.getComponent('EnemyTrack').Player = Math.random() < 0.5 ? this.Player1 : this.Player2;
                break;
            case 'spinEnemy':
                thing = cc.instantiate(this.SpinEnemyPrefab);
                thing.getComponent('EnemySpin').Explode = this.Explode2;
                thing.getComponent('EnemySpin').centerX = posX;
                thing.getComponent('EnemySpin').centerY = posY;

                thing.getComponent('EnemySpin').Player = Math.random() < 0.5 ? this.Player1 : this.Player2;
                break;
            case 'swingEnemy':
                thing = cc.instantiate(this.SwingEnemyPrefab);
                thing.getComponent('EnemySwing').Explode = this.Explode1;
                break;
            case 'copterEnemy':
                thing = cc.instantiate(this.CopterEnemyPrefab);
                thing.getComponent('EnemyCopter').BulletPrefab = this.BulletPrefab;
                thing.getComponent('EnemyCopter').Explode = this.Explode2;

                thing.getComponent('EnemySpin').centerX = posX;
                thing.getComponent('EnemySpin').centerY = posY;

                thing.getComponent('EnemyCopter').Player = Math.random() < 0.5 ? this.Player1 : this.Player2;
                break;
            case 'supply':
                thing = cc.instantiate(this.SupplyPrefab);
                break;
            case 'shieldSupply':
                thing = cc.instantiate(this.ShieldSupplyPrefab);
                break;
            case 'battery':
                thing = cc.instantiate(this.BatteryPrefab);
                thing.getComponent('Battery').Player1 = this.Player1;
                thing.getComponent('Battery').Player2 = this.Player2;
                thing.getComponent('Battery').BulletPrefab = this.BulletPrefab;
                break;
        }
        this.node.addChild(thing);
        thing.setPosition(posX, posY);
        return thing;
    },

    onLoad: function onLoad() {
        for (var i = 0; i < this.node.children.length; ++i) {
            switch (this.node.children[i].name) {
                case 'player1':
                    {
                        this.node.children[i].zIndex = 100;
                        break;
                    }
                case 'player2':
                    {
                        this.node.children[i].zIndex = 100;
                        break;
                    }
                case 'stickLeft':
                case 'stickRight':
                    {
                        this.node.children[i].zIndex = 101;
                        break;
                    }
                case 'bg':
                    {
                        this.node.children[i].zIndex = -100;
                        break;
                    }
            }
        }
        this.node.sortAllChildren();
    },
    start: function start() {
        this.scheduleOnce(this.initGame, 0);
        // this.generateMap()
    },


    initGame: function initGame() {
        var _this = this;

        this.generate(-500, 500, 'enemy');
        this.generate(500, 500, 'enemy');
        this.generate(500, -500, 'enemy');
        this.generate(-500, -500, 'enemy');

        this.generate(0, 0, 'supply');

        this.SupplyHelp(20);

        this.EnemyAttack(8);

        this.scheduleOnce(function () {
            _this.StaticEnemyAttack(15);
        }, 2);

        this.scheduleOnce(function () {
            _this.TrackEnemyAttack(9);
        }, 15);

        this.scheduleOnce(function () {
            _this.SpinEnemyAttack(13);
        }, 32);

        this.scheduleOnce(function () {
            _this.BatteryPowerUp(0, 0, 30);
        }, 60);

        this.scheduleOnce(function () {
            _this.CopterEnemyAttack(15);
        }, 70);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('x', 2200, 0, 10, 6);
        }, 120);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('y', 0, 2200, 10, 6);
        }, 180);

        this.scheduleOnce(function () {
            _this.BatteryAdd(60);
        }, 150);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('x', 1100, 1100, 20, 6);
        }, 600);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('y', -1100, 1100, 20, 6);
        }, 630);
    },

    EnemyAttack: function EnemyAttack(time) {
        var _this2 = this;

        this.schedule(function () {
            for (var i = 0; i < 3; i++) {
                var pos = _this2.getRandomPosition();
                var thing = _this2.generate(pos.x, pos.y, 'enemy').getComponent('Enemy');
                thing.speedX = 400 * (Math.random() - 0.5);
                thing.speedY = 400 * (Math.random() - 0.5);
            }
        }, time);
    },

    StaticEnemyAttack: function StaticEnemyAttack(time) {
        var _this3 = this;

        this.schedule(function () {
            var pos = _this3.getRandomPosition();
            _this3.generate(pos.x, pos.y, 'staticEnemy');
        }, time);
    },

    TrackEnemyAttack: function TrackEnemyAttack(time) {
        var _this4 = this;

        this.schedule(function () {
            for (var i = 0; i < 3; i++) {
                var pos = _this4.getRandomPosition();
                _this4.generate(pos.x, pos.y, 'trackEnemy');
            }
        }, time);
    },

    SpinEnemyAttack: function SpinEnemyAttack(time) {
        var _this5 = this;

        this.schedule(function () {
            _this5.generate(_this5.Player1.x, _this5.Player1.y, 'spinEnemy');
            _this5.generate(_this5.Player2.x, _this5.Player2.y, 'spinEnemy');
        }, time);
    },

    CopterEnemyAttack: function CopterEnemyAttack(time) {
        var _this6 = this;

        this.schedule(function () {
            _this6.generate(_this6.Player1.x, _this6.Player1.y, 'copterEnemy');
            _this6.generate(_this6.Player2.x, _this6.Player2.y, 'copterEnemy');
        }, time);
    },

    SwingEnemyAttack: function SwingEnemyAttack(dir, targetposX, targetposY, num, duration) {
        var _this7 = this;

        this.scheduleOnce(function () {
            for (var i = -1100; i < 1100; i += 2200 / (num - 1)) {
                var thing = void 0;
                if (dir === 'x') {
                    thing = _this7.generate(-1100, i, 'swingEnemy').getComponent('EnemySwing');
                } else if (dir === 'y') {
                    thing = _this7.generate(i, -1100, 'swingEnemy').getComponent('EnemySwing');
                }

                thing.targetPosX = targetposX;
                thing.targetPosY = targetposY;
                thing.swingDuration = duration;
            }
        }, 0);
    },


    SupplyHelp: function SupplyHelp(time) {
        var _this8 = this;

        this.schedule(function () {
            var pos = _this8.getRandomPosition();
            var num = Math.random();
            if (num > 0.5) {
                _this8.generate(pos.x, pos.y, 'shieldSupply');
            } else {
                _this8.generate(pos.x, pos.y, 'supply');
            }
        }, time);
    },

    BatteryAdd: function BatteryAdd(time) {
        var _this9 = this;

        this.scheduleOnce(function () {
            _this9.generate(1100, 1100, 'battery');
            _this9.scheduleOnce(function () {
                _this9.generate(1100, -1100, 'battery');
                _this9.scheduleOnce(function () {
                    _this9.generate(-1100, -1100, 'battery');
                }, time);
            }, time);
        }, time);
    },

    BatteryPowerUp: function BatteryPowerUp(posx, posy, time) {
        var _this10 = this;

        this.scheduleOnce(function () {
            var Battery = _this10.generate(posx, posy, 'battery').getComponent('Battery');
            Battery.shootNum = 1;
            _this10.scheduleOnce(function () {
                Battery.shootNum = 2;
                _this10.scheduleOnce(function () {
                    Battery.shootNum = 3;
                    _this10.scheduleOnce(function () {
                        Battery.shootNum = 4;
                    }, time);
                }, time);
            }, time);
        }, time);
    },

    update: function update(dt) {}
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
        //# sourceMappingURL=InfinityWar.js.map
        