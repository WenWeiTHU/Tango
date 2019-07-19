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
        ShieldSupplyPrefab: {
            default: null,
            type: cc.Prefab
        },
        PauseMenuPrefab: {
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
        pauseBtn: {
            type: cc.Button,
            default: null
        },
        MapCamera: {
            type: cc.Camera,
            default: null
        },
        srcX: 0,
        srcY: 0,
        dstX: 0,
        dstY: 0,
        cameraSpeed: 0,
        ratio: 0,
        Width: 2500,
        Height: 2500,
        borderSize: 35,
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
                thing.getComponent('Enemy').Explode = this.Explode1
                break
            case 'staticEnemy':
                thing = cc.instantiate(this.StaticEnemyPrefab)
                thing.getComponent('EnemyStatic').Explode = this.Explode3
                break
            case 'trackEnemy':
                thing = cc.instantiate(this.TrackEnemyPrefab)
                thing.getComponent('EnemyTrack').Explode = this.Explode1
                thing.getComponent('EnemyTrack').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'spinEnemy':
                thing = cc.instantiate(this.SpinEnemyPrefab)
                thing.getComponent('EnemySpin').Explode = this.Explode2
                thing.getComponent('EnemySpin').centerX = posX
                thing.getComponent('EnemySpin').centerY = posY

                thing.getComponent('EnemySpin').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'swingEnemy':
                thing = cc.instantiate(this.SwingEnemyPrefab)
                thing.getComponent('EnemySwing').Explode = this.Explode1
                break
            case 'copterEnemy':
                thing = cc.instantiate(this.CopterEnemyPrefab);
                thing.getComponent('EnemyCopter').BulletPrefab = this.BulletPrefab
                thing.getComponent('EnemyCopter').Explode = this.Explode2

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
        this.node.addChild(thing)
        thing.setPosition(posX, posY)
        return thing
    },


    onLoad() {
        this.pauseBtn.node.on("click", this.pauseScene, this)
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
        this.node.sortAllChildren();
    },

    start() {
        this.stateChange = false
        console.log(this.ratio)
        this.cameraMove(this.srcX, this.srcY, this.dstX, this.dstY, this.ratio)
    },

    update(dt) {
        if (this.stateChange) {
            this.pauseScene()
            this.stateChange = false
        }
    },
    pauseScene () {
        for (var child of this.node.children) {
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
    cameraMove: function(srcx, srcy, dstx, dsty, initRatio){
        this.MapCamera.node.x = srcx
        this.MapCamera.node.y = srcy

        var x = dstx - srcx
        var y = dsty - srcy

        this.scheduleOnce(function(){
            this.schedule(function(){
                if(this.MapCamera.zoomRatio > 1){
                    this.MapCamera.node.active = false
                }
                else{    
                    this.MapCamera.zoomRatio += this.cameraSpeed
                    this.MapCamera.node.x += x * this.cameraSpeed / (1 - initRatio)
                    this.MapCamera.node.y += y * this.cameraSpeed / (1 - initRatio)
                }
            }, 0.0001)
        }, 0.8)
    }
});