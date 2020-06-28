class Button {
    constructor(centrePos, buttonWidth, buttonHeight, buttonText, buttonTextSize) {
      this.centralPos = centrePos;
      this.totalWidth = buttonWidth;
      this.totalHeight = buttonHeight;
      this.leftSideX = this.centralPos.x - this.totalWidth / 2;
      this.topSideY = this.centralPos.y - this.totalHeight / 2;
      this.buttonText = buttonText;
      this.colour = 100;
      this.buttonTextSize = buttonTextSize;
    };
      
    amPressed() {
      if (mouseIsPressed === true && mouseX < this.leftSideX + this.totalWidth && mouseX > this.leftSideX && mouseY < this.topSideY + this.totalHeight && mouseY > this.topSideY) {
        this.colour = 150;
        return true;
      } else {
        this.colour = 100;
        return false;
      }
    };
    show() {
      fill(this.colour);
      noStroke();
      rectMode(CORNER);
      rect(this.leftSideX, this.topSideY, this.totalWidth, this.totalHeight);
      fill(255);
      noStroke();
      textSize(this.buttonTextSize);
      textAlign(CENTER);
      text(this.buttonText, this.centralPos.x, this.centralPos.y + 3);
    };
  }
