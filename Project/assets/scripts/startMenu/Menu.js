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
        player1: {
            type: cc.Node,
            default: null
        },
        player2: {
            type: cc.Node,
            default: null
        },
        startBtn: {
            type: cc.Button,
            default: null
        },
        bindR: {
            type: cc.Node,
            default: null
        },
        bindL: {
            type: cc.Node,
            default: null
        },
        enemyStatic: {
            type: cc.Node,
            default: null
        },
        enemySpin: {
            type: cc.Node,
            default: null
        },
        BlastPrefab1: {
            type:cc.Prefab,
            default: null,
        },
        BlastPrefab2: {
            type:cc.Prefab,
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.startBtn.node.on('click', this.startClick, this)
        this.spinDegree = 0

        var bindAnimComponent = this.bindR.getComponent(cc.Animation)
        var bindAnimState = bindAnimComponent.play('bindAnim2')
        bindAnimState.wrapMode = cc.WrapMode.Loop

        var bindAnimComponent2 = this.bindL.getComponent(cc.Animation)
        var bindAnimState2 = bindAnimComponent2.play('bindAnim2')
        bindAnimState2.wrapMode = cc.WrapMode.Loop

        this.schedule(this.explosion, 3);
    },

    startClick() {
        cc.director.loadScene("Game");
    },

    explosion: function () {
        let blast = cc.instantiate(this.BlastPrefab1)
        this.node.addChild(blast)
        blast.setPosition(this.player1.x, this.player1.y)
        let animComponent = blast.getComponent(cc.Animation)
        animComponent.play('blast1')

        let blast2 = cc.instantiate(this.BlastPrefab2)
        this.node.addChild(blast2)
        blast2.setPosition(this.player2.x, this.player2.y)
        let animComponent2 = blast2.getComponent(cc.Animation)
        animComponent2.play('blast2')
    },

    start() {

    },

    update(dt) {
        var newDegree = this.enemyStatic.rotation + (10 / Math.PI);
        this.enemyStatic.rotation = newDegree > 360 ? newDegree - 360 : newDegree
        this.enemySpin.rotation = newDegree > 360 ? newDegree - 360 : newDegree;

        this.spinDegree += 0.3
        this.spinDegree = this.spinDegree > 360 ? this.spinDegree - 360 : this.spinDegree
        this.enemySpin.x = 815 + 120 * Math.sin(this.spinDegree * Math.PI / 180)
        this.enemySpin.y = 220 + 120 * Math.cos(this.spinDegree * Math.PI / 180)
    },
});