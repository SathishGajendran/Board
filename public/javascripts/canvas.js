function Board() {
    var self = this;
    var boardId = arguments[0];
    var canvas = $("#" + boardId);
    var canvasContext = document.getElementById(arguments[0]).getContext('2d');
    var mouseCanvasClick = false;
    var prevX, prevY;

    var pointerDown = function(e) {
        mouseCanvasClick = true;
        prevX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX - this.offsetLeft;
        prevY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY - this.offsetTop;
        self.draw(prevX + 1, prevY + 1);
    };

    var pointerMove = function(e) {
        if (mouseCanvasClick) {
            var x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX - this.offsetLeft;
            var y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY - this.offsetTop;
            self.draw(x, y);
        }
    };

    var pointerUp = function(e) {
        mouseCanvasClick = false;
    };

    var pointerEnter = function(e) {
        if (mouseCanvasClick) {
            var x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX - this.offsetLeft;
            var y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY - this.offsetTop;
            self.draw(x, y);
        }
    };

    canvas.mousedown(pointerDown);
    canvas.mousemove(pointerMove);
    $('*').mouseup(pointerUp);
    canvas.mouseenter(pointerEnter);

    canvas.on("touchstart", pointerDown);
    canvas.on("touchmove", pointerMove);
    $('*').on("touchend", pointerUp);
    canvas.on("touchenter", pointerEnter);

    self.draw = function(x, y) {
        if (mouseCanvasClick) {
            canvasContext.beginPath();
            canvasContext.lineCap = "round";
            canvasContext.lineJoin = "round";
            canvasContext.lineWidth = $("#brushSize").val() || 3;
            canvasContext.strokeStyle = $("#penColor").val() || "blue";
            canvasContext.moveTo(prevX, prevY);
            canvasContext.lineTo(x, y);
            canvasContext.stroke();
            canvasContext.closePath();
        }
        prevX = x;
        prevY = y;
    };

    self.clear = function() {
        if (confirm("Do you want to clear ?")) {
            ClearCanvas();
        }
    };

    var ClearCanvas = function() {
        var el = document.getElementById(boardId);
        var elContext = el.getContext('2d');
        elContext.fillStyle = 'white';
        elContext.fillRect(0, 0, el.width, el.height);
    };

    self.forceClear = ClearCanvas;

    self.snap = function() {
        var el = document.getElementById(boardId);
        var elData = el.toDataURL();
        var fileDownload = document.createElement('a');
        fileDownload.download = "board.jpg";
        fileDownload.href = elData.replace('image/png', 'image/octet-stream');
        fileDownload.click();


        // var el = document.getElementById(boardId);
        // var elData=el.getContext('2d').getImageData(0, 0, el.width, el.height);

        // var tempEl = document.createElement('canvas');
        // var tempElContext=tempEl.getContext('2d');
        // tempElContext.fillStyle = 'white';
        // tempElContext.fillRect(0, 0, el.width, el.height);
        // tempElContext.putImageData(elData,0, 0);

        // var imgData = tempEl.toDataURL();

        // var fileDownload = document.createElement('a');
        // fileDownload.download = "board.jpg";
        // fileDownload.href = imgData.replace('image/png', 'image/octet-stream');
        // fileDownload.click();
    };

}