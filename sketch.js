var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var cactus, cac1, cac2, cac3, cac4, cac5, cac6, cac6
var score=0

var obstaclesGroup

var newImage;

var play=1
var over=0
var gameState=play

var gameover,gameover1

var reset,reset1;

var checkP,die,jump;
var bg,bg1

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  cac1 = loadImage("obstacle1.png")
  cac2 = loadImage("obstacle2.png")
  cac3 = loadImage("obstacle3.png")
  cac4 = loadImage("obstacle4.png")
  cac5 = loadImage("obstacle5.png")
  cac6 = loadImage("obstacle6.png")

  gameover1=loadImage("gameOver.png")
  reset1=loadImage("restart.png")
  
  checkP=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  bg1=loadImage("bg.png")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  //trex.setCollider("rectangle",0,0,200,100)
 //trex.debug=true
  
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  console.log("Hello" + 5)
  
  
  obstaclesGroup=createGroup()
  cloudsGroup=createGroup()

  gameover=createSprite(300,60,10,10)
  gameover.addImage(gameover1)
  
  reset=createSprite(300,110,10,10)
  reset.addImage(reset1)
  reset.scale=0.5
}

function draw() {
  background(bg1);
  
  if(gameState===play){
    
    trex.changeAnimation("running",trex_running)
    obstacle()
    ground.velocityX =-(score/100+5)
     score=score+round(getFrameRate()/60)
    
     if (keyDown("space") && trex.y >= 160) {
    trex.velocityY = -15;
       jump.play()
  }
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    
    spawnClouds();
  
  
    if(obstaclesGroup.isTouching(trex)){
      gameState=over  
      die.play()
     // trex.velocityY=-12
  }
    
    if(score>100&&score<800){
   background("black")
    }
    
    else if(score>1000&&score<1600){
      background("lightblue")
      
    }
    
    gameover.visible=false;
    reset.visible=false;
    
    if(score%100===0&&score!=0){
      checkP.play()
    }
    
  }
  else if(gameState===over){
    ground.velocityX = -0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.velocityY=0
    trex.changeAnimation("collided",trex_collided)
    gameover.visible=true;
    reset.visible=true;
    if(mousePressedOver(reset)){
      restart()
    }
  }
  
  
  
  
  
  
  
  fill("red")
  text("Score: "+score,300,20)

 

  


  //console.log(mouseX+" x")
  //console.log(mouseY+" y")
  trex.collide(invisibleGround);

  //spawn the clouds
  
 

  
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;


    //assigning lifetime to the variable
    cloud.lifetime = 230

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud)
  }
}

function obstacle() {
  if (frameCount % 80 === 0) {
    cactus = createSprite(600, 160, 10, 10)
    cactus.velocityX = -(score/100+5)
    cactus.scale=0.6
    cactus.lifetime=200
    var num = round(random(1, 6))

    switch (num) {
      case 1:
        cactus.addImage(cac1)
        break
      case 2:
        cactus.addImage(cac2)
        break
      case 3:
        cactus.addImage(cac3)
        break
      case 4:
        cactus.addImage(cac4)
        break
      case 5:
        cactus.addImage(cac5)
        break
      case 6:
        cactus.addImage(cac6)
        break
    }
    obstaclesGroup.add(cactus)
        
        
  }

    
}
  
function restart(){
  gameState=play
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach()
  score=0
}  
  
  