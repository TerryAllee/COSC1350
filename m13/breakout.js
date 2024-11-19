/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Terry Allee
 * Date: Novmeber 17th, 2024
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

/*  create a "2d rendering context".
 *  I suggest looking up and reading about the canvas.getContext function.
 *  You don't have to understand everything about canvas rendering contexts,
 *  but it helps you get to know what the ctx object can and can't draw.
 */

const ctx = canvas.getContext("2d");


//drawing a ball requires the x position, y position, and radius
let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

//xy move distance. These values are used to move the ball around.
let xMoveDist = 3;
let yMoveDist = 3;

// Paddle width and height. Centering the paddle
let paddleWidth = 100; 
let paddleHeight = 15;
let paddleX = (canvas.width - paddleWidth) / 2;

// Moving the paddle
let moveLeft = false;
let moveRight = false;
const paddleSpeed = 7


// Add the key event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Keydown handler function and move Right and Left
function keyDownHandler(event) {
  if (event.key === "ArrowRight" || event.key === "Right") {
    moveRight = true; 
  } else if (event.key === "ArrowLeft" || event.key === "Left") {
      moveLeft = true; 
    
  }
}

//Keyup handler function and stop moving right or left
function keyUpHandler(event) {
  if (event.key === "ArrowRight" || event.key === "Right") {
    moveRight = false;
  } else if (event.key === "ArrowLeft" || event.key === "Left") {
    moveLeft = false;
  }
}

//function that draws the ball on the canvas and set ball color
ballRender=()=>{
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  //fill in the circular path with default color
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

/*
* draw() can be thought of as our main function.
* We execute draw every few milliseconds to give our
* canvas the appearance of being animated. Notice how in the draw function
* the first thing done is ctx.clearRect(), which clears the whole canvas
* before drawing the next frame of animation.
*
* Right now, it only calls ballRender() over and over again.
* Changing the xPos and yPos will cause the ball to be drawn somewhere else
* next time the function is called.
*/

// Function that draws a red paddle on canvas.
function drawPaddle() {
  ctx.fillStyle = "red";
  ctx.fillRect(paddleX, canvas.height - paddleHeight -10, paddleWidth, paddleHeight);

}


draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the ball
  ballRender();
  
  // position the paddle and move paddle to the right
  if (moveRight && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
  
  // move the paddle to the left
  if (moveLeft && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  // draw the paddle
  drawPaddle();

  // move the ball
  xPos += xMoveDist;
  yPos += yMoveDist;

  // Bounce off the right and left walls
  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    // Reverse the horizontal direction
    xMoveDist =- xMoveDist;
  }
  
    // bounces off the top of the wall  
  if (yPos < ballRadius) {
  // Reverses to the vertical direction  
    yMoveDist =- yMoveDist
  }
  // bounces off the bottom wall
  if (yPos > canvas.height - ballRadius) {
  // Reverses in the veritcal direction
  yMoveDist = -yMoveDist;

  }

  // Request next frame
  requestAnimationFrame(draw);

};

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * Try playing around with the refreshRate value.
 */
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
