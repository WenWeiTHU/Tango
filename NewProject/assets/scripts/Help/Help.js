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
        Bind:{
            type: cc.Node,
            default: null
        },
        JoyStickLeft:{
            type: cc.Node,
            default: null
        },
        JoyStickRight:{
            type: cc.Node,
            default: null
        },
        Gravity:{
            type: cc.Node,
            default: null
        },
        icon:{
            type: cc.Node,
            default: null
        },
        life:{
            type: cc.Node,
            default: null
        },
        Label1:{
            type: cc.Label,
            default: null
        },
        Label2:{
            type: cc.Label,
            default: null
        },
        Label3:{
            type: cc.Label,
            default: null
        },
        Label4:{
            type: cc.Label,
            default: null
        },
        Label5:{
            type: cc.Label,
            default: null
        },
        Label6:{
            type: cc.Label,
            default: null
        },
        Label7:{
            type: cc.Label,
            default: null
        },
        Label8:{
            type: cc.Label,
            default: null
        },
        Target:{
            type: cc.Node,
            default: null
        },
        Target2:{
            type: cc.Node,
            default: null
        },
        Enemy:{
            type: cc.Prefab,
            default: null
        },
        Explode1:{
            type: cc.AudioSource,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.newDegree = 0
        this.stage = 0
        this.JoyStickLeft.children[0].on(cc.Node.EventType.TOUCH_START, function (e) {
            if(this.stage === 0){
                this.Label1.node.active = false
                this.Label2.node.active = true

                this.Target.active = true
                this.stage = 1
            }
        }, this);
    },

    showEnemy: function(){
        this.Label2.node.active = false
        this.Label3.node.active = true
        this.Label8.node.active = true
 
        let thing = cc.instantiate(this.Enemy)

        thing.getComponent('Enemy').Explode = this.Explode1
        thing.getComponent('Enemy').speedX = 0
        thing.getComponent('Enemy').speedY = 0
        this.node.addChild(thing)
        thing.setPosition(0, 0)

        // this.length = length(this.node.children)

        this.Label4.node.active = true
        this.stage = 3
    },

    showLabel: function(){
        this.Label3.node.active = false
        this.Label4.node.active = false
        this.Label5.node.active = true
        this.Target2.active = true
        this.stage = 5
    },

    showFriend: function(){
        this.Label5.node.active = false
        this.Label6.node.active = true
        this.Player2.active = true
        this.stage = 7
    },

    showBind: function(){
        this.Bind.active = true
        this.Gravity.active = true
        this.JoyStickRight.active = true
        this.Label6.node.active = false
        this.Label7.node.active = true
        this.icon.active = true
        this.life.active = true
        this.stage = 8

        let thing = cc.instantiate(this.Enemy)
        thing.getComponent('Enemy').Explode = this.Explode1
        this.node.addChild(thing)
        thing.setPosition(0, 300)
    },

    update (dt) {
        if(this.stage === 1 && cc.v2(this.Target.x - this.Player1.x, this.Target.y - this.Player1.y).mag() < 40){
            this.stage = 2
            this.Target.active = false
            this.showEnemy()
        }

        if(this.stage === 5 && cc.v2(this.Target2.x - this.Player1.x, this.Target2.y - this.Player1.y).mag() < 40){
            this.stage = 6
            this.Target2.active = false
            this.showFriend()
        }

        if(this.stage === 3 && this.node.children[11] && this.node.children[11]._name != "enemy"){
            this.stage = 4
            this.Label8.node.active = false
            this.showLabel()
        }

        if(this.stage === 7 && cc.v2(this.Player2.x - this.Player1.x, this.Player2.y - this.Player1.y).mag() < 40){
            this.stage = 8
            this.showBind()
        }

        if(this.stage === 8 && this.node.children[11] && this.node.children[11]._name != 'enemy'){
            console.log("Help stage over!")
        }

        
        this.newDegree = this.newDegree + 2
        this.newDegree = this.newDegree > 360 ? this.newDegree - 360 : this.newDegree
        if(this.Target.active){
            this.Target.rotation = this.newDegree
        }
        if(this.Target2.active){
            this.Target2.rotation = this.newDegree
        }
    },
});
