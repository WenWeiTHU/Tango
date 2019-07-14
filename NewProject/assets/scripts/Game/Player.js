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
        accel: 0,       // 主角加速度
        speedX: 0,      // 主角X方向速度
        speedY: 0,      // 主角Y方向速度
        resistance: 0,  // 地图阻力
        health:3,       // 主角生命
        shield: 0       // 主角护盾数
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
            case 'Supply': {
                // 当碰到了补给
                this.shield++
                break
            }
            case 'Bullet': {
                // 当碰到了子弹
                this.health--
                break
            }
            default: {
                // Others
                break                
            }

        }
    },

    /*
     * 与地图的碰撞事件
     */
    mapCollision(obj_map) {
        var name = obj_map.node.name;
        // 直接回弹
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
            // 直接回弹
            case 'battery': {
                this.speedX = -this.speedX
                this.speedY = -this.speedY
                break
            }
            // 生命减少
            case 'enemy':
            case 'enemy_static':
            case 'enemy_spin': 
            case 'enemy_swing':
            case 'enemy_copter':
            case 'enemy_track': {
                this.health--
                break
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