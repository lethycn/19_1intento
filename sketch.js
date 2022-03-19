// idea niña corriendo para llegar a la escuela 
var PLAY = 0;
var END = 0;
var gameState = PLAY ;

var girl,girl_running,girl_collided;
var ground,invisibleGround,groundImage;

var obstaclesGroup,dog,bandido;

var score;

var gameOverImg,restartImg;
//poner a cargar todos
function preload(){
    // la chica
girl_running = loadImage("girl.png","girl2.png");
girl_collided = loadImage();
//el paisage
groundImage = loadImage("ground.jpeg");
//los obstaculos
dog = loadImage("dog.png");
bandido = loadImage("bandido.png");

//empezar y terminar
gameOverImg = loadImage("gameover.png");
restartImg = loadImage("reset.png");

}

//crear la imagen 
function setup() {
    createCanvas (300,700);
       //la chica 
    girl = createSprite(35,200,10,10);
    girl.addImage ("running",girl_running);
    girl.addImage("collided", girl_collided);
    girl.scale = 0.4;
   // el paisage
    ground = createSprite(300,700,300,300);
   ground.addImage ("ground",groundImage);
   ground.scale = 10;
   
               //por sí me equivoco;)
   //dog = createSprite(35,200,10,10);
   //dog.addImage("dog",dogImage);
   //dog.scale= 0.2;
   
   //bandido= createSprite(20,200,10,10);
   //bandido.addImage("bandido",bandidoImage);
   //bandido.scale=0.2;
   
   //el terminar
   gameOver = createSprite();
   gameOver.addImage(gameOverImg);
   gameOver.scale=0.4;
   //el comenzar
   restat = createSprite( );
   restat.addImage ( restatImg);
   restat.scale= 0.4;
   // el suelo
   invisibleGround=createSprite(300.700,300,300);
   invisibleGround.visible= false;
   //grupos
   obstaclesGroup = createGroup();
   //los erores
   girl.setCollider("circle",3,5,60);
   girl.debug= true;
   // puntuacion
   score= 0;
   }
   function draw() {
    background(90);
   //la puntuacion
   Text("score:"+ score,500,50);
   
   //para comenzar
    if (gameState == PLAY){
   gameOver.visible= false;
   restartImg.visible= false;
   
   girl.changeImage("running",girl_running);
   //mover el suelo
   ground.velocityX=-5;
   //puntuacion 2
   score=score + Math.round(getFrameRate()/30);
   if (score>0 && score%100==0){
   
   
   }
   if (ground.x<0){
   ground.x=ground.whith/2;
   }
   if(keyDow("space")&& girl.y>= 100){
   girl.velocityY= 0.5;
   }
    }
    //agregar gravedad
    girl.velocityY= girl.velocityY+ 0.4;
    //aparecer obstaculos en el suelo
    spawObstacles();
   
   //para que se destrua girl al tocar "DOG"
    if(obstaclesGroup.isThouching(girl)){
   gameState = END;
    }
    else if (gameState==END){
   gameOver.visible=true;
   restartImg.visible =true;
   
   ground.velocityX = 0;
   girl.velocityX = 0;
   girl.velocityY = 0;
   //volver de nuevo
   if (mousePressedOver(restart)){
   reset();
   }
   //cambiar la animacion de la girl
   girl.changeImage("collided",girl_collided);
       //lifetime
       obstaclesGroup.setLifetimeEach(-1);
       obctaclesGroup.setVelocityXEach(0);
    }
    //evitar que lak girl caiga
    girl.collide(invibleGround);
   
   
   
   
    drawSprites();
   }
   
   //aparecer obstaculos 
   function spawnObstacles(){
   if (frameCount % 30 ==0){
   var obstacle = createSprite ( 300,165,10,40);
   obstacle.velocityX = (6+score/100);
   //generar obstaculos al azar 
   var rand = Math.round(random(1,5));
   switch (rand){
       case 1: obstacle.addImage(dog);
           break;
       case 2: obstacle.addImage(bandido);
           breack;
       default:break;
   }
   obstacle.scale=0.5;
   obstacle.lifeTime= 300;
   //agregar todos los obstaculos a un grupo
   obstaclesGroup.add(obstacle);
   }
   }
   function reset (){
   gameState= PLAY;
   obstaclesGroup.destroyEach();
   girl.changeImage("running",girl_running);
   score=0;
   }   














