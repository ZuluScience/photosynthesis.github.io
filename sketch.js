let plant;
let lamp;
let timer;
let colourOfWater = (80, 150, 255);
let backgroundCol = (50, 150, 100);
let green = (54, 255, 0);
let distanceButtons = [];
let intensityButtons = [];
let colourButtons = [];
let concentrationButtons = [];
let rOfLight;
let gOfLight;
let bOfLight;
let lampPos;
let wavelength;
let state;
let intensity = 0;
let concentration = 0;
let colour;
let restartButton;
let runButton;
let bubbles = [];
let totalOxygen;
function preload() {
  plant = loadImage('https://i.ibb.co/48WLjkz/plant.jpg');
  lamp = loadImage('https://i.ibb.co/P566x1K/lamp.jpg');
}
function drawLamp(xPos) {
  push();
  let width = 100;
  let height = 150;
  translate(xPos - width / 2,500 - height);
  image(lamp, 0, 0, width, height);
  pop();
}
function drawLight(rcolour, bcolour, gcolour, intensity, lampPos, lampSize) {
  stroke(rcolour, bcolour, gcolour);
  strokeWeight(1);
  let originPoint = createVector(lampPos.x + lampSize.x / 2 - 10, lampPos.y + lampSize.y / 3);
  let angleOff = HALF_PI / (intensity + 1);
  for (let i = 0; i < intensity; i ++) {
    let angleToDraw = -QUARTER_PI + angleOff * (i + 1);
    push();
    translate(originPoint.x, originPoint.y);
    rotate(angleToDraw);
    line(30, 0, 105, 0);
    pop();
  }
}
function drawSetup() {
  // draw beaker
  push();
  let pos = createVector(475, 500);
  
  translate(pos.x, pos.y);
  scale(2, 2);
  let height = 100;
  let width = 45;
  let radius = 10;
  stroke(255);
  strokeWeight(1);
  noFill();
  arc(0 - width, 0 - (height - radius), 2 * radius, 2 * radius, 3 * HALF_PI, 0);
  arc(0 + width, 0 - (height - radius), 2 * radius, 2 * radius, PI, 3 * HALF_PI);
  line(0 - (width - radius), 0 - (height - radius), 0 - (width - radius), 0 - radius);
  line(0 + (width - radius), 0 - (height - radius), 0 + (width - radius), 0 - radius);
  arc(0 - (width - 2 * radius), 0 - radius, 2 * radius, 2 * radius, HALF_PI, PI);
  arc(0 + (width - 2 * radius), 0 - radius, 2 * radius, 2 * radius, 0, HALF_PI);
  line(0 - (width - 2 * radius), 0, 0 + (width - 2 * radius), 0);
  //draw all water
  fill(80, 150, 255);
  noStroke();
  rect(-width + radius + 1, -height + radius, 2 * width - 2 * radius - 2, height - radius * 2 );
  rect(-width + 2 * radius, -radius, 2 * (width - 2 * radius), radius);
  arc(width - 2 * radius, -radius, 2 * radius - 1, 2 * radius - 1, 0, HALF_PI);
  arc(-width + 2 * radius, -radius, 2 *radius - 1, 2 *radius - 1, HALF_PI, PI);
  //draw funnel and test tube
  let baseFunnelWidth = 50;
  let baseFunnelHeight = 40;
  let topFunnelWidth = 10;
  let topFunnelHeight = 70;
  strokeWeight(2);
  stroke(255);
  
  line(0 - baseFunnelWidth / 2, 0, 0 - topFunnelWidth / 2, 0 - baseFunnelHeight);
  line(0 + baseFunnelWidth / 2, 0, 0 + topFunnelWidth / 2, 0 - baseFunnelHeight);
  line(0 - topFunnelWidth / 2, 0 - baseFunnelHeight, 0 - topFunnelWidth / 2, 0 - baseFunnelHeight - topFunnelHeight);
  line(0 + topFunnelWidth / 2, 0 - baseFunnelHeight, 0 + topFunnelWidth / 2, 0 - baseFunnelHeight - topFunnelHeight);
  arc(0, 0 - baseFunnelHeight - topFunnelHeight, topFunnelWidth, topFunnelWidth, PI, 0);
  
  //draw water
  fill(80, 150, 255);
  noStroke();
  quad(0 - baseFunnelWidth / 2 + 1, 0, 0 + baseFunnelWidth / 2 - 1, 0, 0 + topFunnelWidth / 2 - 1, 0 - baseFunnelHeight, 0 - topFunnelWidth / 2 + 1, 0 - baseFunnelHeight);
  rect(- topFunnelWidth / 2 + 1,- baseFunnelHeight - topFunnelHeight, topFunnelWidth - 2, topFunnelHeight);
  noStroke();
  arc(0, - baseFunnelHeight - topFunnelHeight, topFunnelWidth - 2, topFunnelWidth - 2, PI, 0)
  //draw plant
  let plantWidth = 20;
  let plantHeight = 20;
  image(plant, -plantWidth / 2, -plantHeight, plantWidth, plantHeight);
  pop();
  //draw ground
  fill(0);
  noStroke();
  rect(0, pos.y + 1, 600, 600);
}
function drawOxygen(totalOxygen) {
  let deltaHeight = 2;
  fill(50, 150, 100);
  noStroke();
  if (totalOxygen.x > 0) {
    arc(475, 280, 16, 16, PI, 0);
  }
  if (totalOxygen.x > 1) {
    rect(467, 280, 16, (totalOxygen.x - 1) * deltaHeight);
  }
}
function drawBubble(bubbles, bubblesPerMin, timer, startPos, totalOxygen) {
  Period = 60 / bubblesPerMin;
  let endPos = 285 + totalOxygen.x * 2;
  function makeBubble(bubbles, startPos) {
    bubbles.push(createVector(475, startPos));
  }
  function move(bubbles, endPos, totalOxygen) {
    for (let i = 0; i < bubbles.length; i ++) {
      bubbles[i].y -= 1;
      if (bubbles[i].y < endPos) {
        bubbles.splice(i, 1);
        totalOxygen.x ++;
      }
    }
  }
  function drawing(bubbles) {
    noFill();
    stroke(255);
    strokeWeight(2);
    for (let bubble of bubbles) {
      ellipse(475, bubble.y, 10, 10);
    } 
  }
  if (((frameCount - timer) / 30) % floor(Period) === 0 && frameCount - timer > 1) {
    makeBubble(bubbles, startPos);
  }
  move(bubbles, endPos, totalOxygen);
  drawing(bubbles);
  return totalOxygen;
}
function calculateRateOfPhot(intensity, concentration, wavelength, distance) {
  let intensityCalc = intensity / distance / distance;
  let conCalc = constrain(concentration, 0, 0.1);
  let colourCalc = abs(wavelength - 520);
  let rateOfPhot = intensityCalc * conCalc * colourCalc;
  return rateOfPhot * 120;
}
function setup() {
  frameRate(30);
  createCanvas(600, 600);
  restartButton = new Button(createVector(40, 40), 60, 30, 'RESTART', 11);   
  runButton = new Button(createVector(40, 80), 60, 30, 'GO', 11); 
  for (let i = 0; i < 7; i++) {
    distanceButtons[i] = new Button(createVector(25 + 38 * i, 520), 15, 15, '', 1);
  }
  
  for (let i = 0; i < 10; i++) {
    intensityButtons[i] = new Button(createVector(350 + 25 * i, 200), 15, 15, i + 1, 10);
  }
  for (let i = 0; i < 10; i++) {
    concentrationButtons[i] = new Button(createVector(350 + 25 * i, 125), 15, 15, i + 1, 10);
  }
  wavelength = 420;
  let OFF = 12;
  let purpleButton = new Button(createVector(350 + OFF, 50), 30, 15, 'Purple', 10);
  let blueButton = new Button(createVector(390+ OFF, 50), 30, 15, 'Blue', 10);
  let greenButton = new Button(createVector(430+ OFF, 50), 30, 15, 'Green', 10);
  let yellowButton = new Button(createVector(470+ OFF, 50), 30, 15, 'Yellow', 10);
  let redButton = new Button(createVector(510+ OFF, 50), 30, 15, 'Red', 10);
  let brownButton = new Button(createVector(550+ OFF, 50), 30, 15, 'Brown', 10);

  colourButtons.push(purpleButton);
  colourButtons.push(blueButton);
  colourButtons.push(greenButton);
  colourButtons.push(yellowButton);
  colourButtons.push(redButton);
  colourButtons.push(brownButton);
  lampPos = 215;
  state = 'set';
  totalOxygen = createVector(0, 0);
}
function draw() {
  background(50, 150, 100);
  drawLamp(lampPos);
  drawSetup();
  runButton.show();
  restartButton.show()
  if (runButton.amPressed() && state === 'set') {
    state = 'go';
    timer = frameCount;
    totalOxygen = createVector(0, 0);
  }
  if (restartButton.amPressed() || totalOxygen.x > 60) {
    state = 'set';
    totalOxygen.x = 0;
  }
  textAlign(CENTER);
  textSize(17);
  fill(255);
  noStroke();
  text('Control the Lamp\'s Position', 139, 550);
  textSize(17);
  fill(0);
  noStroke();

  textAlign(CENTER);
  textSize(17);
  fill(0);
  text('Control the Lamp\'s Brightness', 462.5, 175);
  textAlign(CENTER);
  textSize(17);
  fill(0);
  text(intensity + ' units', 310, 190);
  text((475 - lampPos) / 10 + ' cm', lampPos, 325);

  textAlign(CENTER);
  textSize(17);
  fill(0);
  text('Control the CO2 concentration', 462.5, 100);
  textAlign(CENTER);
  textSize(17);
  fill(0);

  textAlign(CENTER);
  textSize(17);
  fill(0);
  text('Control the Lamp\'s Light Colour', 462.5, 25);
  textAlign(CENTER);
  textSize(17);
  fill(0);
  text(colour, 315, 40);
  text(concentration + '%', 320, 115);
  if (state === 'set') {
    for (let button of distanceButtons) {
      button.show();
      if (button.amPressed()) {
        lampPos = button.centralPos.x;
      }
    } 
    
    for (let button of intensityButtons) {
      button.show();
      if (button.amPressed()) {
        intensity = button.buttonText;
      }
    }
    
    for (let button of concentrationButtons) {
      button.show();
      if (button.amPressed()) {
        concentration = button.buttonText / 50;
      }
    }
    
    for (let i = 0; i < colourButtons.length; i ++) {
      colourButtons[i].show();
      if (colourButtons[i].amPressed()) {
        switch(i) {
          case 0:
            //purple
            wavelength = 390;
            rOfLight = 121;
            gOfLight = 0;
            bOfLight = 141;
            colour = 'Purple';
            break;
          case 1:
            //blue
            wavelength = 447;
            rOfLight = 0;
            gOfLight = 53;
            bOfLight = 255;
            colour = 'Blue';
            break;
          case 2:
            //green
            wavelength = 513;
            rOfLight = 21;
            gOfLight = 255;
            bOfLight = 0;
            colour = 'Green';
            break;
          case 3:
            //yellow
            wavelength = 580;
            rOfLight = 255;
            gOfLight = 255;
            bOfLight = 0;
            colour = 'Yellow';
            break;
          case 4:
            //red
            wavelength = 647;
            rOfLight = 255;
            gOfLight = 0;
            bOfLight = 0;
            colour = 'Red';
            break; 
          case 5:
            //brown
            wavelength = 758;
            rOfLight = 145;
            gOfLight = 0;
            bOfLight = 0;
            colour = 'Brown';
            break;   
          default:
            rOfLight = 21;
            gOfLight = 255;
            bOfLight = 0;
            colour = 'Green';
            wavelength = 513;  
            break;
        }
      }
    }  
  } else {
    textSize(20);
    fill(0);
    textAlign(CENTER);
    text('Rate of Photosynthesis:', 120, 200);
    textSize(20);
    fill(0);
    textAlign(CENTER);
    text(floor(calculateRateOfPhot(intensity, concentration, wavelength, (475 - lampPos) / 10)) + ' Bubbles Per Minute', 120, 230);
    textSize(15);
    fill(0);
    textAlign(CENTER);
    text('This will reset after 60 bubbles', 120, 260)
    drawOxygen(drawBubble(bubbles, calculateRateOfPhot(intensity, concentration, wavelength, (475 - lampPos) / 10), timer, 480, totalOxygen));
  }
  drawLight(rOfLight, gOfLight, bOfLight, intensity, createVector(lampPos, 350), createVector(100, 150));
  
}
