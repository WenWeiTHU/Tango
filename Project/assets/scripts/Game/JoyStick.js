/*
 * 控制杆脚本
 */

cc.Class({
    extends: cc.Component,

    properties: {
        Stick: {
            type: cc.Node,
            default: null,
        },
        Ring:{
            type: cc.Node,
            default: null,
        },
        ShieldBtn: {
            type: cc.Node,
            default: null,
        },
        ShieldLabel: {
            type: cc.Label,
            default: null,
        },
        ShieldPrefab: {
            default: null,
            type: cc.Prefab
        },
        Player: {
            type: cc.Node,
            default: null,
        },
        Max_r: 100,
        ShieldDuartion: 5,
    },

    /*
     * 初始化函数
     * 功能：初始化脚本的设定
     */
    onLoad () {
        this.shieldLabel = this.ShieldLabel.getComponent(cc.Label)
        this.player = this.Player.getComponents("Player")[0]
        this.Speed = this.player.speed
        this.shieldLabel.string = this.player.shield

        this.Stick.x = 0 
        this.Stick.y = 0 
        this.dir = cc.v2(0, 0) 

        this.newShield = cc.instantiate(this.ShieldPrefab)
        this.node.parent.addChild(this.newShield)
        this.newShield.x = this.Player.x
        this.newShield.y = this.Player.y

        if (this.node.name === 'stickLeft') {
            this.newShield.name = 'shieldLeft'
        } else {
            this.newShield.name = 'shieldRight'
        }

        this.newShield.active = false

        this.initEvent()
        
    },


    /*
     * 初始化回调函数
     * 功能：初始化各个组件的回调函数
     */
    initEvent () {
        this.Ring.on(cc.Node.EventType.TOUCH_START, function (e) {
            var w_pos = e.getLocation() 
            this.pos = this.node.convertToNodeSpaceAR(w_pos) 
            var len = this.pos.mag()  //获取向量长度
            this.dir.x = this.pos.x / len 
            this.dir.y = this.pos.y / len 
            if (len > this.Max_r) {
                this.pos.x = this.Max_r * this.pos.x / len 
                this.pos.y = this.Max_r * this.pos.y / len 
            }
            this.Stick.setPosition(this.pos) 
        }, this) 

        this.ShieldBtn.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.generateShield()
        }, this) 

        this.Ring.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation() 
            this.pos = this.node.convertToNodeSpaceAR(w_pos) 
            var len = this.pos.mag() 
            this.dir.x = this.pos.x / len 
            this.dir.y = this.pos.y / len 
            if (len > this.Max_r) {
                this.pos.x = this.Max_r * this.pos.x / len 
                this.pos.y = this.Max_r * this.pos.y / len 
            }
            this.Stick.setPosition(this.pos) 
        }, this) 

        this.Ring.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.Stick.setPosition(cc.v2(0, 0)) 
            this.dir = cc.v2(0, 0) 
        }, this) 

        this.Ring.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.Stick.setPosition(cc.v2(0, 0)) 
            this.dir = cc.v2(0, 0) 
        }, this) 
    },


    /*
     * 护盾生成函数
     * 功能：为主角生成一个护盾
     */
    generateShield () {
        if(this.player.shield <= 0){
            return
        }

        this.player.shield--
        this.shieldLabel.string = this.player.shield

        this.newShield.active = true

        setTimeout(function () {
            this.active = false
        }.bind(this.newShield), 1000 * this.ShieldDuartion) 
    },

    start() {
        
    },

    /*
     * 位置更新函数
     * 功能：更新主角和护盾的位置
     */
    updatePos (dt) {
        if (this.newShield !== null)
        {
            this.newShield.x = this.Player.x
            this.newShield.y = this.Player.y
        }

        if (this.dir.mag() < 0.5) {
            return
        }


        this.Player.x += this.Speed * this.dir.x * this.pos.mag() / (this.dir.mag() * this.Max_r)
        this.Player.y += this.Speed * this.dir.y * this.pos.mag() / (this.dir.mag() * this.Max_r)
    },

    /*
     * 方向更新函数
     * 功能：更新主角的旋转方向
     */
    updateDir () {
        var r = Math.atan2(this.dir.y, this.dir.x) 
        var degree = r * 180 / (Math.PI) 
        degree = 360 - degree + 90 
        this.Player.rotation = degree 
    },

    update(dt) {
        this.updatePos(dt)
        this.updateDir()    
    },
});