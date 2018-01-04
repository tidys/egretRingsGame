class GameOverLayer extends eui.Component {
    private topNumLabel:eui.Label;
    private curNumLabel:eui.Label;

    private rePlayBtn;

    public constructor(score) {
        super();
        this.skinName = "GameOverLayerSkin";
        this.createPraticle();

        this.curNumLabel.text = score.toString();
        var topScore = GameData.getTopScore();
        if (score > topScore) {
            GameData.setTopScore(score);
        }
        this.topNumLabel.text = GameData.getTopScore().toString();


        this.rePlayBtn = new egret.Sprite();
        this.rePlayBtn.width = 250;
        this.rePlayBtn.height = 150;
        this.rePlayBtn.anchorOffsetX = this.rePlayBtn.width / 2;
        this.rePlayBtn.anchorOffsetY = this.rePlayBtn.height / 2;
        this.rePlayBtn.touchEnabled = true;
        this.rePlayBtn.graphics.beginFill(0x00ff00, 1);
        this.rePlayBtn.graphics.drawRoundRect(0, 0, 250, 150, 30, 30);
        this.rePlayBtn.graphics.endFill();
        this.rePlayBtn.y = 660;
        this.rePlayBtn.x = Display.winSize.cx;
        this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Director.getInstance().repleaceScene(new GameScene());
        }, this);
        this.addChild(this.rePlayBtn);

        var label:eui.Label = new eui.Label("OK!");
        label.touchEnabled = false;
        label.x = 40;
        label.y = 20;
        label.size = 100;
        this.rePlayBtn.addChild(label);
    }

    private createPraticle() {
        var texture = RES.getRes("star_png");
        var cfg = RES.getRes("star_json");
        var sys = new particle.GravityParticleSystem(texture, cfg);
        sys.x = Display.winSize.cx;
        sys.y = -10;
        this.addChild(sys);
        sys.start();
    }
}