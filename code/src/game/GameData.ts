class GameData {
    public static data = {top: 1};
    public static localKey = "gameData";

    public static initData() {
        var localData = egret.localStorage.getItem(this.localKey);
        if (localData) {
            this.data = JSON.parse(localData);
        }
    }

    public static save() {
        var saveData = JSON.stringify(this.data);
        egret.localStorage.setItem(this.localKey, saveData);
    }

    public static  getTopScore() {
        return this.data.top;
    }

    public static setTopScore(v) {
        this.data.top = v;
        this.save();
    }


}