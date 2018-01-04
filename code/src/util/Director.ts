class Director {
    public static instance:Director = null;
    private stackLayer = [];
    private gameLayer:Main = null;

    public static getInstance() {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    public initWithMain(m:Main) {
        if (this.gameLayer == null) {
            this.gameLayer = m;
        }
    }

    public repleaceScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChildren();
            this.gameLayer.addChild(layer);
        }
    }

    public pushScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(layer);
            this.stackLayer.push(layer);
        }
    }

    public popScene() {
        if (this.gameLayer != null) {
            var len = this.stackLayer.length;
            if (len > 0) {
                var layer = this.stackLayer[len - 1];
                if (layer.parent == this.gameLayer) {
                    this.gameLayer.removeChild(layer)
                    Util.removeByElements(this.stackLayer, layer);
                }
            }
        }
    }

    // ====================牵扯游戏逻辑的层管理====================================
    public gotoGameLayer() {
        var loadingView = new LoadingWithCircle();
        Director.getInstance().pushScene(loadingView);
        loadingView.load(['home'], function () {
            Director.getInstance().repleaceScene(new GameScene());
        }, [this]);
    }



}
