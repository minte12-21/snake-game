//snake game 
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

// Get the score display element
const scoreDisplay = document.getElementById("scoreDisplay");

const scale = 20;
const rows = canvas.height/scale;
const columns =canvas.width/scale;
  

let score = 0;
let snake = [];


snake[0]={
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
}

ctx.fillStyle = "white";
ctx.strokestyle = "red"
ctx.fillRect(snake[0].x, snake[0].y, scale,scale);

let d = "right";

document.onkeydown = direction;
function direction(event){
  let key = event.keyCode;
  if(key == 37 && d!="right"){
    d ="left";
  }
  if(key == 40 && d!="down"){
    d ="up";
  }
  if(key == 39 && d!="left"){
    d ="right";
  }
  if(key == 38 && d!="up"){
    d ="down";
  }
}

let food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
}

let playgame = setInterval(draw, 100);

// Function to update score display
function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(i=0;i<snake.length;i++){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red"
    ctx.fillRect(snake[i].x, snake[i].y, scale,scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale,scale)
  }

  for(i=0;i<snake.length;i++){
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "yellow"
    ctx.fillRect(food.x, food.y, scale,scale);
    ctx.strokeRect(food.x, food.y, scale,scale)
  }
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
   
  if(d=="left") snakeX -=scale;
  if(d=="right") snakeX +=scale;
  if(d=="down") snakeY -=scale;
  if(d=="up") snakeY +=scale;
   

  if(snakeX >= canvas.width){  
    snakeX = 0;
  }
  if(snakeY >= canvas.height){ 
    snakeY = 0;
  }
  if(snakeX < 0){              
    snakeX = canvas.width - scale;  
  }
  if(snakeY < 0){
    snakeY = canvas.height - scale; 
  }
  
  let newHead={
    x: snakeX,
    y: snakeY,
  };

  // FIRST: Check if food is eaten
  let foodEaten = false;
  if(snakeX==food.x && snakeY==food.y){
    foodEaten = true;
    score++;
    updateScore();
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
  }

  // SECOND: Check collision with body
  // We need to check ALL segments including tail
  for(let i = 0; i < snake.length; i++) {
    if(snake[i].x === newHead.x && snake[i].y === newHead.y) {
      // If food was eaten and this is the tail, it's NOT game over
      if(foodEaten && i === snake.length - 1) {
        // The tail will move, so it's safe
        continue;
      }
      // Otherwise, game over!
      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText("GAME OVER", 100, 200);
      
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText("Final Score: " + score, 130, 250);
      
      clearInterval(playgame);
      return;
    }
  }

  // THIRD: Remove tail if food was NOT eaten
  if(!foodEaten) {
    snake.pop();
  }
  
  // FOURTH: Add new head
  snake.unshift(newHead);
}