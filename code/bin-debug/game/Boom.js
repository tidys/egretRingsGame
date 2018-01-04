var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        _super.call(this);
        this.num = 0;
        this.num = 0;
        //var btn = new eui.Button();
        //btn.x = Display.winSize.cx;
        //btn.y = 200;
        //this.addChild(btn);
        //btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createrBoom, this);
    }
    var d = __define,c=Boom,p=c.prototype;
    p.createrBoom = function (color) {
        var oriX = 0; //Display.winSize.cx;
        var oriY = 0; //Display.winSize.cy;
        var arr = [1, -1];
        for (var i = 0; i < 15; i++) {
            this.num++;
            var shape = new egret.Shape();
            shape.blendMode = egret.BlendMode.NORMAL;
            shape.graphics.beginFill(color, 1);
            var r = 30 + Util.random(30);
            shape.graphics.drawCircle(0, 0, r);
            shape.graphics.endFill();
            var x = Util.random(40) * arr[Util.random(2)];
            var y = Util.random(40) * arr[Util.random(2)];
            shape.x = oriX + x;
            shape.y = oriY + y;
            shape.scaleX = shape.scaleY = Util.random(0.2);
            this.addChild(shape);
            var scale = Util.random(1.5);
            var tw = egret.Tween.get(shape);
            tw.to({ x: oriX + x * 6, y: oriY + y * 3, scaleX: scale, scaleY: scale, alpha: 0 }, 1000, egret.Ease.quadOut)
                .call(function (obj) {
                if (obj.parent) {
                    obj.parent.removeChild(obj);
                }
                this.num--;
                if (this.num == 0) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                }
            }, this, [shape]);
        }
    };
    return Boom;
}(eui.Component));
egret.registerClass(Boom,'Boom');
//# sourceMappingURL=Boom.js.map