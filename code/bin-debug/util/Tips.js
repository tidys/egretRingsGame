var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        _super.call(this);
        this.bg = new eui.Image();
        this.bg.source = RES.getRes("Tips_png");
        this.bg.scale9Grid = new egret.Rectangle(55, 12, 9, 4);
        this.addChild(this.bg);
        this.width = 121;
        this.height = 30;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.label = new eui.Label();
        this.addChild(this.label);
        this.x = Display.winSize.width / 2;
        this.y = Display.winSize.height - 100;
        egret.MainContext.instance.stage.addChildAt(this, 100000);
    }
    var d = __define,c=Tips,p=c.prototype;
    p.show = function (str) {
        this.label.text = str;
        this.label.anchorOffsetX = this.label.width / 2;
        this.label.anchorOffsetY = this.label.height / 2;
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.bg.width = this.label.width + 50;
        this.bg.height = this.label.height + 20;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        this.bg.x = this.width / 2;
        this.bg.y = this.height / 2;
        var tw = egret.Tween.get(this);
        tw.to({ x: Display.winSize.width / 2, y: Display.winSize.height - 200 }, 1500, egret.Ease.backOut)
            .call(this.callback, this);
    };
    p.callback = function () {
        this.parent.removeChild(this);
    };
    return Tips;
}(egret.DisplayObjectContainer));
egret.registerClass(Tips,'Tips');
//# sourceMappingURL=Tips.js.map