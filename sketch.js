var jerry;
var jerryImg;
var tom;
var tomImg;
var backgroundImg;
var bg;
var ground;
var obstaclesGroup;
var obstacleImg;
var gameState="play";
function preload() {
    
jerryImg=loadAnimation("images/jerryStand.png","images/Jerry_Rightside.png","images/Jerry_Run_Leftside.png");
tomImg=loadAnimation("images/tomStand.png","images/tomrun1.png","images/tomrun2.png");
backgroundImg=loadImage("images/bg1.jpg");
obstacleImg=loadAnimation("images/mouseTrap.png");

}

function setup(){
   createCanvas(windowWidth,windowHeight);
   

    bg=createSprite(width/2,height/2,windowWidth,windowHeight);
    bg.addImage("backgroundImage",backgroundImg);
    bg.velocityX=-3;

    jerry=createSprite(displayWidth/2,displayHeight/2+200,50,50);
    jerry.addAnimation("jerryImage",jerryImg);
    jerry.scale=2;

    ground=createSprite(windowWidth/2,windowHeight-50,displayWidth,10);
    ground.x = ground.width /2;
    ground.visible=false;

   tom=createSprite(displayWidth-1000,displayHeight/2+100,50,50);
    tom.addAnimation("tomImage",tomImg);
    tom.scale=10;

    obstaclesGroup = new Group();
}
    
function draw(){
    background("black");
    if(gameState="play"){
            if(keyDown("space")) {
                jerry.velocityY =-10;
            } 
                // add gravity
                jerry.velocityY=jerry.velocityY+0.85;
                jerry.collide(ground);
            if (bg.x < 0){
                bg.x = bg.width/2;
            }

             if(jerry.isTouching(obstaclesGroup)){
                gameState="end";
        }
        spawnObstacles();
 }
    if(gameState="end"){
        jerry.velocityY=0;
        bg.velocityX=0;
        
        obstaclesGroup.setVelocityXEach(0);

        obstaclesGroup.setLifetimeEach(-1);
    }
    drawSprites();
}

function spawnObstacles(){
    if(frameCount%6===75){
        var obstacle=createSprite(displayWidth-200,rand,50,50);
        obstacle.addAnimation("obstacle",obstacleImg);
        var rand=Math.round(random(500,1000));
            obstacle.scale = 0.5;
             obstacle.lifetime = 300;
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);

     
    }
}
