class CircleMgr {
    public static readyArr = {0: null, 1: null, 2: null};
    public static circleArr = [];

    public static addReadyCircle(circle:Circle) {
        var id = circle.readyId;
        this.readyArr[id] = circle;
    }

    public static getReadPosX(circle) {
        var id = circle.readyId;
        var posArr = [110, 320, 530];
        return posArr[id];
    }

    public static getReadyPosY() {
        return 1020;
    }
}