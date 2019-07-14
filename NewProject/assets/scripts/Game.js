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
        console.log('static')
        var newEnemy = cc.instantiate(this.StaticEnemyPrefab)
        this.node.addChild(newEnemy)
        newEnemy.setPosition(0, 0)
    },

    generateNewTrackEnemy: function () {
        console.log('track')
        var newEnemy = cc.instantiate(this.TrackEnemyPrefab);
        this.node.addChild(newEnemy);

        newEnemy.getComponent('EnemyTrack').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
        
        newEnemy.setPosition(0, 0);
    },

    generateNewSpinEnemy: function () {
        console.log('spin')
        var newEnemy = cc.instantiate(this.SpinEnemyPrefab);
        this.node.addChild(newEnemy)
        newEnemy.getComponent('EnemySpin').Player = Math.random() < 0.5 ? this.Player1 : this.Player2

        newEnemy.setPosition(0, 0);
    },

    generateNewSwingEnemy: function () {
        console.log('swing')
        var newEnemy = cc.instantiate(this.SwingEnemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(0, 0);
    },

    generateNewCopterEnemy: function () {
        console.log('copter')
        var newEnemy = cc.instantiate(this.CopterEnemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.getComponent('EnemyCopter').BulletPrefab = this.BulletPrefab
        newEnemy.getComponent('EnemyCopter').Player = Math.random() < 0.5 ? this.Player1 : this.Player2
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
        // this.generateNewStaticEnemy()
        // this.generateNewTrackEnemy()
        // this.generateNewSpinEnemy()
        // this.generateNewSwingEnemy()
        this.generateNewCopterEnemy()
        this.generateBattery()

        this.supplyTimeCounter = 0
    },

    update(dt) {
        // this.supplyTimeCounter++
        if (this.supplyTimeCounter === this.supplyTimeGap) {
            this.supplyTimeCounter = 0
            this.generateSupply()
        }
    },
});