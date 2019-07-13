"use strict";
cc._RF.push(module, '8f66bR/MmZDG4FlE3MUNlKT', 'Bind');
// scripts/Bind.js

"use strict";

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
        Player1: {
            type: cc.Node,
            default: null
        },

        Player2: {
            type: cc.Node,
            default: null
        }

        // MinLength: 500,
        // MaxLength: 700,
        // Strength: 3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / Math.PI;
        degree = 360 - degree + 90;
        this.node.rotation = degree;

        this.node.height = this.dir.mag();
        this.node.x = this.Player2.x;
        this.node.y = this.Player2.y;
    },


    // drag: function(dt){
    //     this.Player1.x -= this.dir.x * this.Strength * dt;
    //     this.Player1.y -= this.dir.y * this.Strength * dt;
    //     console.log('dt: ', dt)
    //     console.log('this.dir.x * this.Strength * dt: ', this.dir.x * this.Strength * dt)
    //     console.log('this.dir.y * this.Strength * dt: ', this.dir.y * this.Strength * dt)


    //     this.Player2.x += this.dir.x * this.Strength * dt;
    //     this.Player2.y += this.dir.y * this.Strength * dt;
    // },

    // push: function(dt){
    //     this.Player1.x += this.dir.x * this.Strength * dt;
    //     this.Player1.y += this.dir.y * this.Strength * dt;

    //     this.Player2.x -= this.dir.x * this.Strength * dt;
    //     this.Player2.y -= this.dir.y * this.Strength * dt;
    // },

    update: function update(dt) {
        this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
        var r = Math.atan2(this.dir.y, this.dir.x);
        var degree = r * 180 / Math.PI;
        degree = 360 - degree + 90;
        this.node.rotation = degree;

        this.node.height = this.dir.mag();
        var collider = this.node._components[2];
        collider.points[2].y = this.node.height;
        collider.points[3].y = this.node.height;

        // if(this.node.height > this.MaxLength){
        //     this.drag(dt)
        // }
        // else if(this.node.height < this.MinLength){
        //     this.push(dt)
        // }

        this.node.x = this.Player2.x;
        this.node.y = this.Player2.y;
    }
});

cc._RF.pop();