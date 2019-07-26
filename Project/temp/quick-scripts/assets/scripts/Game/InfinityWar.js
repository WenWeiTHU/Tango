(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/InfinityWar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0312dg2YytIMZQFtUdXTEFQ', 'InfinityWar', __filename);
// scripts/Game/InfinityWar.js

'use strict';

/*
 * 生存模式控制脚本
 */
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
        PauseMenuPrefab: {
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
        Explode: {
            type: cc.AudioSource,
            default: null
        },
        TimeLabel: {
            type: cc.Label,
            default: null
        },
        pauseBtn: {
            type: cc.Button,
            default: null
        },
        MainCamera: {
            type: cc.Camera,
            default: null
        },
        Width: 2500,
        Height: 2500,
        borderSize: 45,
        stateChange: false
    },

    /*
     * 获取随机位置函数
     * 功能：获取一个随机的位置
     */
    getRandomPosition: function getRandomPosition() {
        var maxX = this.Width / 2 - this.borderSize;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        var maxY = this.Height / 2 - this.borderSize;
        var randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
    },


    /*
     * 生成函数
     * 功能：根据参数生成一个对象，是敌人或者补给或者其他
     */
    generate: function generate(posX, posY, name) {
        var thing = void 0;
        switch (name) {
            case 'enemy':
                thing = cc.instantiate(this.EnemyPrefab);
                thing.getComponent('Enemy').Explode = this.Explode;
                break;
            case 'staticEnemy':
                thing = cc.instantiate(this.StaticEnemyPrefab);
                thing.getComponent('EnemyStatic').Explode = this.Explode;
                break;
            case 'trackEnemy':
                thing = cc.instantiate(this.TrackEnemyPrefab);
                thing.getComponent('EnemyTrack').Explode = this.Explode;
                thing.getComponent('EnemyTrack').Player = Math.random() < 0.5 ? this.Player1 : this.Player2;
                break;
            case 'spinEnemy':
                thing = cc.instantiate(this.SpinEnemyPrefab);
                thing.getComponent('EnemySpin').Explode = this.Explode;
                thing.getComponent('EnemySpin').centerX = posX;
                thing.getComponent('EnemySpin').centerY = posY;

                thing.getComponent('EnemySpin').Player = Math.random() < 0.5 ? this.Player1 : this.Player2;
                break;
            case 'swingEnemy':
                thing = cc.instantiate(this.SwingEnemyPrefab);
                thing.getComponent('EnemySwing').Explode = this.Explode;
                break;
            case 'copterEnemy':
                thing = cc.instantiate(this.CopterEnemyPrefab);
                thing.getComponent('EnemyCopter').BulletPrefab = this.BulletPrefab;
                thing.getComponent('EnemyCopter').Explode = this.Explode;

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
        if (name == 'battery') {
            this.node.getChildByName('Map').addChild(thing);
        } else {
            this.node.getChildByName('Enemy').addChild(thing);
        }
        thing.setPosition(posX, posY);
        return thing;
    },


    /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
    onLoad: function onLoad() {
        // 设置对象的zIndex，保证显示层级的正确
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

        // 绑定暂停按键的回调函数
        this.pauseBtn.node.on('click', this.pauseScene, this);

        this.time = 0;
        this.scheduleOnce(this.initGame, 0);
        this.schedule(this.updateTime, 1);
    },
    start: function start() {},


    /*
     * 计时函数
     * 功能：计算玩家生存的时间，并将其更新到分数栏上
     */
    updateTime: function updateTime() {
        if (this.pause) {
            return;
        }
        this.time += 1;
        this.TimeLabel.string = 'Time: ' + this.time + 's';
    },


    /*
     * 初始化游戏场景函数
     * 功能：初始化游戏场景，生成一些敌人，
     *      并且设置定时生成敌人的时间
     */
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
            _this.StaticEnemyAttack(20);
        }, 2);

        this.scheduleOnce(function () {
            _this.TrackEnemyAttack(12);
        }, 10);

        this.scheduleOnce(function () {
            _this.SpinEnemyAttack(13);
        }, 20);

        this.scheduleOnce(function () {
            _this.BatteryPowerUp(0, 0, 30);
        }, 45);

        this.scheduleOnce(function () {
            _this.CopterEnemyAttack(15);
        }, 60);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('x', 2200, 0, 10, 6);
        }, 80);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('y', 0, 2200, 10, 6);
        }, 100);

        this.scheduleOnce(function () {
            _this.BatteryAdd(60);
        }, 120);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('x', 1100, 1100, 20, 6);
        }, 300);

        this.scheduleOnce(function () {
            _this.SwingEnemyAttack('y', -1100, 1100, 20, 6);
        }, 330);
    },


    /*
     * 暂停场景函数
     * 功能：暂停/恢复场景内容
     */
    pauseScene: function pauseScene() {
        // 此函数与Game.js相同，可参考Game.js中的pauseScene函数
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                debugger;
                switch (child.name) {
                    case 'Enemy':
                    case 'Map':
                    case 'player1':
                    case 'player2':
                    case 'bind':
                    case 'target':
                        {
                            child.active = this.pause;
                        }
                    case 'UI':
                        {
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = child.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var grandSon = _step2.value;

                                    if (grandSon.group != 'Shield') {
                                        grandSon.active = this.pause;
                                    } else {
                                        if (!this.pause) {
                                            grandSon.exist = grandSon.active;
                                            grandSon.active = false;
                                            if (grandSon.timeID) {
                                                clearTimeout(grandSon.timeID);
                                                grandSon.timeID = undefined;
                                            }
                                        } else {
                                            grandSon.active = grandSon.exist;
                                            grandSon.exist = false;
                                            if (grandSon.active) {
                                                if (grandSon.name == 'shieldLeft') {
                                                    grandSon.timeID = setTimeout(function () {
                                                        this.active = false;
                                                    }.bind(this.node.getChildByName('UI').getChildByName('shieldLeft')), 2500);
                                                } else {
                                                    grandSon.timeID = setTimeout(function () {
                                                        this.active = false;
                                                    }.bind(this.node.getChildByName('UI').getChildByName('shieldRight')), 2500);
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }

                            break;
                        }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.pause = this.pause ? false : true;
        if (this.pause) {
            var Menu = cc.instantiate(this.PauseMenuPrefab);
            Menu.x = 0;
            Menu.y = 0;
            Menu.group = 'UI';
            this.node.getChildByName('UI').active = true;
            this.node.getChildByName("UI").addChild(Menu);
        }
    },


    /*
     * 定时生成enemy
     * 功能：根据给定的时间间隔，生成2个普通的enemy
     */
    EnemyAttack: function EnemyAttack(time) {
        var _this2 = this;

        this.schedule(function () {
            for (var i = 0; i < 2; i++) {
                var pos = _this2.getRandomPosition();
                var thing = _this2.generate(pos.x, pos.y, 'enemy').getComponent('Enemy');
                thing.speedX = 400 * (Math.random() - 0.5);
                thing.speedY = 400 * (Math.random() - 0.5);
            }
        }, time);
    },


    /*
     * 生成静态敌人函数
     * 功能：根据给定的时间间隔，生成静态敌人
     */
    StaticEnemyAttack: function StaticEnemyAttack(time) {
        var _this3 = this;

        this.schedule(function () {
            var pos = _this3.getRandomPosition();
            _this3.generate(pos.x, pos.y, 'staticEnemy');
        }, time);
    },


    /*
     * 生成追踪敌人函数
     * 功能：根据给定的时间间隔，生成追踪型敌人
     */
    TrackEnemyAttack: function TrackEnemyAttack(time) {
        var _this4 = this;

        this.schedule(function () {
            for (var i = 0; i < 2; i++) {
                var pos = _this4.getRandomPosition();
                _this4.generate(pos.x, pos.y, 'trackEnemy');
            }
        }, time);
    },


    /*
     * 生成旋转敌人函数
     * 功能：根据给定的时间间隔，生成旋转型敌人
     */
    SpinEnemyAttact: function SpinEnemyAttact(time) {
        var _this5 = this;

        this.schedule(function () {
            _this5.generate(_this5.Player1.x, _this5.Player1.y, 'spinEnemy');
            _this5.generate(_this5.Player2.x, _this5.Player2.y, 'spinEnemy');
        }, time);
    },


    /*
     * 直升机敌人生成函数
     * 功能：根据给定的时间间隔，生成直升机敌人
     */
    CopterEnemyAttack: function CopterEnemyAttack(time) {
        var _this6 = this;

        this.schedule(function () {
            _this6.generate(_this6.Player1.x, _this6.Player1.y, 'copterEnemy');
            _this6.generate(_this6.Player2.x, _this6.Player2.y, 'copterEnemy');
        }, time);
    },


    /*
     * 生成往返敌人函数
     * 功能：根据给定的参数和时间间隔，生成往返敌人
     */
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


    /*
     * 生成补集函数
     * 功能：根据给定的时间间隔产生补集
     */
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


    /*
     * 生成炮台函数
     * 功能：根据给定的时间间隔，生成炮台
     */
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


    /*
     * 炮台死亡函数
     * 功能：计时炮台寿命，当炮台寿命到期后则销毁
     */
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


    /*
     * 游戏结束函数
     * 功能：向本地储存中写入游戏结果，并准备加载下一场景
     */
    GameOver: function GameOver() {
        var _this11 = this;

        cc.sys.localStorage.setItem('SurviveScore', String(this.time));
        this.schedule(function () {
            _this11.MainCamera.zoomRatio -= 0.0003;
        }, 0.05);

        this.scheduleOnce(function () {
            var sceneName = cc.director._loadingScene;
            if (sceneName != 'Transition_INF') {
                cc.director.loadScene("Transition_INF");
            }
        }, 2);
    },


    // 系统调用的更新函数，与Game.js中的更新函数相同
    update: function update(dt) {
        if (this.stateChange) {
            this.pauseScene();
            this.stateChange = false;
        }

        if (this.Player1.getComponent('Player').Dead) {
            this.GameOver();
            return;
        }
        if (this.Player2.getComponent('Player').Dead) {
            this.GameOver();
            return;
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
        //# sourceMappingURL=InfinityWar.js.map
        