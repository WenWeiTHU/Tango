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
        Stage1Btn: {
            type: cc.Button,
            default: null
        },
        Stage2Btn: {
            type: cc.Button,
            default: null
        },
        Stage3Btn: {
            type: cc.Button,
            default: null
        },
        Stage4Btn: {
            type: cc.Button,
            default: null
        },
        Stage5Btn: {
            type: cc.Button,
            default: null
        },
        Stage6Btn: {
            type: cc.Button,
            default: null
        },
        Stage7Btn: {
            type: cc.Button,
            default: null
        },
        Stage8Btn: {
            type: cc.Button,
            default: null
        },
        Stage9Btn: {
            type: cc.Button,
            default: null
        },
        Stage10Btn: {
            type: cc.Button,
            default: null
        },
        Stage11Btn: {
            type: cc.Button,
            default: null
        },
        Stage12Btn: {
            type: cc.Button,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        for (var j = 1; j < 13; j++) {
            var cmd = "this.Stage" + String(j) + "Btn.node.on('click', this.loadScene(j), this)"
            eval(cmd)
        }
        var i
        for (i = 1; i < 13; ++i) {
            debugger;
            var key = "Stage" + String(i)
            var result = JSON.parse(cc.sys.localStorage.getItem(key))
            if (!result) {
                var btns = this['Stage' + String(i) + 'Btn'].getComponents(cc.Button);
                for (var btn of btns) {
                    btn.interactable = false
                }
            }
        }
    },

    loadScene (i) {
        return function () {
            debugger
            cc.director.loadScene("Stage" + String(i))
        }
    }

    // update (dt) {},
});
