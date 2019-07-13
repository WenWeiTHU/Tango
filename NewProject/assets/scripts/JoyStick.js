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
        ShieldPrefab: {
            default: null,
            type: cc.Prefab
        },
        Player: {
            type: cc.Node,
            default: null,
        },
        Max_r: 200,
        Speed: 600,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    generateShield: function () {
        this.newShield.active = true

        setTimeout(function () {
            this.active = false
        }.bind(this.newShield), 3000);
    },

    start() {
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
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag(); //获取向量长度
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;
            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Stick.setPosition(pos);
        }, this);

        this.ShieldBtn.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.generateShield()
        }, this);

        this.Stick.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag();
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;
            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Stick.setPosition(pos);
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
        this.newShield.x = this.Player.x
        this.newShield.y = this.Player.y

        if (this.dir.mag() < 0.5) {
            return;
        }


        var accelX = this.dir.x * this.Speed;
        var accelY = this.dir.y * this.Speed;
        var player = this.Player.getComponents("Player")[0];
        if(Math.sqrt(Math.pow(player.speedX, 2) + Math.pow(player.speedY, 2)) < this.Speed)
        {
           
            player.speedX += accelX * dt;
            player.speedY += accelY * dt;
        }
        
        //方向计算
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / (Math.PI);
        degree = 360 - degree + 90;
        this.Player.rotation = degree;
    },
});