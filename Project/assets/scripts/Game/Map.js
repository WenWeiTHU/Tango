/*
 * 地图脚本
 */

cc.Class({
    extends: cc.Component,

    properties: {
    },

    /*
     * 初始化函数
     * 功能：初始化脚本所需设定
     */
    onLoad () {
        // 开启碰撞检测
        this.collidManager = cc.director.getCollisionManager();
        this.collidManager.enabled = true;
    },
    
    start () {
        
    },

    // update (dt) {},
});
