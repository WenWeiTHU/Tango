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
        supplyPrefab: {
            default: null,
            type: cc.Prefab
        },
        supplyTimeGap: 1,
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
        staticEnemyNum: 0,

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
        console.log('swing')
        var newEnemy = cc.instantiate(this.SwingEnemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(0, 0);
    },

    generateSupply: function () {
        var newSupply = cc.instantiate(this.supplyPrefab)
        this.node.addChild(newSupply)
        newSupply.setPosition(this.getNewPosition())
        newSupply.getComponent('Supply').Game = this
    },

    onLoad() {
    },

    start() {
        // this.generateNewStaticEnemy();
        // this.generateNewTrackEnemy();
        // this.generateNewSpinEnemy();
        this.generateNewSwingEnemy();

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