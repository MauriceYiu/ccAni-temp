// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        myMonster: {
            type: cc.Animation,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchstart', function (event) {
            var pos = event.getLocation();
            pos = this.node.convertToNodeSpaceAR(pos);
            var start = this.myMonster.node.getPosition();
            var end = pos;
            var rot = this.getAngle(start, end);
            // this.myMonster.node.angle = rot;
            cc.log(rot)
            let index = this.getDirec(rot);
            cc.log(this.myMonster.getClips());
            let animationArr = this.myMonster.getClips();
            this.myMonster.play(animationArr[index].name);
        }, this);
    },
    getDirec(rot) {
        if (rot > -45 && rot <= 45) {
            return 0;
        }else if(rot > 45 && rot <= 135){
            return 3;
        }else if(rot > 135 && rot <= 225){
            return 1;
        }else {
            return 2;
        }
    },
    getAngle: function (start, end) {
        //两点的x、y值
        var x = end.x - start.x;
        var y = end.y - start.y;
        var hypotenuse = Math.sqrt(x * x + y * y);

        //斜边长度
        var cos = x / hypotenuse;

        var radian = Math.acos(cos);

        //求出弧度
        var angle = 180 / (Math.PI / radian);

        //用弧度算出角度
        if (y < 0) {
            angle = 0 - angle;
        }
        else if (y == 0 && x < 0) {
            angle = 180;
        }
        return 90 - angle;
    },
    start() {

    },

    // update (dt) {},
});
