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
        
        Player1:{
            type: cc.Node,
            default: null,
        },
        Player2:{
            type: cc.Node,
            default: null,
        },
        SupplyPrefab: {
            default: null,
            type: cc.Prefab
        },
        MapVerPrefab: {
            type: cc.Prefab,
            default: null
        },
        MapHerPrefab: {
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
        BatteryPrefab: {
            type: cc.Prefab,
            default: null
        },
        BulletPrefab: {
            type: cc.Prefab,
            default: null
        },
        staticEnemyNum: 0,
        supplyTimeGap: 1,

    },

    // LIFE-CYCLE CALLBACKS:
    getNewPosition: function () {
        var maxX = this.node.width / 2;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        var maxY = this.node.height / 2;
        var randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
    },

    generateNewStaticEnemy: function () {
        var newEnemy = cc.instantiate(this.StaticEnemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(0, 0);
    },

    generateNewTrackEnemy: function () {
        console.log('track')
        var newEnemy = cc.instantiate(this.TrackEnemyPrefab);
        this.node.addChild(newEnemy);

        let random = Math.random()
        if(random < 0.5){
            newEnemy.getComponent('EnemyTrack').Player = this.Player1
        }
        else{
            newEnemy.getComponent('EnemyTrack').Player = this.Player2
        }
        
        newEnemy.setPosition(0, 0);
    },

    generateNewSpinEnemy: function () {
        console.log('spin')
        var newEnemy = cc.instantiate(this.SpinEnemyPrefab);
        this.node.addChild(newEnemy);
        var random = Math.random()
        if(random < 0.5){
            newEnemy.getComponent('EnemySpin').Player = this.Player1
        }
        else{
            newEnemy.getComponent('EnemySpin').Player = this.Player2
        }

        newEnemy.setPosition(0, 0);
    },

    generateNewSwingEnemy: function () {
        var newEnemy = cc.instantiate(this.SwingEnemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(0, 0);
    },

    generateSupply: function () {
        var newSupply = cc.instantiate(this.SupplyPrefab)
        this.node.addChild(newSupply)
        newSupply.setPosition(this.getNewPosition())
        newSupply.getComponent('Supply').Game = this
    },

    generateBattery(){
        var newBattery = cc.instantiate(this.BatteryPrefab)
        this.node.addChild(newBattery)
        newBattery.setPosition(this.getNewPosition())
        newBattery.getComponent('Battery').Player1 = this.Player1
        newBattery.getComponent('Battery').Player2 = this.Player2
        newBattery.getComponent('Battery').BulletPrefab = this.BulletPrefab
    },

    /*
     * 根据设备分辨率生成地图边界
     */
    generateMap () {
        var equipmentWidth = this.node.width
        var equipmentHeight = this.node.height

        var mapUp = cc.instantiate(this.MapHerPrefab)
        mapUp.y = (equipmentHeight + mapUp.height) / 2
        mapUp.x = 0
        mapUp.width = equipmentWidth + 10;
        mapUp.name = 'mapUp'
        
        mapUp._components[1]._size.width = equipmentWidth + 10;
        

        var mapDown = cc.instantiate(this.MapHerPrefab)
        mapDown.y = -(equipmentHeight + mapDown.height) / 2
        mapDown.x = 0
        mapDown.name = 'mapDown'
        mapDown.width = equipmentWidth + 10
        mapDown._components[1]._size.width = equipmentWidth + 10
        

        var mapLeft = cc.instantiate(this.MapVerPrefab)
        mapLeft.x = -(equipmentWidth + mapLeft.width) / 2
        mapLeft.y = 0
        mapLeft.name = 'mapLeft'
        mapLeft.height = equipmentHeight + 10
        mapLeft._components[1]._size.height = equipmentHeight + 10

        var mapRight = cc.instantiate(this.MapVerPrefab)
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
       this.scheduleOnce(this.initGame, 2);
       this.generateMap()
    },

    initGame() {
        this.generateNewStaticEnemy()
        this.generateNewTrackEnemy()
        this.generateNewSpinEnemy()
        this.generateNewSwingEnemy()
        this.generateBattery()
        this.schedule(this.generateSupply, 2)
    },

    update(dt) {
    },
});