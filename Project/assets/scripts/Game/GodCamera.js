cc.Class({
    extends: cc.Component,

    properties: {
        goToWhereX: 0,
        goToWhereY: 0,
        toWhereY: 0,
        toWhereX: 0,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.toWhereX = -10;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.goToWhereX = 10;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.goToWhereY = 10;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.toWhereY = -10;
                        break;
                }
            },
            onKeyReleased: function (keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.toWhereX = 0;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.goToWhereX = 0;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.goToWhereY = 0;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.toWhereY = 0;
                        break;
                }
            }
        }, self.node);
    },

    goToLeft: function () {
        this.node.runAction(cc.moveBy(0.25, cc.p(this.toWhereX, 0)));
        // this.node.x -=100;
    },

    goToRigth: function () {
        this.node.runAction(cc.moveBy(0.25, cc.p(this.goToWhereX, 0)))
        // this.node.x +=100;
    },

    goToUp: function () {
        this.node.runAction(cc.moveBy(0.25, cc.p(0, this.goToWhereY)));

    },

    goToBottom: function () {
        this.node.runAction(cc.moveBy(0.25, cc.p(0, this.toWhereY)));
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        this.goToLeft();
        this.goToRigth();
        this.goToUp();
        this.goToBottom();

    },
});