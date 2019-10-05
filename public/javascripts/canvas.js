function Board() {
    const self = this;
    const boardId = arguments[0];
    const canvas = $("#" + boardId);
    const canvasContext = document.getElementById(boardId).getContext('2d');
    let mouseCanvasClick = false;
    let prevX, prevY;

    const pointerDown = function(e) {
        mouseCanvasClick = true;
        prevX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX - this.offsetLeft;
        prevY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY - this.offsetTop;
        self.draw(prevX + 1, prevY + 1);
    };

    const pointerMove = function(e) {
        if (mouseCanvasClick) {
            let x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX - this.offsetLeft;
            let y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY - this.offsetTop;
            self.draw(x, y);
        }
    };

    const pointerUp = function(e) {
        mouseCanvasClick = false;
    };

    const pointerEnter = function(e) {
        if (mouseCanvasClick) {
            let x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX - this.offsetLeft;
            let y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY - this.offsetTop;
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

    const ClearCanvas = function() {
        let el = document.getElementById(boardId);
        let elContext = el.getContext('2d');
        elContext.fillStyle = 'white';
        elContext.fillRect(0, 0, el.width, el.height);
    };

    self.forceClear = ClearCanvas;

    self.snap = function() {
        let el = document.getElementById(boardId);
        let elData = el.toDataURL();
        let fileDownload = document.createElement('a');
        fileDownload.download = "board.jpg";
        fileDownload.href = elData.replace('image/png', 'image/octet-stream');
        fileDownload.click();


        // let el = document.getElementById(boardId);
        // let elData=el.getContext('2d').getImageData(0, 0, el.width, el.height);

        // let tempEl = document.createElement('canvas');
        // let tempElContext=tempEl.getContext('2d');
        // tempElContext.fillStyle = 'white';
        // tempElContext.fillRect(0, 0, el.width, el.height);
        // tempElContext.putImageData(elData,0, 0);

        // let imgData = tempEl.toDataURL();

        // let fileDownload = document.createElement('a');
        // fileDownload.download = "board.jpg";
        // fileDownload.href = imgData.replace('image/png', 'image/octet-stream');
        // fileDownload.click();
    };

}