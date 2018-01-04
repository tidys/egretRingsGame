var ResourceConfig = RES.ResourceConfig;
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.panelArray = [[null, null, null], [null, null, null], [null, null, null]];
        this.shapeArr = [[null, null, null], [null, null, null], [null, null, null]];
        this.readyCircle = [null, null, null];
        this.num = 0;
        this.prePoint = null;
        this.touchCircle = null;
        this.skinName = "GameSceneSkin";
        this.numLabel.text = this.num.toString();
        this.initPanelArr();
        this.initReadyCircle();
        //this.createTestCircle(0);
        //this.createTestCircle(1);
        //this.createTestCircle(2);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.initPanelArr = function () {
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                var key = "cell" + row + column;
                this.panelArray[row][column] = this[key];
                var circle = new Circle();
                circle.row = row;
                circle.column = column;
                circle.drawPoint();
                //console.log(row + "-" + column);
                circle.x = this.panelArray[row][column].width / 2;
                circle.y = this.panelArray[row][column].height / 2;
                this.shapeArr[row][column] = circle;
                this.panelArray[row][column].addChild(circle);
            }
        }
    };
    p.initReadyCircle = function () {
        for (var i = 0; i < 3; i++) {
            this.createReadyCircle(i);
        }
    };
    p.createTestCircle = function (i) {
        var circle = new Circle();
        circle.readyId = i;
        this.readyCircle[i] = circle;
        var x = CircleMgr.getReadPosX(circle);
        var y = CircleMgr.getReadyPosY();
        circle.setIndexColor(0, 0xff0000);
        circle.setIndexColor(1, 0x00ff00);
        circle.setOriPos(x, y);
        this.addChild(circle);
        CircleMgr.addReadyCircle(circle);
    };
    p.createReadyCircle = function (i) {
        var circle = new Circle();
        circle.readyId = i;
        this.readyCircle[i] = circle;
        var x = CircleMgr.getReadPosX(circle);
        var y = CircleMgr.getReadyPosY();
        //=======================================================
        var max = Util.random(2) + 1;
        var posArrReady = [[0, 1], [0, 1, 2]];
        var posArr = posArrReady[0];
        var colorArrReady = [
            // 0-6
            [0xff0000, 0x00ff00],
            // 6-15
            [0xff0000, 0x00ff00, 0x0000ff],
            // 15-30
            [0xff0000, 0x00ff00, 0x0000ff, 0xffff00],
            // 30-90
            [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff],
            // 90-200
            [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff],
            // 200-500
            [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xf0f0f0],
        ];
        var colorArr = colorArrReady[0];
        if (this.num >= 0 && this.num < 6) {
            posArr = posArrReady[0];
            colorArr = colorArrReady[0];
        }
        else if (this.num >= 6 && this.num < 15) {
            posArr = posArrReady[0];
            colorArr = colorArrReady[1];
        }
        else if (this.num >= 15 && this.num < 30) {
            posArr = posArrReady[1];
            colorArr = colorArrReady[2];
        }
        else if (this.num >= 30 && this.num < 90) {
            posArr = posArrReady[1];
            colorArr = colorArrReady[3];
        }
        else if (this.num >= 90 && this.num < 200) {
            posArr = posArrReady[1];
            colorArr = colorArrReady[4];
        }
        else if (this.num >= 200 && this.num < 500) {
            posArr = posArrReady[1];
            colorArr = colorArrReady[5];
        }
        for (var ii = 0; ii < max; ii++) {
            var pos = Util.random(posArr.length);
            var index = posArr[pos];
            //Util.removeByElements(posArr, index);
            var colorPos = Util.random(colorArr.length);
            var color = colorArr[colorPos];
            //Util.removeByElements(colorArr, color);
            circle.setIndexColor(index, color);
        }
        //=======================================================
        circle.setOriPos(x, y);
        this.addChild(circle);
        CircleMgr.addReadyCircle(circle);
    };
    p.onTouchBegan = function (touch) {
        var stageX = touch.stageX;
        var stageY = touch.stageY;
        this.prePoint = new egret.Point(stageX, stageY);
        this.touchCircle = this.getTouchCircle(stageX, stageY);
        //console.log("began");
    };
    p.getTouchCircle = function (x, y) {
        for (var k in this.readyCircle) {
            var circle = this.readyCircle[k];
            var b = circle.hitTestPoint(x, y);
            if (b) {
                return circle;
            }
        }
        return null;
    };
    p.onTouchMove = function (touch) {
        if (this.touchCircle) {
            var stageX = touch.stageX;
            var stageY = touch.stageY;
            var diffX = stageX - this.prePoint.x;
            var diffY = stageY - this.prePoint.y;
            this.touchCircle.x += diffX;
            this.touchCircle.y += diffY;
            this.prePoint = new egret.Point(stageX, stageY);
        }
    };
    p.onTouchEnd = function (touch) {
        //console.log("end");
        if (!this.touchCircle) {
            return;
        }
        var x = touch.target.x;
        var y = touch.target.y;
        var readyCell = this.touchCircle;
        // 填充颜色
        var isUse = false;
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                var item = this.panelArray[row][column];
                var b = item.hitTestPoint(x, y);
                if (b) {
                    //console.log(row + "----" + column + "***" + b);
                    var circle = this.shapeArr[row][column];
                    var isCanAdd = readyCell.isCanAddColor(circle);
                    if (isCanAdd) {
                        isUse = true;
                        circle.addColor(readyCell);
                    }
                    else {
                    }
                }
            }
        }
        // 处理拖动的cell
        if (isUse) {
            // 生成新的cell
            this.createReadyCircle(readyCell.readyId);
            if (readyCell.parent) {
                readyCell.parent.removeChild(readyCell);
            }
            this.prePoint = null;
        }
        else {
            readyCell.backToReady();
        }
        // 判断消除
        this.cleanCircle();
        // 判断是否还可以放置新的cell
        var b = this.isGameOver();
        if (b) {
            console.log("Game Over!");
            Director.getInstance().repleaceScene(new GameOverLayer(this.num));
        }
        else {
            console.log("Game Continue ...");
        }
    };
    p.isGameOver = function () {
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                var item = this.shapeArr[row][column];
                var b1 = item.isCanAddColor(this.readyCircle[0]);
                var b2 = item.isCanAddColor(this.readyCircle[1]);
                var b3 = item.isCanAddColor(this.readyCircle[2]);
                if (b1 || b2 || b3) {
                    return false;
                }
            }
        }
        return true;
    };
    // 获取相同行
    p.getSameRow = function (row, column, color, cleanList) {
        var up = row - 1;
        var down = row + 1;
        var left = column - 1;
        var right = column + 1;
        // 左边
        while (left >= 0) {
            var leftCell = this.shapeArr[row][left];
            var b1 = leftCell.isHasSameColor(color);
            if (b1) {
                var index = leftCell.getColorIndex(color);
                cleanList.push({ cell: leftCell, index: index });
                left--;
            }
            else {
                break;
            }
        }
        // 右边
        while (right < 3) {
            var rightCell = this.shapeArr[row][right];
            var b2 = rightCell.isHasSameColor(color);
            if (b2) {
                var index = rightCell.getColorIndex(color);
                cleanList.push({ cell: rightCell, index: index });
                right++;
            }
            else {
                break;
            }
        }
    };
    // 获取相同列
    p.getSameColumn = function (row, column, color, cleanList) {
        var up = row - 1;
        var down = row + 1;
        var left = column - 1;
        var right = column + 1;
        // 上边
        while (up >= 0) {
            var upCell = this.shapeArr[up][column];
            var b1 = upCell.isHasSameColor(color);
            if (b1) {
                var index = upCell.getColorIndex(color);
                cleanList.push({ cell: upCell, index: index });
                up--;
            }
            else {
                break;
            }
        }
        // 下边
        while (down < 3) {
            var downCell = this.shapeArr[down][column];
            var b2 = downCell.isHasSameColor(color);
            if (b2) {
                var index = downCell.getColorIndex(color);
                cleanList.push({ cell: downCell, index: index });
                down++;
            }
            else {
                break;
            }
        }
    };
    // 获取斜着的
    p.getSameSlope1 = function (row, column, color, cleanList) {
        var up = row - 1;
        var down = row + 1;
        var left = column - 1;
        var right = column + 1;
        // 右上
        while (up >= 0 && right < 3) {
            var upRightCell = this.shapeArr[up][right];
            var b1 = upRightCell.isHasSameColor(color);
            if (b1) {
                var index = upRightCell.getColorIndex(color);
                cleanList.push({ cell: upRightCell, index: index });
                up--;
                right++;
            }
            else {
                break;
            }
        }
        // 左下
        while (down < 3 && left >= 0) {
            var downLeftCell = this.shapeArr[down][left];
            var b2 = downLeftCell.isHasSameColor(color);
            if (b2) {
                var index = downLeftCell.getColorIndex(color);
                cleanList.push({ cell: downLeftCell, index: index });
                down++;
                left--;
            }
            else {
                break;
            }
        }
    };
    p.getSameSlope2 = function (row, column, color, cleanList) {
        var up = row - 1;
        var down = row + 1;
        var left = column - 1;
        var right = column + 1;
        // 左上
        while (up >= 0 && left >= 0) {
            var upLeftCell = this.shapeArr[up][left];
            var b1 = upLeftCell.isHasSameColor(color);
            if (b1) {
                var index = upLeftCell.getColorIndex(color);
                cleanList.push({ cell: upLeftCell, index: index });
                up--;
                left--;
            }
            else {
                break;
            }
        }
        // 右下
        while (down < 3 && right < 3) {
            var downRightCell = this.shapeArr[down][right];
            var b2 = downRightCell.isHasSameColor(color);
            if (b2) {
                var index = downRightCell.getColorIndex(color);
                cleanList.push({ cell: downRightCell, index: index });
                down++;
                right++;
            }
            else {
                break;
            }
        }
    };
    p.cleanCircle = function () {
        var cleanList = [];
        var oneColorList = [];
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                var curCircle = this.shapeArr[row][column];
                // 检测自身是否可以清除
                var oneColor = curCircle.isAllOneColor();
                if (oneColor) {
                    oneColorList.push(curCircle);
                }
                // 检测和其他的颜色
                var colorArr = curCircle.filterColor();
                for (var i = 0; i < colorArr.length; i++) {
                    var color = colorArr[i];
                    var index = curCircle.getColorIndex(color);
                    var cleanListRow = [{ cell: curCircle, index: index }]; // 自身有2个同色
                    this.getSameRow(row, column, color, cleanListRow);
                    if (cleanListRow.length >= 3 && this.isRepeatList(cleanList, cleanListRow) == false) {
                        cleanList.push(cleanListRow);
                    }
                    var cleanListColumn = [{ cell: curCircle, index: index }];
                    this.getSameColumn(row, column, color, cleanListColumn);
                    if (cleanListColumn.length >= 3 && this.isRepeatList(cleanList, cleanListColumn) == false) {
                        cleanList.push(cleanListColumn);
                    }
                    var cleanListSlope1 = [{ cell: curCircle, index: index }];
                    this.getSameSlope1(row, column, color, cleanListSlope1);
                    if (cleanListSlope1.length >= 3 && this.isRepeatList(cleanList, cleanListSlope1) == false) {
                        cleanList.push(cleanListSlope1);
                    }
                    var cleanListSlope2 = [{ cell: curCircle, index: index }];
                    this.getSameSlope2(row, column, color, cleanListSlope2);
                    if (cleanListSlope2.length >= 3 && this.isRepeatList(cleanList, cleanListSlope2) == false) {
                        cleanList.push(cleanListSlope2);
                    }
                }
            }
        }
        //console.log(cleanList);
        // 画激光线
        this.createLaser(cleanList);
        // 清理
        for (var k in cleanList) {
            var list = cleanList[k];
            for (var j in list) {
                var cell = list[j]['cell'];
                var indexArr = list[j]['index'];
                for (var k in indexArr) {
                    var indexItem = indexArr[k];
                    var color = cell.colorData[indexItem];
                    this.createBoom(cell, color);
                    cell.cleanColor(indexItem);
                    this.num++;
                }
            }
        }
        // 清理同色的circle
        for (var k in oneColorList) {
            var item = oneColorList[k];
            this.createBoom(item, item.colorData[0]);
            item.cleanColor(0);
            item.cleanColor(1);
            item.cleanColor(2);
            this.num += 3;
        }
        this.numLabel.text = this.num.toString();
    };
    p.createLaser = function (cleanList) {
        for (var k in cleanList) {
            var list = cleanList[k];
            var obj1 = list[0]['cell'];
            var obj2 = list[1]['cell'];
            var index1 = list[0]['index'][0];
            var color = obj1.colorData[index1];
            var p1 = obj1.localToGlobal(obj1.width / 2, obj1.height / 2);
            var p2 = obj2.localToGlobal(obj2.width / 2, obj2.height / 2);
            // 根据这两个点画一个很长的线
            var laser = new eui.Rect();
            laser.fillColor = color;
            laser.blendMode = egret.BlendMode.ADD;
            laser.alpha = 1;
            laser.width = 3000;
            laser.height = 30;
            laser.scaleX = 1;
            laser.scaleY = 1.4;
            laser.anchorOffsetY = laser.height / 2;
            laser.anchorOffsetX = laser.width / 2;
            if (p1.y == p2.y) {
                laser.rotation = 0;
            }
            else if (p1.x == p2.x) {
                laser.rotation = 90;
            }
            else {
                if (p1.y > p2.y) {
                    if (p1.x > p2.x) {
                        laser.rotation = 45;
                    }
                    else {
                        laser.rotation = -45;
                    }
                }
                else if (p1.y < p2.y) {
                    if (p1.x > p2.x) {
                        laser.rotation = -45;
                    }
                    else {
                        laser.rotation = 45;
                    }
                }
            }
            laser.x = p1.x;
            laser.y = p1.y;
            this.addChild(laser);
            var tw = egret.Tween.get(laser);
            tw.to({ scaleY: 0.2, alpha: 0.2 }, 400).call(function (obj) {
                if (obj.parent) {
                    obj.parent.removeChild(obj);
                }
            }, this, [laser]);
        }
    };
    p.createBoom = function (circle, color) {
        var p1 = circle.localToGlobal(circle.width / 2, circle.height / 2);
        var boom = new Boom();
        boom.createrBoom(color);
        boom.x = p1.x;
        boom.y = p1.y;
        this.addChild(boom);
    };
    p.isRepeatList = function (totalList, list) {
        //数据结构:[ [{},{},{}],  [{},{},{}], ]
        for (var k in totalList) {
            //数据结构: [{},{},{}]
            var curList = totalList[k];
            var isRepet = this.isSammeArray(curList, list);
            if (isRepet) {
                return true;
            }
        }
        return false;
    };
    // 判断两个arr里面的元素是否相同
    p.isSammeArray = function (list1, list2) {
        for (var k in list1) {
            var item1 = list1[k];
            var item1Row = item1['cell'].row;
            var item1Column = item1['cell'].column;
            var item1Index = item1['index'].sort().toString();
            var isIn = false;
            // 判断cell 是否相同
            for (var j in list2) {
                var item2 = list2[j];
                var item2Row = item2['cell'].row;
                var item2Column = item2['cell'].column;
                var item2Index = item2['index'].sort().toString();
                if (item1Row == item2Row &&
                    item1Column == item2Column &&
                    item1Index == item2Index) {
                    // JS要比较两个数组是否有相同的元素，即两个数组所有元素都相同，但元素的顺序不一定一致。
                    // 只就需要先将数组进行排序，再比较两个数组是否相等
                    isIn = true;
                }
            }
            if (isIn == false) {
                return false;
            }
        }
        return true;
    };
    return GameScene;
}(eui.Component));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map