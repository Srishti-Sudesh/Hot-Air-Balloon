var database, balloonPosition, position;
var bg, balloon, balloonImg;

function preload(){
  bg = loadImage("images/bg.png");
  balloonImg = loadAnimation("images/1.png","images/2.png","images/3.png")
}

function setup() {
  database = firebase.database();

  createCanvas(1100,600);

  balloon = createSprite(300, 400, 50, 50);
  balloon.addAnimation("hotairballoon",balloonImg);
  balloon.scale = 0.4;

  balloonPosition = database.ref('ball/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bg);  

  textSize(20);
  fill("white");
  strokeWeight(3);
  stroke("black");
  text("Press the ARROW KEYS to move the hot air balloon",20,20);


  if(keyCode===UP_ARROW){
    balloon.y = balloon.y - 5;
    balloon.scale = balloon.scale + 0.003;
  }

 else if(keyCode===DOWN_ARROW){
    balloon.y = balloon.y + 5;
    balloon.scale = balloon.scale - 0.003;
  }  
 else if(keyCode===LEFT_ARROW){
    balloon.x = balloon.x - 5;
  }  
  else if(keyCode===RIGHT_ARROW){
    balloon.x = balloon.x + 5;
  }

  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
      'x' : position.x + x,
      'y' : position.y + y 
    })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing");
}




