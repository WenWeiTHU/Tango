/*
 * 关卡模式目标点控制脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      type: cc.Node,
      default: null
    },
    targetX: 0,
    targetY: 0
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    this.target.active = false
    this.showTarget = false
  },

  // 当所有敌人被消灭时目标点才会出现
  update (dt) {
    if (this.node.children.length === 0 && !this.showTarget) {
      this.target.active = true
      this.showTarget = true
    }
  }
})
