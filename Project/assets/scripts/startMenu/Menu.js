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
        helpBtn: {
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
            type: cc.Prefab,
            default: null,
        },
        BlastPrefab2: {
            type: cc.Prefab,
            default: null,
        },
        enemySwing1: {
            type: cc.Node,
            default: null,
        },
        enemySwing2: {
            type: cc.Node,
            default: null,
        },
        bgm:{
            type: cc.AudioClip,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if(!cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.playMusic(this.bgm, true)
        }

        if( cc.sys.localStorage.length <= 1) {
            cc.sys.localStorage.setItem("Stage1", true)
            for(var i = 2; i < 13; ++i) {
                cc.sys.localStorage.setItem("Stage" + String(i), false)
            }
        }
        this.startBtn.node.on('click', function(){
            var sceneName = cc.director._loadingScene
            if (sceneName != 'Selection') {
                cc.director.loadScene('Selection')
            }
        }, this)
        this.helpBtn.node.on('click', function(){
            var sceneName = cc.director._loadingScene
            if (sceneName != 'Help') {
                cc.director.loadScene('Help')
            }
        }, this)
        this.spinDegree = 0

        var bindAnimComponent = this.bindR.getComponent(cc.Animation)
        var bindAnimState = bindAnimComponent.play('bindAnim2')
        bindAnimState.wrapMode = cc.WrapMode.Loop

        var bindAnimComponent2 = this.bindL.getComponent(cc.Animation)
        var bindAnimState2 = bindAnimComponent2.play('bindAnim2')
        bindAnimState2.wrapMode = cc.WrapMode.Loop

        var swingRight = cc.moveBy(2.0, cc.v2(this.enemySwing2.x - this.enemySwing1.x, 0)).easing(cc.easeCubicActionInOut());
        var rotate1 = cc.rotateBy(1.0 , 180)
        var rotate2 = cc.rotateBy(1.0 , -180)
        var swingLeft = cc.moveBy(2.0, cc.v2(this.enemySwing1.x - this.enemySwing2.x, 0)).easing(cc.easeCubicActionInOut())
        // 不断重复
        this.enemySwing1.runAction(cc.repeatForever(cc.sequence(swingRight, rotate1, swingLeft, rotate2)))
        this.enemySwing2.runAction(cc.repeatForever(cc.sequence(swingLeft, rotate2, swingRight, rotate1)))

        this.schedule(this.explosion, 3);
    },

    startClick() {
        var sceneName = cc.director.getScene().name
        debugger;
        if (sceneName != 'Selection') {
            cc.director.loadScene('Selection')
        }
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
        this.enemySpin.x = this.enemyStatic.x + 135 * Math.sin(this.spinDegree * Math.PI / 180)
        this.enemySpin.y = this.enemyStatic.y + 135 * Math.cos(this.spinDegree * Math.PI / 180)
    },
});