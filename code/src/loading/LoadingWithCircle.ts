// 带旋转圆圈的loading
class LoadingWithCircle extends eui.Component {
    private circle:eui.Image;
    private label:eui.Label;


    private groups = [];//要加载的组
    private index;//当前加载的组序列
    private callback;//资源加载完毕之后的回调
    private argu;//回调函数的参数


    public constructor() {
        super();
        this.skinName = "LoadingWithCircleSkin";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    private addStage() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.runLoading, this);
    }

    private runLoading() {
        this.circle.rotation += 3;
    }

    public load(groups, callback?, argu?) {
        egret.log("[LoadingCircle] 加载组:" + groups);
        this.index = 0;
        this.groups = groups;
        this.callback = callback;
        this.argu = argu;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.groups[this.index]);
    }


    private isAllLoaded():boolean {
        var b = true;
        for (var i = 0; i < this.groups.length; i++) {
            b = b && RES.isGroupLoaded(this.groups[i]);
        }
        return b;
    }


    private loadFinish() {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.parent.removeChild(this);
        //TODO 资源加载完成，调用回调
        if (this.callback) {
            if (this.argu) {
                this.callback(this.argu);
            } else {
                this.callback();
            }
        }
    }

    private onResourceLoadComplete(event:RES.ResourceEvent) {
        var b = this.isAllLoaded();
        egret.log("[LoadingCircle] group " + event.groupName + " loaded");
        if (b) {
            this.loadFinish();
        } else {
            this.index++;
            RES.loadGroup(this.groups[this.index]);
        }
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        this.setProgress(event.itemsLoaded, event.itemsTotal);
        var item = event.resItem;
        //console.log(event.groupName + "[" + event.itemsLoaded + "/" + event.itemsTotal + "]:" + item.url);
    }

    private setProgress(current, total):void {
        this.label.text = current + "/" + total;
    }

}
