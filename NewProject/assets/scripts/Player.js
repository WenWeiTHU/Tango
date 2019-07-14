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
        accel: 0,
        speedX: 0,
        speedY: 0,
        resistance: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    /*
     * 角色的碰撞事件
     */
    onCollisionEnter(other, self) {
        // 获取碰撞对象的类型
        var group = other.node.group;
        switch (group) {
            case 'Map': {
                // 当碰到的是地图边界时
                this.mapCollision(other);
                break;
            }
            case 'Enemy': {
                // 当碰到了敌人时
                this.enemyCollision(other);
                break;
            }
            // Others

            // Others
        }
    },

    /*
     * 与地图的碰撞事件
     */
    mapCollision(obj_map) {
        var name = obj_map.node.name;
        switch (name) {
            case 'mapLeft': {
                this.speedX = -this.speedX;
                break;
            }
            case 'mapRight': {
                this.speedX = -this.speedX;
                break;
            }
            case 'mapUp': {
                this.speedY = -this.speedY;
                break;
            }
            case 'mapDown': {
                this.speedY = -this.speedY;
                break;
            }
        }
    },

    /*
     * 与敌人的碰撞事件
     */
    enemyCollision(obj_enemy) {
        var name = obj_enemy.node.name;
        switch (name) {
            case 'battery': {
                this.speedX = -this.speedX;
                this.speedY = -this.speedY;
                break;
            }
        }
    },

    start() {

    },
    update(dt) {
        // 运动
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;

        // 阻力
        if (this.speedX > this.resistance) {
            this.speedX -= this.speedX * 0.01;
        } else if (this.speedX < -this.resistance) {
            this.speedX -= this.speedX * 0.01;
        }

        if (this.speedY > this.resistance) {
            this.speedY -= this.speedY * 0.01;
        } else if (this.speedY < -this.resistance) {
            this.speedY -= this.speedY * 0.01;
        }
    }
});