var Display = (function () {
    function Display() {
    }
    var d = __define,c=Display,p=c.prototype;
    d(Display, "winSize"
        ,function () {
            this._winSize.width = egret.MainContext.instance.stage.stageWidth;
            this._winSize.height = egret.MainContext.instance.stage.stageHeight;
            this._winSize.cx = this._winSize.width / 2;
            this._winSize.cy = this._winSize.height / 2;
            return this._winSize;
        }
    );
    d(Display, "stage"
        ,function () {
            return egret.MainContext.instance.stage;
        }
    );
    Display._winSize = { width: 0, height: 0, cx: 0, cy: 0 };
    return Display;
}());
egret.registerClass(Display,'Display');
//# sourceMappingURL=Display.js.map