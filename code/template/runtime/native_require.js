
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/egret_4399_h5api/egret_4399_h5api.js",
	"libs/modules/dcagent/dcagent.js",
	"libs/modules/particle/particle.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/game/Boom.js",
	"bin-debug/game/Circle.js",
	"bin-debug/game/CircleMgr.js",
	"bin-debug/game/GameData.js",
	"bin-debug/game/GameOverLayer.js",
	"bin-debug/game/GameScene.js",
	"bin-debug/loading/LoadingWithCircle.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/util/Director.js",
	"bin-debug/util/Display.js",
	"bin-debug/util/Tips.js",
	"bin-debug/util/Util.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};