var Director = (function () {
    function Director() {
        this.stackLayer = [];
        this.gameLayer = null;
    }
    var d = __define,c=Director,p=c.prototype;
    Director.getInstance = function () {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    };
    p.initWithMain = function (m) {
        if (this.gameLayer == null) {
            this.gameLayer = m;
        }
    };
    p.repleaceScene = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChildren();
            this.gameLayer.addChild(layer);
        }
    };
    p.pushScene = function (layer) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(layer);
            this.stackLayer.push(layer);
        }
    };
    p.popScene = function () {
        if (this.gameLayer != null) {
            var len = this.stackLayer.length;
            if (len > 0) {
                var layer = this.stackLayer[len - 1];
                if (layer.parent == this.gameLayer) {
                    this.gameLayer.removeChild(layer);
                    Util.removeByElements(this.stackLayer, layer);
                }
            }
        }
    };
    // ====================牵扯游戏逻辑的层管理====================================
    p.gotoGameLayer = function () {
        var loadingView = new LoadingWithCircle();
        Director.getInstance().pushScene(loadingView);
        loadingView.load(['home'], function () {
            Director.getInstance().repleaceScene(new GameScene());
        }, [this]);
    };
    Director.instance = null;
    return Director;
}());
egret.registerClass(Director,'Director');
//# sourceMappingURL=Director.js.map