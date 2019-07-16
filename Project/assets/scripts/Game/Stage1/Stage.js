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
        mapPrefab: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    /*
     * 初始化地图
     */
    initMap () {
        // this.newMapEdge(-1817, 2400, 0, 'mapUp')
        // this.newMapEdge(-2159, 2258, -45, 'mapLean')
        // this.newMapEdge(-2300, 1917, 90, 'mapUp')
        // this.newMapEdge(-2159, 1576, 45, 'mapLean')
        // this.newMapEdge(-1817, 1435, 0, 'mapDown')
        // this.newMapEdge(-1517, 2227, 45, 'mapLean')
        // this.newMapEdge(-1517, 1608, -45, 'mapLean')
        // this.newMapEdge(-1217, 2054, 0, 'mapDown')
        // this.newMapEdge(-1217, 1781, 0, 'mapDean')
    },
    
    /*
     * 生成新的地图边界
     */
    newMapEdge (x, y, rotation, name='') {
        var newMap = cc.instantiate(this.mapPrefab)
        newMap.x = x
        newMap.y = y
        newMap.rotation = rotation 
        newMap.name = name
        this.node.addChild(newMap)
    },

    start () {
        this.initMap()
    },

    // update (dt) {},
});
