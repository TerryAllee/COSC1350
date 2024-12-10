/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Terry Allee
 * Date: November 17th, 2024/ November 25th, 2024 / December 7th, 2024
 * Project for COSC 1350
 *
 */

// Variable for score tracking
let score = 0

// Function to update the score display
function updateScore() {
  document.getElementById("scoreContainer").innerText = `Score: ${score}`;
}

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");
//create a "2d rendering context".
const ctx = canvas.getContext("2d");


// Ball variables:  x position, y position, and radius
let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

//xy move distance. These values are used to move the ball around.
let xMoveDist = 3;
let yMoveDist = 3;

// Paddle width and height. Centering the paddle
const paddleWidth = 100; 
const paddleHeight = 15;
let paddleX = (canvas.width - paddleWidth) / 2 
const paddleSpeed = 20

// Moving the paddle
let moveLeft = false;
let moveRight = false;


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

/*
* draw() can be thought of as our main function.
* We execute draw every few milliseconds to give our
* canvas the appearance of being animated. Notice how in the draw function
* the first thing done is ctx.clearRect(), which clears the whole canvas
* Right now, it only calls ballRender() over and over again.
* Changing the xPos and yPos will cause the ball to be drawn somewhere else
* next time the function is called.
*/

// Draw  a red paddle on canvas.
function drawPaddle () {
  ctx.fillStyle = "red";
  ctx.fillRect(paddleX, canvas.height - paddleHeight -10, paddleWidth, paddleHeight);

}
// Draw the score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: 100", 8, 20);
}

// Reset the game
function resetGame() {
  // Stop the current game loop
  clearInterval(intervalID);

  // Reset all game elements
  score = 0;
  //update the score to 0
  updateScore(); 
  //Reset ball postion to horizonital
  xPos = canvas.width / 2;
  // Reset ball postiom to vertical 
  yPos = canvas.height / 2;
  // Reset paddle to the center
  paddleX = (canvas.width - paddleWidth) / 2;

  // Reset the bricks
  for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < brickColumns; col++) {
      // Mark all bricks as unhit
      bricks[row][col].hit = false; 
    }
  }

  // Start a new game loop
  intervalID = setInterval(draw, refreshRate);
}

//function that draws the ball on the canvas and set ball color
function ballRender() {
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  // Set color blue
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}


let frameCounter = 0;

/*
 * draw(): Main game loop function
 * This function will execute repeatedly to render the game and update.
 */


function draw() {
  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw game elements
  ballRender();
  drawPaddle();
  drawBricks(ctx);
  drawScore();

  // Ball movement
  xPos += xMoveDist;
  yPos += yMoveDist;

  // Handle wall collisions
  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist = -xMoveDist;
  }
  if (yPos < ballRadius) {
    yMoveDist = -yMoveDist;
  }

  // Handle paddle collisions
  if (
    yPos + ballRadius > canvas.height - paddleHeight - 10 &&
    xPos > paddleX &&
    xPos < paddleX + paddleWidth
  ) {
    yMoveDist = -yMoveDist;
  }

  // Check for game over
  if (yPos + ballRadius > canvas.height) {
    clearInterval(intervalID);
    alert("Game Over! Try Again.");
    resetGame();
  }

  // Handle brick collisions
  checkBrickCollisions();

  // Move paddle
  if (moveRight && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
  if (moveLeft && paddleX > 0) {
    paddleX -= paddleSpeed;
  }

  // Increments the frame counter
  frameCounter++;
}

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 * Try playing around with the refreshRate value.
 */


//  Define the bricks and layout
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

// Create the 2d array to hold bricks
let bricks = []
for (let row = 0; row < brickRows; row++) {
  bricks[row] = [];
  for (let col = 0; col < brickColumns; col++) {
    const brickX = brickLeftOffset + col * (brickWidth + brickPadding);
    const brickY = brickTopOffset + row * (brickHeight + brickPadding);
    bricks[row] [col] = {x: brickX, y: brickY, hit: false };
  }
}

// Debugging to check the array after initialization
// console.log(bricks);

//Draw the bricks on the canvas element
function drawBricks(ctx) {
  for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < brickColumns; col++) {
      const brick = bricks[row] [col];
      // Draws bricks that have not been hit
      if (!brick.hit) {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
        //color
        ctx.fillStyle = "pink";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//Add collision detection to the bricks
function checkBrickCollisions() {
  for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < brickColumns; col++) {
      const brick = bricks[row][col];
      if (!brick.hit) {
        if (
          xPos + ballRadius > brick.x &&
          xPos - ballRadius < brick.x + brickWidth &&
          yPos + ballRadius > brick.y &&
          yPos - ballRadius < brick.y + brickHeight
        ) {
          // Mark brick as hit
          brick.hit = true;
          // Reverse ball direction
          yMoveDist = - yMoveDist;
          // Increment score
          score += 10;
          updateScore();
        }
      }
    }
  }
}
// Attach the reset button functionality
document.getElementById("resetButton").addEventListener("click", resetGame);

// Intialize the score
updateScore();

// Set the game refresh rate and start the game loop
const refreshRate = 20;
let intervalID = setInterval(draw, refreshRate);