/*
 * 生存模式控制脚本
 */
cc.Class({
    extends: cc.Component,

    properties: {
        Player1: {
            type: cc.Node,
            default: null,
        },
        Player2: {
            type: cc.Node,
            default: null,
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
        Explode:{
            type: cc.AudioSource,
            default: null
        },
        TimeLabel:{
            type: cc.Label, 
            default: null
        },
        pauseBtn: {
            type: cc.Button,
            default: null
        },
        MainCamera:{
            type: cc.Camera,
            default: null
        },
        Width: 2500,
        Height: 2500,
        borderSize: 45,
        stateChange: false,
    },

    /*
     * 获取随机位置函数
     * 功能：获取一个随机的位置
     */
    getRandomPosition () {
        var maxX = this.Width / 2 - this.borderSize;
        var randX = (Math.random() - 0.5) * 2 * maxX
        var maxY = this.Height / 2 - this.borderSize
        var randY = (Math.random() - 0.5) * 2 * maxY

        return cc.v2(randX, randY)
    },

    /*
     * 生成函数
     * 功能：根据参数生成一个对象，是敌人或者补给或者其他
     */
    generate (posX, posY, name) {
        let thing
        switch (name) {
            case 'enemy':
                thing = cc.instantiate(this.EnemyPrefab)
                thing.getComponent('Enemy').Explode = this.Explode
                break
            case 'staticEnemy':
                thing = cc.instantiate(this.StaticEnemyPrefab)
                thing.getComponent('EnemyStatic').Explode = this.Explode
                break
            case 'trackEnemy':
                thing = cc.instantiate(this.TrackEnemyPrefab)
                thing.getComponent('EnemyTrack').Explode = this.Explode
                thing.getComponent('EnemyTrack').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'spinEnemy':
                thing = cc.instantiate(this.SpinEnemyPrefab)
                thing.getComponent('EnemySpin').Explode = this.Explode
                thing.getComponent('EnemySpin').centerX = posX
                thing.getComponent('EnemySpin').centerY = posY

                thing.getComponent('EnemySpin').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'swingEnemy':
                thing = cc.instantiate(this.SwingEnemyPrefab)
                thing.getComponent('EnemySwing').Explode = this.Explode
                break
            case 'copterEnemy':
                thing = cc.instantiate(this.CopterEnemyPrefab);
                thing.getComponent('EnemyCopter').BulletPrefab = this.BulletPrefab
                thing.getComponent('EnemyCopter').Explode = this.Explode

                thing.getComponent('EnemySpin').centerX = posX
                thing.getComponent('EnemySpin').centerY = posY

                thing.getComponent('EnemyCopter').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'supply':
                thing = cc.instantiate(this.SupplyPrefab)
                break
            case 'shieldSupply':
                thing = cc.instantiate(this.ShieldSupplyPrefab)
                break
            case 'battery':
                thing = cc.instantiate(this.BatteryPrefab)
                thing.getComponent('Battery').Player1 = this.Player1
                thing.getComponent('Battery').Player2 = this.Player2
                thing.getComponent('Battery').BulletPrefab = this.BulletPrefab
                break
        }
        if (name == 'battery') {
            this.node.getChildByName('Map').addChild(thing)
        } else {
            this.node.getChildByName('Enemy').addChild(thing)
        }
        thing.setPosition(posX, posY)
        return thing
    },


    /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
    onLoad() {
        // 设置对象的zIndex，保证显示层级的正确
        for (var i = 0; i < this.node.children.length; ++i) {
            switch (this.node.children[i].name) {
                case 'player1': {
                    this.node.children[i].zIndex = 100;
                    break;
                }
                case 'player2': {
                    this.node.children[i].zIndex = 100;
                    break;
                }
                case 'stickLeft':
                case 'stickRight': {
                    this.node.children[i].zIndex = 101;
                    break;
                }
                case 'bg': {
                    this.node.children[i].zIndex = -100;
                    break;
                }
            }
        }
        this.node.sortAllChildren()
        
        // 绑定暂停按键的回调函数
        this.pauseBtn.node.on('click', this.pauseScene, this)

        
        this.time = 0
        this.scheduleOnce(this.initGame, 0)
        this.schedule(this.updateTime, 1)
    },

    start() {
        
    },

    /*
     * 计时函数
     * 功能：计算玩家生存的时间，并将其更新到分数栏上
     */
    updateTime () {
        if (this.pause) {
            return
        }
        this.time += 1
        this.TimeLabel.string = 'Time: ' + this.time + 's'
    },

    /*
     * 初始化游戏场景函数
     * 功能：初始化游戏场景，生成一些敌人，
     *      并且设置定时生成敌人的时间
     */
    initGame () {
        this.generate(-500, 500, 'enemy')
        this.generate(500, 500, 'enemy')
        this.generate(500, -500, 'enemy')
        this.generate(-500, -500, 'enemy')

        this.generate(0, 0, 'supply')

        this.SupplyHelp(20)

        this.EnemyAttack(8)

        this.scheduleOnce(() => {
            this.StaticEnemyAttack(20)
        }, 2)

        this.scheduleOnce(() => {
            this.TrackEnemyAttack(12)
        }, 10)
        
        this.scheduleOnce(() => {
            this.SpinEnemyAttack(13)
        }, 20)

        this.scheduleOnce(() => {
            this.BatteryPowerUp(0, 0, 30)
        }, 45)

        this.scheduleOnce(() => {
            this.CopterEnemyAttack(15)
        }, 60)

        this.scheduleOnce(() => {
            this.SwingEnemyAttack('x', 2200, 0, 10 , 6)
        }, 80)

        this.scheduleOnce(() => {
            this.SwingEnemyAttack('y', 0, 2200 ,10 , 6)
        }, 100)

        this.scheduleOnce(() => {
            this.BatteryAdd(60)
        }, 120)

        this.scheduleOnce(() => {
            this.SwingEnemyAttack('x', 1100, 1100 ,20 , 6)
        }, 300)

        this.scheduleOnce(() => {
            this.SwingEnemyAttack('y', -1100, 1100 ,20 , 6)
        }, 330)
    },

    /*
     * 暂停场景函数
     * 功能：暂停/恢复场景内容
     */
    pauseScene () {
        // 此函数与Game.js相同，可参考Game.js中的pauseScene函数
        for (var child of this.node.children) {
            debugger;
            switch (child.name) {
                case 'Enemy':
                case 'Map':
                case 'player1':
                case 'player2':
                case 'bind':
                case 'target': {
                    child.active = this.pause
                }
                case 'UI': {
                    for (var grandSon of child.children) {
                        if (grandSon.group != 'Shield') {
                            grandSon.active = this.pause
                        } else {
                            if (!this.pause) {
                                grandSon.exist = grandSon.active
                                grandSon.active = false
                                if (grandSon.timeID) {
                                    clearTimeout(grandSon.timeID)
                                    grandSon.timeID = undefined
                                }
                            } else {
                                grandSon.active = grandSon.exist
                                grandSon.exist = false
                                if (grandSon.active) {
                                    if (grandSon.name == 'shieldLeft') {
                                        grandSon.timeID = setTimeout(function(){
                                            this.active = false
                                        }.bind(this.node.getChildByName('UI').getChildByName('shieldLeft')), 2500)
                                    }
                                    else {
                                        grandSon.timeID = setTimeout(function(){
                                            this.active = false
                                        }.bind(this.node.getChildByName('UI').getChildByName('shieldRight')), 2500)
                                    }
                                }
                            }
                        }
                    }
                    break
                }
            }
        }
        this.pause = this.pause ? false : true
        if (this.pause) {
            var Menu = cc.instantiate(this.PauseMenuPrefab)
            Menu.x = 0
            Menu.y = 0
            Menu.group = 'UI'
            this.node.getChildByName('UI').active = true
            this.node.getChildByName("UI").addChild(Menu)
        }
    },

    /*
     * 定时生成enemy
     * 功能：根据给定的时间间隔，生成2个普通的enemy
     */
    EnemyAttack (time) {
        this.schedule(() => {
            for (let i = 0; i < 2; i++) {
                let pos = this.getRandomPosition()
                let thing = this.generate(pos.x, pos.y, 'enemy').getComponent('Enemy')
                thing.speedX = 400 * (Math.random() - 0.5)
                thing.speedY = 400 * (Math.random() - 0.5)
            }
        }, time)
    },

    /*
     * 生成静态敌人函数
     * 功能：根据给定的时间间隔，生成静态敌人
     */
    StaticEnemyAttack (time) {
        this.schedule(() => {
            let pos = this.getRandomPosition()
            this.generate(pos.x, pos.y, 'staticEnemy')
        }, time)
    },

    /*
     * 生成追踪敌人函数
     * 功能：根据给定的时间间隔，生成追踪型敌人
     */
    TrackEnemyAttack (time) {
        this.schedule(() => {
            for (let i = 0; i < 2; i++) {
                let pos = this.getRandomPosition()
                this.generate(pos.x, pos.y, 'trackEnemy')
            }
        }, time)
    },

    /*
     * 生成旋转敌人函数
     * 功能：根据给定的时间间隔，生成旋转型敌人
     */
    SpinEnemyAttact (time) {
        this.schedule(() => {
            this.generate(this.Player1.x, this.Player1.y, 'spinEnemy')
            this.generate(this.Player2.x, this.Player2.y, 'spinEnemy')
        }, time)
    },


    /*
     * 直升机敌人生成函数
     * 功能：根据给定的时间间隔，生成直升机敌人
     */
    CopterEnemyAttack (time) {
        this.schedule(() => {
            this.generate(this.Player1.x, this.Player1.y, 'copterEnemy')
            this.generate(this.Player2.x, this.Player2.y, 'copterEnemy')
        }, time)
    },

    /*
     * 生成往返敌人函数
     * 功能：根据给定的参数和时间间隔，生成往返敌人
     */
    SwingEnemyAttack (dir, targetposX, targetposY, num, duration) {
        this.scheduleOnce(() => {
            for (let i = -1100; i < 1100; i += 2200 / (num  - 1)) {
                let thing
                if(dir === 'x'){
                    thing = this.generate(-1100, i, 'swingEnemy').getComponent('EnemySwing')
                }
                else if(dir === 'y'){
                    thing = this.generate(i, -1100, 'swingEnemy').getComponent('EnemySwing')
                }
                
                thing.targetPosX = targetposX
                thing.targetPosY = targetposY
                thing.swingDuration = duration
            }
        }, 0)
    },

    /*
     * 生成补集函数
     * 功能：根据给定的时间间隔产生补集
     */
    SupplyHelp (time) {
        this.schedule(() => {
            let pos = this.getRandomPosition()
            let num = Math.random()
            if (num > 0.5) {
                this.generate(pos.x, pos.y, 'shieldSupply')
            } else {
                this.generate(pos.x, pos.y, 'supply')
            }
        }, time)
    },

    /*
     * 生成炮台函数
     * 功能：根据给定的时间间隔，生成炮台
     */
    BatteryAdd (time) {
        this.scheduleOnce(() => {
            this.generate(1100, 1100, 'battery')
            this.scheduleOnce(() => {
                this.generate(1100, -1100, 'battery')
                this.scheduleOnce(() => {
                    this.generate(-1100, -1100, 'battery')
                }, time)
            }, time)
        }, time)
    },

    /*
     * 炮台死亡函数
     * 功能：计时炮台寿命，当炮台寿命到期后则销毁
     */
    BatteryPowerUp (posx, posy, time) {
        this.scheduleOnce(() => {
            var Battery = this.generate(posx, posy, 'battery').getComponent('Battery')
            Battery.shootNum = 1
            this.scheduleOnce(() => {
                Battery.shootNum = 2
                this.scheduleOnce(() => {
                    Battery.shootNum = 3
                    this.scheduleOnce(() => {
                        Battery.shootNum = 4
                    }, time)
                }, time)
            }, time)
        }, time)
    },

    /*
     * 游戏结束函数
     * 功能：向本地储存中写入游戏结果，并准备加载下一场景
     */
    GameOver () {
        cc.sys.localStorage.setItem('SurviveScore', String(this.time))
            this.schedule(() => {
                this.MainCamera.zoomRatio -= 0.0003
            }, 0.05)
            
            this.scheduleOnce(()=>{
                var sceneName = cc.director._loadingScene
                if (sceneName != 'Transition_INF') {
                    cc.director.loadScene("Transition_INF")
                }
            }, 2) 
    },

    // 系统调用的更新函数，与Game.js中的更新函数相同
    update(dt) {
        if (this.stateChange) {
            this.pauseScene()
            this.stateChange = false
        }

        if (this.Player1.getComponent('Player').Dead) {
            this.GameOver()
            return
        }
        if (this.Player2.getComponent('Player').Dead) {
            this.GameOver()
            return
        }
    },
});