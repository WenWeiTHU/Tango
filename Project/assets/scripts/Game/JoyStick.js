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
        Stick: {
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
        Max_r: 200,
        ShieldDuartion: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    generateShield: function () {
        if(this.player.shield <= 0){
            return
        }

        this.player.shield--
        this.shieldLabel.string = this.player.shield


        this.newShield.active = true

        setTimeout(function () {
            this.active = false
        }.bind(this.newShield), 1000 * this.ShieldDuartion);
    },

    start() {
        this.shieldLabel = this.ShieldLabel.getComponent(cc.Label)
        this.player = this.Player.getComponents("Player")[0]
        this.Speed = this.player.speed
        this.shieldLabel.string = this.player.shield

        
        this.Stick.x = 0;
        this.Stick.y = 0;
        this.dir = cc.v2(0, 0);

        this.newShield = cc.instantiate(this.ShieldPrefab)
        this.node.parent.addChild(this.newShield)
        this.newShield.x = this.Player.x
        this.newShield.y = this.Player.y

        this.newShield.active = false

        this.Stick.on(cc.Node.EventType.TOUCH_START, function (e) {
            var w_pos = e.getLocation();
            this.pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = this.pos.mag(); //获取向量长度
            this.dir.x = this.pos.x / len;
            this.dir.y = this.pos.y / len;
            if (len > this.Max_r) {
                this.pos.x = this.Max_r * this.pos.x / len;
                this.pos.y = this.Max_r * this.pos.y / len;
            }
            this.Stick.setPosition(this.pos);
        }, this);

        this.ShieldBtn.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.generateShield()
        }, this);

        this.Stick.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            this.pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = this.pos.mag();
            this.dir.x = this.pos.x / len;
            this.dir.y = this.pos.y / len;
            if (len > this.Max_r) {
                this.pos.x = this.Max_r * this.pos.x / len;
                this.pos.y = this.Max_r * this.pos.y / len;
            }
            this.Stick.setPosition(this.pos);
        }, this);

        this.Stick.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.Stick.setPosition(cc.v2(0, 0));
            this.dir = cc.v2(0, 0);
        }, this);

        this.Stick.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.Stick.setPosition(cc.v2(0, 0));
            this.dir = cc.v2(0, 0);
        }, this);
    },

    update(dt) {
        if (this.newShield !== null)
        {
            this.newShield.x = this.Player.x
            this.newShield.y = this.Player.y
        }

        if (this.dir.mag() < 0.5) {
            return
        }

        // var accelX = this.dir.x * this.Speed
        // var accelY = this.dir.y * this.Speed


        // if(Math.sqrt(Math.pow(this.player.speedX, 2) + Math.pow(this.player.speedY, 2)) < this.Speed)
        // {
           
        //     this.player.speedX += accelX * dt;
        //     this.player.speedY += accelY * dt;
        // }

        this.Player.x += this.Speed * this.dir.x * this.pos.mag() / (this.dir.mag() * this.Max_r)
        this.Player.y += this.Speed * this.dir.y * this.pos.mag() / (this.dir.mag() * this.Max_r)

        
        //方向计算
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / (Math.PI);
        degree = 360 - degree + 90;
        this.Player.rotation = degree;
    },
});