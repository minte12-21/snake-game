console.log("hello world");


const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

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
   
// Fix these lines in your code:
if(snakeX >= canvas.width){  // Fixed: >= instead of >
    snakeX = 0;
}
if(snakeY >= canvas.height){ // Fixed: >= instead of >
    snakeY = 0;
}
if(snakeX < 0){              // Fixed: 0 instead of O
    snakeX = canvas.width - scale;  // Fixed: 380, not 400
}
if(snakeY < 0){
    snakeY = canvas.height - scale; // Fixed: 380, not 400
}
  let newHead={
    x: snakeX,
    y: snakeY,

  };

  if(snakeX==food.x && snakeY==food.y){
  food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
};
  }
  else {
 snake.pop(); 
  }
   // Check self-collision AFTER possible tail removal
  for(let i = 0; i < snake.length; i++) {
    if(snake[i].x === newHead.x && snake[i].y === newHead.y) {
      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText("GAME OVER", 100, 200);
      clearInterval(playgame);
      return;
    }
  }
snake.unshift(newHead);

}