var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage ,ground2;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclegroup;
var cloud,cloudAnim, cloudgroup;
var count;
var reset , resetImg;
var gameState ="play";
function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obstacle1 = loadAnimation("obstacle1.png");
  resetImg = loadImage("restart.png");
  obstacle2 = loadAnimation("obstacle2.png");
  obstacle3 = loadAnimation("obstacle3.png");
  obstacle4 = loadAnimation("obstacle4.png");
  obstacle5 = loadAnimation("obstacle5.png");
  obstacle6 = loadAnimation("obstacle6.png");

  groundImage = loadImage("ground.png");
  cloudAnim = loadAnimation("cloud.png");
}

function setup() {
  createCanvas(displayWidth - 500, 200);
  obstaclegroup = new Group();
  cloudgroup = new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,600,20);
  ground.addImage("sprite_0",groundImage);
  ground.x = ground.width /2;
 // ground.velocityX = -2;
  ground2 = createSprite(ground.width ,180 , displayWidth*5 , 20)
 // invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false;
  reset = createSprite(trex.x , 100 , 50 ,50);
  reset.visible = false;
  reset.addImage(resetImg)
  reset.scale = 0.175;
}

function draw() {
  background(180);
  if(gameState === "play"){
    spawnObstacles();
  spawnClouds();
  camera.position.x = trex.x;
  camera.position.y = 100;
  if(keyDown(RIGHT_ARROW)){
    trex.x = trex.x+10;
  }
  if(keyDown("space")&& trex.y > 154) {
    trex.velocityY = -10;
  }
  count = Math.round(World.frameCount/4);
  text("Score: " + count,500,40);
  trex.velocityY = trex.velocityY + 0.8
  if(trex.x>600){
    trex.x = 50;
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  }
 
  theEnd();
  console.log(gameState)
  trex.debug = true;
  trex.setCollider("Circle" ,0,0,30)

  trex.collide(ground);
  trex.collide(ground2);
  drawSprites();
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round( random(1,6));
   switch(rand){
     case 1:obstacle.addAnimation("ObstacleAnim",obstacle1);
     obstacle.scale = 0.1;
       break
    case 2:obstacle.addAnimation("ObstacleAnim2",obstacle2);
       break
     case 3:obstacle.addAnimation("ObstacleAnim3",obstacle3);
       break
      case 4:obstacle.addAnimation("ObstacleAnim4",obstacle4);
       break
     case 5:obstacle.addAnimation("ObstacleAnim5",obstacle5);
       break
      case 6:obstacle.addAnimation("ObstacleAnim6",obstacle6);
      default:break
   }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstaclegroup.add(obstacle);
  }
  }

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,180,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addAnimation("cloud",cloudAnim);
    cloud.scale = 0.2;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
  
}
function theEnd(){
  if(obstaclegroup.isTouching(trex) && gameState == "play"){
    gameState = "end"
 trex.velocityX = 0;
    cloudgroup.setVelocityXEach(0);
   obstaclegroup.setVelocityXEach(0);
  cloudgroup.setLifetimeEach(-1);
  obstaclegroup.setLifetimeEach(-1);
  reset.visible = true;
  }
  if(mousePressedOver(reset)&& gameState==="end"){
    gameState = "play"
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
     count = 0;
    reset.visible = false;
  }
  console.log(trex.y);
}