// Name any p5.js functions we use in the global so Glitch can recognize them.    *
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, DOWN_ARROW, 
          RIGHT_ARROW, LEFT_ARROW, collideRectCircle, ENTER */

let backgroundColor,
  frogX,
  frogY,
  score,
  lives,
  gameIsOver,
  powerUpX,
  powerUpY,
  car1X,
  car1Y,
  car1V,
  car2X,
  car2Y,
  car2V,
  car3X,
  car3Y,
  car3V,
  hit,
  hit2,
  hit3,
  car4X,
  car4Y,
  car4V,
  hit4,
  level;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  noStroke();
  frogX = width / 2;
  frogY = height - 20;
  score = 0;
  lives = 3;
  level = 1;
  gameIsOver = false;
  powerUpX = random(height);
  powerUpY = random(width);
  car1X = 0;
  car1Y = 100;
  car1V = 6;

  car2X = 0;
  car2Y = 200;
  car2V = 5;

  car3X = 0;
  car3Y = 300;
  car3V = 4;

  car4X = 0;
  car4Y = 400;
  car4V = 3;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  fill("blue");
  ellipse(powerUpX, powerUpY, 10);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 30;
  } else if (keyCode === DOWN_ARROW) {
    frogY += 20;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += 20;
  } else if (keyCode === ENTER) {
    gameIsOver = false;
    frogX = width / 2;
    frogY = height - 20;
    score = 0;
    lives = 3;
    drawCars();
  }
}

function moveCars() {
  // Move the car
  // Reset if it moves off screen
  if (gameIsOver) {
    return;
  }
  car1X += car1V;
  if (car1X >= width) {
    car1X = -40;
  }
  car2X += car2V;
  if (car2X >= width) {
    car2X = -30;
  }

  car3X += car3V;
  if (car3X >= width) {
    car3X = -50;
  }

  car4X += car4V;
  if (car4X >= width) {
    car4X = -60;
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  fill(170, 80, 80);
  rect(car2X, car2Y, 40, 30);

  fill(78, 100, 80);
  rect(car3X, car3Y, 40, 30);

  fill(289, 100, 80);
  rect(car4X, car4Y, 40, 30);
}

function checkCollisions() {
  if (gameIsOver) {
    return;
  }
  // If the frog collides with the car, reset the frog and subtract a life.
  hit = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  hit2 = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  hit3 = collideRectCircle(car3X, car3Y, 40, 30, frogX, frogY, 20);
  hit4 = collideRectCircle(car4X, car4Y, 40, 30, frogX, frogY, 20);
  if (hit || hit2 || hit3 || hit4) {
    lives--;
    frogX = width / 2;
    frogY = height - 20;
  }
}

function powerUps() {
  if (powerUpX == frogX && powerUpY == frogY) frogX;
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (gameIsOver) {
    return;
  }

  if (lives <= 0) {
    gameIsOver = true;
  }

  if (frogY <= 50) {
    score++;
    level++;
    frogX = width / 2;
    frogY = height - 20;
    car1V += 2;
    car2V += 2;
    car3V += 2;
    car4V += 2;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 33);
  //Display level
  text(`Level: ${level}`, 10, 45);
  // Display game over message if the game is over
  if (gameIsOver) {
    text("GAME OVER", width / 2 - 30, height / 2);
    text("press 'enter' to start over", width / 2 - 50, height / 2 + 20);
  }
}
