/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Terry Allee
 * Date: Novmeber 17th, 2024/ November 25th, 2024
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");
/*
 *  I suggest looking up and reading about the canvas.getContext function.
 *  You don't have to understand everything about canvas rendering contexts,
 *  but it helps you get to know what the ctx object can and can't draw.
 */

/*  create a "2d rendering context".
const ctx = canvas.getContext("2d");


//drawing a ball requires the x position, y position, and radius
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
ballRender=() => {
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
* Right now, it only calls ballRender() over and over again.
* Changing the xPos and yPos will cause the ball to be drawn somewhere else
* next time the function is called.
*/

// Draw  a red paddle on canvas.
drawPaddle = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(paddleX, canvas.height - paddleHeight -10, paddleWidth, paddleHeight);

}


draw = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ballRender();

  // draw the paddle
  drawPaddle();

  // Draw bricks
  drawBricks(ctx);

  // Checks for brick collisions
  checkBrickCollisions();


  
  // position the paddle and move paddle to the right
  if (moveRight && paddleX < canvas.width - paddleWidth) {
  paddleX += paddleSpeed;
  }
  
  // move the paddle to the left
  if (moveLeft && paddleX > 0) {
    paddleX -= paddleSpeed;
  }

  // move the ball
  xPos += xMoveDist;
  yPos += yMoveDist;

  // Wall collisions
  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist =- xMoveDist;
  }
  if (yPos < ballRadius) {  
    yMoveDist =- yMoveDist
  }

  // Bottom wall logic
  if (
    // Near the paddle
    yPos + ballRadius > canvas.height - paddleHeight - 10 &&
    // Within paddle's left edge
    xPos > paddleX && 
    // Within the paddle's right edge
    xPos < paddleX + paddleWidth
  ) {
    // Reverse the ball
    yMoveDist = -yMoveDist;
  } 
  if (yPos + ballRadius > canvas.height) {
    // Ball misses the paddle
    // clearInterval(intervalID);
    alert("Game Over! Try Agian.");
    document.location.reload(); 
  }
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


//  Define the bricks and layout
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

//Define the array of brick objects
const bricks =[];
for (let row = 0; row < brickRows; row++) {
  bricks[row] =[];
  for (let col = 0; col < brickColumns; col++) {
    const brickX = brickLeftOffset + col * (brickWidth + brickPadding);
    const brickY = brickTopOffset + row * (brickHeight + brickPadding);
    bricks[row] [col] = {x: brickX, y: brickY, hit: false };
  }
}

console.log(bricks);

//Draw the bricks on the canvas element

function drawBricks(ctx) {
  for (let row = 0; row < brickRows; row++) {
    for (let col =0; col < brickColumns; col++) {
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
      const brick = bricks [row] [col];
      console.log(`Checking brick at row ${row}, column ${col}`);
      
      // checks for unhit bricks
      if (!brick.hit) {
        if (
          xPos > brick.x &&
          xPos < brick.x + brickWidth &&
          yPos > brick.y &&
          yPos < brick.y + brickHeight
        ) {
          console.log(`Collision detected with brick at row ${row}, column ${col}`);
          // Marks the brick as hit
          brick.hit = true;
           // Reverse ball's vertical direction
           yMoveDist = -yMoveDist;
          
           // Log when a collision is detected
           console.log(`Brick hit at row ${row}, column ${col}`);
          
          // Exit once a brick has been hit
          return;
        } 
        else {
          console.log(`No collision with brick at row ${row}, column ${col}`);     
        }
      }
    }
  }
}


// Go back and edit the brick drawing function to check whether 
//* the hit status of the brick indicates to draw the brick or not.

// Add collision detection to the paddle by modifying the bottom 
// * wall of the game's logic in the draw function
