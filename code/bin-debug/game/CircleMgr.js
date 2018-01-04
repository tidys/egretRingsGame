var CircleMgr = (function () {
    function CircleMgr() {
    }
    var d = __define,c=CircleMgr,p=c.prototype;
    CircleMgr.addReadyCircle = function (circle) {
        var id = circle.readyId;
        this.readyArr[id] = circle;
    };
    CircleMgr.getReadPosX = function (circle) {
        var id = circle.readyId;
        var posArr = [110, 320, 530];
        return posArr[id];
    };
    CircleMgr.getReadyPosY = function () {
        return 1020;
    };
    CircleMgr.readyArr = { 0: null, 1: null, 2: null };
    CircleMgr.circleArr = [];
    return CircleMgr;
}());
egret.registerClass(CircleMgr,'CircleMgr');
//# sourceMappingURL=CircleMgr.js.map