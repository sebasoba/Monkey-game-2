
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup;
var obstacleGroup;
var score
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas=(600,600);
  
  monkey = createSprite(10,10,500,200);
  monkey.velocityY=4;
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.12;
  
  ground = createSprite(200,390,900,20);
  ground.x = ground.width /2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;

  
}


function draw() {
 
  background(180);
  
  
  if(ground.x<100){
    ground.x=300;
  }
  
  
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    if(monkey.collide(ground)){
    monkey.velocityY=0;
  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    //if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        //gameState = END;
      
    //}
  }
   else if (gameState === END) {
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     
   }
  
  
  spawnbananas();
  spawnObstacles();
  drawSprites();
}

function spawnbananas() {
  
  if (frameCount % 80 === 0) 
  { banana = createSprite(600,120,40,10); 
   banana.y = random(260,180); banana.velocityX = -5;
   banana.lifetime = 300; 
   monkey.depth = banana.depth
   banana.addImage(bananaImage);
   banana.scale=0.1;
   FoodGroup.add(banana);
   
  }
}

function spawnObstacles() {
  
  if (frameCount % 60 === 0) 
  { obstacle = createSprite(600,370,40,10); 
   obstacle.velocityX = -5;
   obstacle.lifetime = 300; 
   obstacle.depth = obstacle.depth
   obstacle.addImage(obstaceImage);
   obstacle.scale=0.1;
   obstacleGroup.add(obstacle);
    
    
    
  }
  
  
}




