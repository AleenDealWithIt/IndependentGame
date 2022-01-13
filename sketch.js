var ranger, rangerImg;
    
var backgroundImg;
var asteroid1Img, asteroid2Img;
var spaceship, spaceshipImg;
var enemy, enemyImg;
var earthBg, earthBgImg;
var energyBeam, energyBeamImg;
var restart, restartImg;
var flag = 0
var score = 0

function preload(){

  backgroundImg = loadAnimation("assets/Background.png");
  rangerImg = loadAnimation("assets/Ranger-1.png", "assets/Ranger-2.png", "assets/Ranger-3.png", "assets/Ranger-4.png", "assets/Ranger-5.png",
                        "assets/Ranger-6.png", "assets/Ranger-7.png", "assets/Ranger-8.png", "assets/Ranger-9.png", "assets/Ranger-10.png",
                        "assets/Ranger-11.png", "assets/Ranger-12.png", "assets/Ranger-13.png", "assets/Ranger-14.png", "assets/Ranger-15.png",
                        "assets/Ranger-16.png", "assets/Ranger-17.png", "assets/Ranger-18.png", "assets/Ranger-19.png", "assets/Ranger-20.png",
                        "assets/Ranger-21.png", "assets/Ranger-22.png", "assets/Ranger-23.png", "assets/Ranger-24.png", "assets/Ranger-25.png",
                        "assets/Ranger-26.png", "assets/Ranger-27.png", "assets/Ranger-28.png", "assets/Ranger-29.png", "assets/Ranger-30.png",
                        "assets/Ranger-31.png", "assets/Ranger-32.png", "assets/Ranger-33.png", "assets/Ranger-34.png", "assets/Ranger-35.png",
                        "assets/Ranger-36.png", "assets/Ranger-37.png", "assets/Ranger-38.png", "assets/Ranger-39.png", "assets/Ranger-40.png",
                        "assets/Ranger-41.png", "assets/Ranger-42.png", "assets/Ranger-43.png", "assets/Ranger-44.png", "assets/Ranger-45.png",
                        "assets/Ranger-46.png", "assets/Ranger-47.png", "assets/Ranger-48.png", "assets/Ranger-49.png");
  spaceshipImg = loadImage("assets/Krasava.png");
  asteroid1Img = loadImage("assets/Asteroid1.png");
  asteroid2Img = loadImage("assets/Asteroid2.png");
  enemyImg = loadImage("assets/Enemy_spaceship-removebg-preview.png");
  energyBeamImg = loadImage("assets/EnergyBeam-removebg-preview.png");    
  earthBgImg = loadAnimation("assets/Earth space station.png");
  restartImg = loadImage("assets/restart-removebg-preview.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  Background = createSprite(windowWidth/2, windowHeight/2);
  Background.addAnimation("background", backgroundImg);
  

  Background.velocityY = 2;
  Background.scale = 3;

  restart = createSprite(windowWidth/2, windowHeight/2);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  ranger = createSprite(250, 630, 20, 20);
  ranger.addAnimation("ranger", rangerImg);
  ranger.scale = 0.3;
  ranger.velocityX += 3;

  spaceship = createSprite(730, 620, 30, 30);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.7;
  spaceship.setCollider("rectangle", 0, 0, 360, 160);
  spaceship.debug = false;

  beamGroup = new Group();
  enemyGroup = new Group();

  scoreboard = createElement("h1");
 
}

function draw() {
  background("white");

  scoreboard.html("Score: "+score);
  scoreboard.style('color:red');
  scoreboard.position(150,20);
  
  if(flag === 0){
  Background.changeAnimation("earthBG");
  Background.addAnimation("earthBG", earthBgImg);
  Background.scale = 1;
  Background.velocityY = 0;
  }

  if(flag === 1){
    Background.visible = true;
    Background.changeAnimation("background");
    Background.scale = 3;
    Background.velocityY = 2;
    spawnEnemies();
    
    if(keyDown("s")){
      beamShoot();
}
if(Background.y > 500){
  Background.y = windowHeight/2;
}

if(enemyGroup.isTouching(spaceship)){

  flag = 2

}
    for(var j = 0; j<enemyGroup.length - 1; j++){
      for(var i = 0; i<beamGroup.length; i++){
        if(beamGroup[i].isTouching(enemyGroup[j])){
          beamGroup[i].destroy();
          enemyGroup[j].destroy();
            score = score+1;

        }
      }
    }
  }
  if(ranger.isTouching(spaceship)){

    ranger.visible = false;
    flag = 1;
    spaceship.scale = 0.6;
  }

  if(flag === 2){
    Background.velocityY = 0;
    enemyGroup.destroyEach();
    beamGroup.destroyEach();
    spaceship.visible = false;
    restart.visible = true;
    if(mousePressedOver(restart)){

      restart.visible = false;
      flag = 1;
      spaceship.visible = true;
      Background.velocityY = 2;
      spaceship.x = 730;
      spaceship.y = 620;
    }
  }
  
    text(` 
Press a to move left
press d to move right
press s to shoot`,50, 50);
    fill("yellow");

    if(keyDown("a")){
      spaceship.x -= 8;
      text.visible = false;
  }

  score.visible = true;
  
    if(keyDown("d")){
    spaceship.x += 8;
    text.visible = false;
    }

  
  drawSprites();
  if(flag === 2){
    textSize(20);
    fill("white");
    score = 0;
    text("Game Over! You were too slow to win!", windowWidth/2 - 180, windowHeight/2 + 100);
  }
}

function beamShoot(){
  console.log("hello");
  energyBeam = createSprite(730, width/2 - 300, 30, 30);
  energyBeam.x = spaceship.x;
  energyBeam.velocityY = -2
  energyBeam.addImage(energyBeamImg);
  energyBeam.scale = 0.1;
  energyBeam.visible = true;
  beamGroup.add(energyBeam);
}

function spawnEnemies(){

  if(frameCount % 50 === 0){

    enemy = createSprite(Math.round(random(10, width-300)), 20);
    var rand = Math.round(random(1,3));
    if(rand === 1){
      enemy.addImage(enemyImg);
      enemy.scale = 0.4;
    }
    if(rand === 2){
      enemy.addImage(asteroid1Img);
      enemy.scale = 0.3;
    }

    if(rand === 3){
      enemy.addImage(asteroid2Img);
      enemy.scale = 0.1;
    }
    enemy.velocityY = +2;
    enemyGroup.add(enemy);
  }
}