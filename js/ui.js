var uiElems = document.getElementById("ui"),
    ui = uiElems.getContext("2d"),
    spriteSheet = new Image(), // <--- move to separate js
    currentX = 0,
    currentY = 0;

spriteSheet.src = "imgs/spr.png";
document.onmousemove = getMouse;


//main sprite definition. parent for all graphical classess
function sprite(options) {
    this.context = options.context; //this gets the canvas layer in wich the sprite should be rendered.
    this.sX = options.sourceX;
    this.sY = options.sourceY;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
}

sprite.prototype.render = function(x, y) {
    this.context.drawImage(
        this.image,
        this.sX,
        this.sY,
        this.width,
        this.height,
        x * cellSize,
        y * cellSize,
        cellSize,
        cellSize
    );
};

var cursor = new sprite({
    context: uiElems.getContext("2d"),
    sourceX: 0,
    sourceY: 0,
    width: 15,
    height: 15,
    image: spriteSheet
});




//gets the current cell of the mouse, and determines if it has changed.
function getMouse(e) {
    var tempX = Math.floor(e.pageX / cellSize) - 1,
        tempY = Math.floor(e.pageY / cellSize) - 1;

    if (tempX < 0) {
        tempX = 0
    }
    if (tempY < 0) {
        tempY = 0
    }

    document.getElementById("MouseX").value = tempX;
    document.getElementById("MouseY").value = tempY;

    if (tempX !== currentX || tempY !== currentY) {
        mouseMoved()
    }

}

//Handles functions triggered when mouse has moved.
function mouseMoved() {
    drawCursor();
}


//draws the crosshairs
function drawCursor() {
    eraseCursor();
    currentX = tempX;
    currentY = tempY;
    cursor.render(currentX, currentY);
}

//erases the crosshairs
function eraseCursor() {
    ui.clearRect(currentX * cellSize, currentY * cellSize, cellSize, cellSize);
    console.log(cellSize);
    console.log("x is : " + currentX * cellSize);
    console.log("Y is : " + currentY * cellSize);
}