cc.Class({
    extends: cc.Component,

    properties: {
        PlayerHit: {
            type: cc.AudioSource,
            default: null
        },
    },

    play: function () {
        this.PlayerHit.play();
    },

    pause: function () {
        this.PlayerHit.pause();
    },
});