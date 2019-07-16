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
        Explode1:{
            type: cc.AudioSource,
            default: null
        },
        Explode2:{
            type: cc.AudioSource,
            default: null
        },
        Explode3:{
            type: cc.AudioSource,
            default: null
        },
        borderSize: 35,
    },

    // TODO 避免重叠
    // LIFE-CYCLE CALLBACKS:
    getRandomPosition: function () {
        var maxX = this.node.width / 2 - this.borderSize;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        var maxY = this.node.height / 2 - this.borderSize;
        var randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
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
                thing.getComponent('EnemySpin').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'swingEnemy':
                thing = cc.instantiate(this.SwingEnemyPrefab)
                thing.getComponent('EnemySwing').Explode = this.Explode1
                thing.getComponent('EnemySwing').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
                break
            case 'copterEnemy':
                thing = cc.instantiate(this.CopterEnemyPrefab);
                thing.getComponent('EnemyCopter').BulletPrefab = this.BulletPrefab
                thing.getComponent('EnemyCopter').Explode = this.Explode2
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
    },

    /*
     * 根据设备分辨率生成地图边界
     */
    generateMap () {
        var equipmentWidth = this.node.width
        var equipmentHeight = this.node.height

        var mapUp = cc.instantiate(this.MapHPrefab)
        mapUp.y = (equipmentHeight + mapUp.height) / 2
        mapUp.x = 0
        mapUp.width = equipmentWidth + 10;
        mapUp.name = 'mapUp'
        
        mapUp._components[1]._size.width = equipmentWidth + 10;
        

        var mapDown = cc.instantiate(this.MapHPrefab)
        mapDown.y = -(equipmentHeight + mapDown.height) / 2
        mapDown.x = 0
        mapDown.name = 'mapDown'
        mapDown.width = equipmentWidth + 10
        mapDown._components[1]._size.width = equipmentWidth + 10
        

        var mapLeft = cc.instantiate(this.MapVPrefab)
        mapLeft.x = -(equipmentWidth + mapLeft.width) / 2
        mapLeft.y = 0
        mapLeft.name = 'mapLeft'
        mapLeft.height = equipmentHeight + 10
        mapLeft._components[1]._size.height = equipmentHeight + 10

        var mapRight = cc.instantiate(this.MapVPrefab)
        mapRight.x = (equipmentWidth + mapRight.width) / 2
        mapRight.y = 0
        mapRight.name = 'mapRight'
        mapRight.height = equipmentHeight + 10
        mapRight._components[1]._size.height = equipmentHeight + 10

        this.node.addChild(mapUp)
        this.node.addChild(mapDown)
        this.node.addChild(mapLeft)
        this.node.addChild(mapRight)
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
        this.node.sortAllChildren();
    },

    start() {
        this.scheduleOnce(this.initGame, 0);
        this.generateMap()
    },

    initGame: function () {
        this.generate(0, 0, 'enemy')
        this.generate(200, 200, 'staticEnemy')
        this.generate(-200, 200, 'copterEnemy')
        this.generate(200, -200, 'spinEnemy')
        this.generate(300, 300, 'swingEnemy')
        this.generate(500, 500, 'trackEnemy')
        this.generate(-400, 400, 'battery')
        this.generate(-400, -400, 'shieldSupply')
        this.generate(-300, -400, 'supply')



        // this.schedule(() => {
        //     let pos = this.getRandomPosition()
        //     this.generate(pos.x, pos.y, 'supply')
        // }, this.supplyInterval)
    },

    update(dt) {

    },
});