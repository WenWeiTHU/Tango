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

    // TODO 避免重叠
    // LIFE-CYCLE CALLBACKS:
    getRandomPosition: function () {
        var maxX = this.Width / 2 - this.borderSize;
        var randX = (Math.random() - 0.5) * 2 * maxX
        var maxY = this.Height / 2 - this.borderSize
        var randY = (Math.random() - 0.5) * 2 * maxY

        return cc.v2(randX, randY)
    },

    generate: function (posX, posY, name) {
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


    onLoad() {
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
        this.pauseBtn.node.on('click', this.pauseScene, this)
    },

    start() {
        this.time = 0
        this.scheduleOnce(this.initGame, 0)
        this.schedule(this.updateTime, 1)
    },

    updateTime: function(){
        if (this.pause) {
            return
        }
        this.time += 1
        this.TimeLabel.string = 'Time: ' + this.time + 's'
    },

    initGame: function () {
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

    pauseScene () {
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

    EnemyAttack: function (time) {
        this.schedule(() => {
            for (let i = 0; i < 2; i++) {
                let pos = this.getRandomPosition()
                let thing = this.generate(pos.x, pos.y, 'enemy').getComponent('Enemy')
                thing.speedX = 400 * (Math.random() - 0.5)
                thing.speedY = 400 * (Math.random() - 0.5)
            }
        }, time)
    },

    StaticEnemyAttack: function (time) {
        this.schedule(() => {
            let pos = this.getRandomPosition()
            this.generate(pos.x, pos.y, 'staticEnemy')
        }, time)
    },

    TrackEnemyAttack: function (time) {
        this.schedule(() => {
            for (let i = 0; i < 2; i++) {
                let pos = this.getRandomPosition()
                this.generate(pos.x, pos.y, 'trackEnemy')
            }
        }, time)
    },

    SpinEnemyAttack: function (time) {
        this.schedule(() => {
            this.generate(this.Player1.x, this.Player1.y, 'spinEnemy')
            this.generate(this.Player2.x, this.Player2.y, 'spinEnemy')
        }, time)
    },

    CopterEnemyAttack: function (time) {
        this.schedule(() => {
            this.generate(this.Player1.x, this.Player1.y, 'copterEnemy')
            this.generate(this.Player2.x, this.Player2.y, 'copterEnemy')
        }, time)
    },

    SwingEnemyAttack(dir, targetposX, targetposY, num, duration){
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

    SupplyHelp: function (time) {
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

    BatteryAdd: function (time) {
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

    BatteryPowerUp: function (posx, posy, time) {
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

    update(dt) {
        if (this.stateChange) {
            this.pauseScene()
            this.stateChange = false
        }

        if (this.Player1.getComponent('Player').Dead) {
            window.Global = {
                time: this.time
            }

            this.schedule(() => {
                this.MainCamera.zoomRatio -= 0.0003
            }, 0.05)
            
            this.scheduleOnce(()=>{
                cc.director.loadScene("Transition")
            }, 2) 
        }
        if (this.Player2.getComponent('Player').Dead) {
            window.Global = {
                time: this.time
            }
            this.schedule(() => {
                this.MainCamera.zoomRatio -= 0.0003
            }, 0.05)
            
            this.scheduleOnce(()=>{
                cc.director.loadScene("Transition")
            }, 2) 
        }
    },
});