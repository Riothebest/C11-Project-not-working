var bomb, bombImg
var coin, coinImg
var energyDrink, energyDrinkImg;
var runner, runnerImg;
var path,pathImg;
var power,powerImg;
var gameState;
var inviswall1;
var inviswall2;

function preload(){
  //pre-load images
  runnerImg = loadAnimation("Runner-1.png","Runner-2.png");

  bombImg = loadImage("bomb.png");

  coinImg = loadImage("coin.png");

  energyDrinkImg = loadImage("energyDrink.png");

  pathImg = loadImage("path.png");

  powerImg = loadImage("power.png");

  gameState = "start";
}

function setup(){
  createCanvas(500,550);

  //create sprites here
  path = createSprite(200,100,10,10);
  path.addImage(pathImg);
  path.velocityY = 3;
  path.visible = false;
  //  path.scale = 0.5;

  runner = createSprite(200,430,10,10);
  runner.addAnimation("r",runnerImg);
  runner.scale = 0.05;
  runner.visible = false;

  
  energyDrink = createSprite(260,100,10,10);
  energyDrink.addImage(energyDrinkImg);
  energyDrink.scale = 0.05;

  power = createSprite(290,100,10,10);
  power.addImage(powerImg);
  power.scale = 0.05;

  inviswall1 = createSprite(62,275,20,550);
  inviswall1.shapeColor = "white";
  inviswall1.visible = false;
  inviswall2 = createSprite(337,275,20,550);
  inviswall2.shapeColor = "white";
  inviswall2.visible = false;
}

function draw() {
  background("black");

  runner.collide(inviswall1);
  runner.collide(inviswall2);

  if(path.y > 500)
  {
      path.y = 30;
  }

  if(gameState == "start")
  {
    fill("red");
    textSize(30);
    text("Press T to Start",30,200);
    text("Left and Right arrows",30,240);
    text("to move",100,280)
  }

  

  if(keyWentDown("t"))
  {
    gameState = "play";
  }

  if(gameState=="play")
  {
    runner.visible = true;
    path.visible = true;
    inviswall1.visible = true;
    inviswall2.visible = true;

    bombSpawn();
    coinSpawn();

    if(keyDown("right"))  
    {
      runner.x += 3;
    }

    if(keyDown("left"))
    {
      runner.x -= 3;
    }

    if(runner.isTouching(coin))
    {
      gameState = "end";
    }

    /*if(runner.overlap(bomb))
    {
      gameState = "end";
    }*/
  }
  drawSprites();
  textSize(15);
  fill("white");
  text(mouseX + "," + mouseY, mouseX, mouseY);
  youpressedR();

  if(gameState == "end")
  {
    fill("red");
    textSize(30);
    text("Press R to Restart",30,200);
    
  }
 
}
function bombSpawn()
{
  if(frameCount%90 == 0)
  {
    bomb = createSprite(Math.round(random(80,310)),-10,10,10);
    bomb.addImage(bombImg);
    bomb.scale = 0.05
    bomb.velocityY = 3;
    runner.depth = bomb.depth +1 
  }
}

function coinSpawn()
{
  if(frameCount%360 == 0)
  {
    coin = createSprite(230,-10,10,10);
    coin.addImage(coinImg);
    coin.scale = 0.3;
    coin.velocityY = 3;
    runner.depth = coin.depth +1 
  }
}

function youpressedR()
{
  if(keyWentDown("r"))
  {
    gameState = "start";
  }
}