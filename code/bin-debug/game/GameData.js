var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.initData = function () {
        var localData = egret.localStorage.getItem(this.localKey);
        if (localData) {
            this.data = JSON.parse(localData);
        }
    };
    GameData.save = function () {
        var saveData = JSON.stringify(this.data);
        egret.localStorage.setItem(this.localKey, saveData);
    };
    GameData.getTopScore = function () {
        return this.data.top;
    };
    GameData.setTopScore = function (v) {
        this.data.top = v;
        this.save();
    };
    GameData.data = { top: 1 };
    GameData.localKey = "gameData";
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map