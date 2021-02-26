var player
var edges= []
var gMiddle
var coin
var obstacle
var rand, rand4
var score = 0
var gameState = "info"
var coinGroup
var obGroup
var coinImg
var bgImg
var comet
var comGroup
var invPowerUp
var rand1
var invPowerGroup
var fcount
var playButton
var playImg
var cometImg
var invpotionImg
var trackImg
var count
var bg
var titleImg
var title
var boss, bossImg
var rand3
var astroid, alien1Img
var bullet
var shootButton
var health = 5;
var astroidGroup, bulletGroup
var lay
var layImg
var bottom
var alien_running
var shotImg
var obImg
var starImg, star
var endPgImg, endPg
var line, lineImg, cool, coolImg
var rockImg, bulletImg
var count = 0
function preload(){
coinImg = loadImage("images/coin.png")
bgImg = loadImage("images/bg.png")
playImg = loadImage("images/playy.png")
cometImg = loadImage("images/COMET.png")
invpotionImg = loadImage("images/invpotion.png")
trackImg = loadImage("images/track.png.png")
titleImg = loadImage("images/title.png")
layImg = loadImage("images/layer.png")
bossImg = loadImage("images/boss.png")
alien1Img = loadImage("images/minion.png")
shotImg = loadImage("images/shoot.png")
obImg = loadImage("images/obstacle.png")
starImg = loadImage("images/coin.png")
coolImg = loadImage("images/cool.png")
lineImg = loadImage("images/line.png")
endPgImg = loadImage("images/deadlol.png")
rockImg = loadImage("images/rock.png")
bulletImg = loadImage("images/bullet.png")
alien_running = loadAnimation("images/alien1.png","images/alien2.png","images/alien3.png","images/alien4.png","images/alien5.png","images/alien6.png");
}


function setup() {
  createCanvas(800,600);
  bg = createSprite(400,200,20,20)
  bg.addImage(bgImg)
  bg.velocityX = -7;
  player = createSprite(100, 100, 50, 50);
 player.addAnimation("running", alien_running);
 player.scale = 1.3
 player.debug = false;
 player.setCollider("rectangle",0,0,30,60)
  edges = createEdgeSprites()

  gTop = createSprite(400,180,800,10)
  gMiddle = createSprite(400,360,800,10)

  playButton = createSprite(420,550,400,20)
 


 gTop.visible = false;

 
 gMiddle.visible = false;

  title = createSprite(400,100)
  coinGroup = new Group()
  obGroup = new Group()
  comGroup = new Group();
  invPowerGroup = new Group();
  bulletGroup = new Group();
  astroidGroup = new Group();
  lay = createSprite(400,290,30,30)
  lay.addImage(layImg)
  lay.scale = 0.72
  boss = createSprite(760,300, 60,60)
  boss.addImage(bossImg)
  boss.scale = 0.7
  boss.debug = true;
  boss.depth = lay.depth
  boss.depth++
  boss.visible = false;
  shootButton = createSprite(50,550,30,30)
  shootButton.addImage(shotImg)
  shootButton.visible = false;
  shootButton.scale = 0.3
shootButton.depth = lay.depth
shootButton.depth++
  player.depth = lay.depth;
  player.depth++;
  bottom = createSprite(400,490,800,30)
  bottom.visible = false;
  
  star = createSprite(50,50,50,50)
  star.addImage(starImg)
  star.scale = 0.7
  line = createSprite(670,50,20,20)
  line.addImage(lineImg)
  line.scale = 0.7

  cool = createSprite(670,50,20,20)
  cool.addImage(coolImg)
  cool.scale = 0.7
}

function draw() {
  background(0); 
 
  drawSprites();
if (gameState === "info") {
playButton.addImage(playImg)
playButton.scale = 0.3
bg.velocityX = 0;
bg.scale = 1.43
title.addImage(titleImg)
title.scale = 0.5
textSize(35)
stroke("purple")
strokeWeight(4)
fill("white")
text("How to play:",300,200)
textSize(20)
text("To play, the objective is to stay",300,250)
text("alive for as long as possible",300,300)
text("and defeat the boss at the end!",300,350)
text("Your score is based on how many ",300,400)
text("stars you collect!",300,450)
lay.visible = false;
star.visible = false;
cool.visible = false;
line.visible = false;
if (mousePressedOver(playButton)) {
  gameState = "play"
  playButton.visible = false;
  bg.velocityX = -6;
  title.visible = false;
  lay.visible = true;
  star.visible = true;
  cool.visible = true;
  line.visible = true;
}
gMiddle.visible = false;
gTop.visible = false;
player.visible = false;


}


if (gameState === "play"||gameState === "invincible") {
  spawnCoins();
  spawnOb();
  spawnComet();
  spawnInvPowerUp();
  cool.velocityX = 0.152
  if (keyDown("space")&&(player.collide(gTop)||player.collide(gMiddle)||player.collide(edges[3])||player.collide(bottom))) {
    player.velocityY = -12;
  }
  player.velocityY =  player.velocityY+0.8;

  if (keyDown(DOWN_ARROW)&&player.y < 350) {
    player.y = player.y+180;
  }

  if (keyDown(UP_ARROW)&&player.y > 160) {
    player.y = player.y-190;
  }

  if (invPowerGroup.isTouching(player)) {
    //change image
    gameState = "invincible"
    invPowerGroup.destroyEach();
 count = frameCount
  }
  if (count+100 === frameCount) {
    //change image
  gameState = "play"
  count = 0;
  }
  if (bg.x < 0) {
    bg.x = bg.width/2
  }
  if (player.collide(gMiddle)) {
    player.velocityY = 0;
  }
  gMiddle.visible = false;
gTop.visible = false;
player.visible = true;
playButton.visible = false;

title.visible = false;


for (var i =0; i < coinGroup.length; i++) {
  if (coinGroup.get(i)!= null&&coinGroup.get(i).isTouching(player)) {
  coinGroup.get(i).destroy();
  score++
  }
  }

  for (var g =0; g < astroidGroup.length; g++) {
    if (astroidGroup.get(g)!= null&&astroidGroup.get(g).isTouching(bulletGroup)) {
    astroidGroup.get(g).destroy();
    }
    }
  if ((obGroup.isTouching(player)||comGroup.isTouching(player))&&gameState != "invincible") {
    gameState = "end"
  }
  if (frameCount > 200) {
    gameState = "monster"
    }

 
} else if (gameState === "end") {
  bg.velocityX = 0;
coinGroup.setVelocityXEach(0)
obGroup.setVelocityXEach(0)
player.velocityY = 0;
coinGroup.setLifetimeEach(0)
obGroup.setLifetimeEach(0)
comGroup.setLifetimeEach(0)
comGroup.setVelocityXEach(0)
endPg = createSprite(350,300,20,20)
endPg.addImage(endPgImg)
endPg.scale = 1.81
} else if (gameState === "monster") {
  if (keyDown("space")&&(player.collide(gTop)||player.collide(gMiddle)||player.collide(edges[3]))) {
    player.velocityY = 100;
  }
  player.velocityY =  player.velocityY+0.8;

  if (keyDown(DOWN_ARROW)&&player.y < 350) {
    player.y = player.y+180;
  }

  if (keyDown(UP_ARROW)&&player.y > 160) {
    player.y = player.y-190;
  }

  if (bg.x < 0) {
    bg.x = bg.width/2
  }
cool.velocityX = 0;
  boss.visible = true;
  spawnAstroids()
  shootButton.visible = true;
if (bulletGroup.isTouching(boss)) {
  health = health-1
  bulletGroup.destroyEach();
}
if (astroidGroup.isTouching(player)&&gameState != "end") {
  gameState = "end"
}
if (astroidGroup.isTouching(bulletGroup)) {
  bulletGroup.destroyEach()
  astroidGroup.destroyEach();
}
  if (mousePressedOver(shootButton)) {
    spawnBullets();
  }
  if (mouseWentUp("leftButton")) {
    count = 0;
  }
  if (health === 0) {
    boss.visible = false;
    shootButton.visible = false;
    gameState = "end"
  }
}
  player.collide(gTop)
  player.collide(gMiddle)

  player.collide(edges[3])
  player.collide(edges[2])
  player.collide(bottom)
  if (gameState != "info") {
textSize(40)
fill("white")
text(score,90,63)
  }

}

function spawnCoins() {
  rand4 = Math.round(random(1,3))
  if (frameCount % 20 == 0) {
coin = createSprite(820,300,10,10)
coin.addImage(coinImg)
coin.scale = 0.7
coin.velocityX = -15;
coin.lifetime = 164;
if (rand4 == 1) {
  coin.y = 150;
} else if (rand4 == 2) {
  coin.y = 310
} else if(rand4 == 3) {
  coin.y = 475;
}
coinGroup.add(coin)
  } 
}

function spawnOb() {
  rand = Math.round(random(1,3))
  if (frameCount % 40 == 0) {
    obstacle = createSprite(820,290,10,20)
    obstacle.velocityX = -15;
    obstacle.lifetime = 164;
    obstacle.addImage(obImg)
    obstacle.debug = false;
    obstacle.setCollider("rectangle",20,0,50,180,-20)
    obstacle.scale = 0.71
    
    if (rand == 1) {
      obstacle.y = 150;
    } else if (rand == 2) {
      obstacle.y = 310
    } else if(rand == 3) {
      obstacle.y = 475;
    }
    obGroup.add(obstacle)
  }
}

function spawnComet() {
if (frameCount % 200 ===  0) {
comet = createSprite(800,random(0,600),20,20)
comet.addImage(rockImg)
comet.scale = 0.5
comet.lifetime = 300;
comet.shapeColor = "yellow"
comet.velocityX = random(-10,-5)
comet.velocityY = random(-10,10)
comet.pointTo(player)
comGroup.add(comet)
}
}

function spawnInvPowerUp() {
  rand1 = Math.round(random(1,3))
  if (frameCount % 250 === 0) {
  invPowerUp = createSprite(820,300,10,10)
  invPowerUp.addImage(invpotionImg)
  invPowerUp.scale = 0.2
    invPowerUp.lifetime = 164;
    invPowerUp.velocityX = -15;

    if (rand1 == 1) {
      invPowerUp.y = 150;
    } else if (rand1 == 2) {
      invPowerUp.y = 310
    } else if(rand1 == 3) {
      invPowerUp.y = 475;
    }
    invPowerGroup.add(invPowerUp)
  }
}

function spawnAstroids() {
  rand3 = Math.round(random(1,3))
  if (frameCount % 40 === 0){
    astroid = createSprite(820,300,10,20)
    astroid.velocityX = -15;
    astroid.lifetime = 164;
    astroid.addImage(rockImg)
    astroid.scale = 0.5
    if (rand3 == 1) {
      astroid.y = 150;
    } else if (rand3 == 2) {
      astroid.y = 310
    } else if(rand3 == 3) {
      astroid.y = 475;
    }
    astroidGroup.add(astroid)
}
}

function spawnBullets() {

    if (count === 0) {
      bullet = createSprite(player.x,player.y,20,20)
      bullet.addImage(bulletImg)
      bullet.scale = 0.15
        bullet.velocityX = 15;
        bullet.lifetime = 164;
        bulletGroup.add(bullet)
        count++
    } 
}

