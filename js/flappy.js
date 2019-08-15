// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var intervalRnd = 1.75;
var width = 790;
var height= 400;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var player;
var score=0;
var lableScore;
var pipes=[];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg","../assets/TRUMPPIC.png");
  game.load.audio("TrumpSound", "../assets/Havanna.mp3")

  game.load.image("Wall", "../assets/Wall.png")
  game.load.image("bg", "../assets/Background.jpg")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.sound.play("TrumpSound");
    var background = game.add.image(0,0,"bg");
    background.width = width;
    background.height = height;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.stage.setBackgroundColor("#bd5fc7");
    // game.add.text(320, 200, "Trump Bird", {font: "37px Arial", fill:
    //       "#FFFFFF"});

    player = game.add.sprite(35,height/2-20,"playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 250;

    game.input.onDown.add(playerJump);
    lableScore = game.add.text(20, 20, score.toString(), {font: "37px Arial", fill:
          "#FFFFFF"});

    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump)


    // var pipeInterval = intervalRnd * Phaser.Timer.SECOND;
    game.time.events.loop(
        intervalRnd * Phaser.Timer.SECOND,
        generatePipe
    );
    wallg(80);
    vertical(200);
    vertical(600);
    vertical(50);
    wallg(300);

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(player,pipes,gameOver);
}
function gameOver(){location.reload();}
function clickhandler(event){
  game.add.sprite(event.x, event.y,"playerImg");
}

function moveDown(){
  player.y=player.y +20;
}

function moveUp(){
  player.y-=20;
}
function moveRight(){
  player.x=player.x+20;
}
function moveLeft(){
  player.x=player.x-20;
}

function changescore(changeAmount){
  score=score+changeAmount;
  lableScore.setText(score.toString() );

}

function generatePipe(){
  var gapStart=game.rnd.integerInRange(1,5);
  for(var count=0; count< 8; count +=1){
    if(count!=gapStart && count !=gapStart+1){
      addPipeBlock(width, 50 * count);
    }
  }
  changescore(1);
}
function addPipeBlock(x,y){
  var block = game.add.sprite(x, y, "Wall")
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
}

function playerJump(){
    player.body.velocity.y = -100;
}
