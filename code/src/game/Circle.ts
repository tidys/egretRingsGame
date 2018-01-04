class Circle extends egret.Sprite {
    private shapeBg;
    private circleWidth = 20;// 线圈的宽度

    public readyId = 0;

    private radius = [20, 55, 90];
    private shapeArr = [null, null, null];
    public colorData = [null, null, null];

    public flag = false;

    public row = 0;
    public column = 0;

    private oriX = 0;
    private oriY = 0;

    public constructor() {
        super();
        this.initView();
        this.initShape();
    }

    // 连个圆圈是否可以叠加
    public isCanAddColor(cirCle:Circle) {
        var otherColor = cirCle.colorData;
        if (this.colorData[0] && otherColor[0]) {
            return false;
        }
        if (this.colorData[1] && otherColor[1]) {
            return false;
        }
        if (this.colorData[2] && otherColor[2]) {
            return false;
        }
        return true;
    }

    // 两个圆圈叠加, 增加颜色
    public addColor(circle:Circle) {
        if (this.colorData[0] == null) {
            this.setIndexColor(0, circle.colorData[0]);
        }
        if (this.colorData[1] == null) {
            this.setIndexColor(1, circle.colorData[1]);
        }
        if (this.colorData[2] == null) {
            this.setIndexColor(2, circle.colorData[2]);
        }
    }

    // 是否同色
    public isAllOneColor() {
        if (this.colorData[0] != null &&
            this.colorData[0] == this.colorData[1] &&
            this.colorData[1] == this.colorData[2]) {
            return true;
        }
        return false;
    }

    // 清理颜色
    public cleanColor(index) {
        this.colorData[index] = null;
        this.shapeArr[index].graphics.clear();
    }

    // 是否含有该颜色
    public isHasSameColor(color) {
        for (var k in this.colorData) {
            var selfColor = this.colorData[k];
            if (color == selfColor) {
                return true;
            }
        }
        return false;
    }

    // 获取颜色所在的位置
    public getColorIndex(color) {
        var arr = [];
        for (var i = 0; i < 3; i++) {
            if (color == this.colorData[i]) {
                arr.push(i);
            }
        }
        return arr;
    }

    // 获取自身的颜色种类
    public filterColor() {
        var arr = [];
        for (var k in this.colorData) {
            var color = this.colorData[k];
            if (color) {
                var isIn = false;
                for (var j in arr) {
                    if (color == arr[j]) {
                        isIn = true;
                    }
                }
                if (isIn == false) {
                    arr.push(color);
                }
            }
        }
        return arr;
    }

    public drawPoint() {
        this.shapeBg.graphics.beginFill(0xffffff, 1);
        this.shapeBg.graphics.drawCircle(0, 0, 5);
        this.shapeBg.graphics.endFill();
    }

    private initView() {
        this.width = this.height = 200;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = true;

        this.shapeBg = new egret.Shape();
        this.shapeBg.touchEnabled = false;
        this.shapeBg.x = this.width / 2;
        this.shapeBg.y = this.height / 2;
        this.addChild(this.shapeBg);
        this.shapeBg.graphics.beginFill(0x000000, 0.001);
        this.shapeBg.graphics.drawCircle(0, 0, this.radius[2]);
        this.shapeBg.graphics.endFill();

    }

    private initShape() {
        for (var i = 0; i < 3; i++) {
            var shape = new egret.Shape();
            shape.touchEnabled = false;
            shape.x = this.width / 2;
            shape.y = this.height / 2;
            this.addChild(shape);
            this.shapeArr[i] = shape;
        }
    }

    public setIndexColor(index, color) {
        if (!this.colorData[index]) {
            this.colorData[index] = color;
            this.createrCircle(index, color);
        }
    }

    private createrCircle(index, color) {
        this.shapeArr[index].graphics.lineStyle(this.circleWidth, color);
        this.shapeArr[index].graphics.drawCircle(0, 0, this.radius[index]);
        this.shapeArr[index].graphics.endFill();
    }

    public setOriPos(x, y) {
        this.oriX = x;
        this.oriY = y;
        this.x = this.oriX;
        this.y = this.oriY;
    }

    public backToReady() {
        var tw = egret.Tween.get(this);
        tw.to({x: this.oriX, y: this.oriY}, 100);

    }


}
