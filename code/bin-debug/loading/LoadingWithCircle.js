// 带旋转圆圈的loading
var LoadingWithCircle = (function (_super) {
    __extends(LoadingWithCircle, _super);
    function LoadingWithCircle() {
        _super.call(this);
        this.groups = []; //要加载的组
        this.skinName = "LoadingWithCircleSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    var d = __define,c=LoadingWithCircle,p=c.prototype;
    p.addStage = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.runLoading, this);
    };
    p.runLoading = function () {
        this.circle.rotation += 3;
    };
    p.load = function (groups, callback, argu) {
        egret.log("[LoadingCircle] 加载组:" + groups);
        this.index = 0;
        this.groups = groups;
        this.callback = callback;
        this.argu = argu;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.groups[this.index]);
    };
    p.isAllLoaded = function () {
        var b = true;
        for (var i = 0; i < this.groups.length; i++) {
            b = b && RES.isGroupLoaded(this.groups[i]);
        }
        return b;
    };
    p.loadFinish = function () {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.parent.removeChild(this);
        //TODO 资源加载完成，调用回调
        if (this.callback) {
            if (this.argu) {
                this.callback(this.argu);
            }
            else {
                this.callback();
            }
        }
    };
    p.onResourceLoadComplete = function (event) {
        var b = this.isAllLoaded();
        egret.log("[LoadingCircle] group " + event.groupName + " loaded");
        if (b) {
            this.loadFinish();
        }
        else {
            this.index++;
            RES.loadGroup(this.groups[this.index]);
        }
    };
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    p.onResourceProgress = function (event) {
        this.setProgress(event.itemsLoaded, event.itemsTotal);
        var item = event.resItem;
        //console.log(event.groupName + "[" + event.itemsLoaded + "/" + event.itemsTotal + "]:" + item.url);
    };
    p.setProgress = function (current, total) {
        this.label.text = current + "/" + total;
    };
    return LoadingWithCircle;
}(eui.Component));
egret.registerClass(LoadingWithCircle,'LoadingWithCircle');
//# sourceMappingURL=LoadingWithCircle.js.map