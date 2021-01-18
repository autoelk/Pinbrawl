// Declare your variables here

let MAX_SPEED = 25, GRAVITY = 0.25;
let leftScore = 0, rightScore = 0;
let song;

// Runs once before setup()
function preload() {
  pixelFont = loadFont('assets/joystix monospace.ttf');
  bg = loadImage('assets/background.png');
  middleCircleImage = loadImage('assets/middle circle.png');
  smallCircleImage = loadImage('assets/small circle.png');
  rectangleBumperImage = loadImage('assets/rectangle bumper.png');
  sideCircleImage = loadImage('assets/side circle.png');
  paddleImage = loadImage('assets/paddle.png');
  wallImage = loadImage('assets/wall.png');
  ballImage = loadImage('assets/ball.png');

  soundFormats('mp3');
  song = loadSound('assets/realpinball.mp3');
}

// Runs once before draw()
function setup() {
  createCanvas(800, 450);

  song.loop();

  ball = new Ball();

  paddle1 = new Paddle(50, 150, -60, -120, -1, 1, -1);
  paddle2 = new Paddle(50, 300, 60, 120, 1, 1, 1);
  paddle3 = new Paddle(750, 150, 240, 300, 1, 1, 1);
  paddle4 = new Paddle(750, 300, -240, -300, -1, 1, -1);

  walls = new Group();
  walls_list = [
    new Wall(108, 50, 225, 30, -60),
    new Wall(108, 400, 225, 30, 60),
    new Wall(692, 50, 225, 30, 60),
    new Wall(692, 400, 225, 30, -60),
    new Wall(width / 2, -25, width, 50, 0),
    new Wall(width / 2, height + 25, width, 50, 0),
  ]

  obstacles = new Group();
  obstacles_list = [
    new Obstacle(5, rectangleBumperImage, "rect", 250, 125, 50, 100, 50),
    new Obstacle(5, rectangleBumperImage, "rect", 550, 325, 50, 100, 50),
    new Obstacle(10, middleCircleImage, "circle", 400, 225, 50),
    new Obstacle(5, smallCircleImage, "circle", 250, 325, 25),
    new Obstacle(5, smallCircleImage, "circle", 550, 125, 25),
    new Obstacle(25, sideCircleImage, "circle", 400, -10, 50),
    new Obstacle(25, sideCircleImage, "circle", 400, 460, 50),
  ];
}

// Runs in a loop forever
function draw() {
  background(bg);

  ball.update();

  // bot controls
  //paddle1.bot();
  //paddle2.bot();
  paddle3.bot();
  paddle4.bot();

  paddle1.update();
  paddle2.update();
  paddle3.update();
  paddle4.update();

  ball.sprite.bounce(walls);

  ball.sprite.bounce(obstacles, function (pinball, obstacle) {
    // find the specific obstacle that was hit
    for (let i = 0; i < obstacles_list.length; i++) {
      if (obstacle == obstacles_list[i].sprite) {
        ball.score += obstacles_list[i].score;
      }
    }
  })


  drawSprites();

  // Score Display
  fill(254, 205, 26);
  textFont(pixelFont, 28);
  textAlign(LEFT, CENTER);
  text(leftScore, 16, 40);
  textAlign(RIGHT, CENTER);
  text(rightScore, width - 16, 40);
  textAlign(CENTER, CENTER);
  text(ball.score, width / 2, height / 2 - 4);
}

function keyPressed() {
  if (key == 'a' || key == 'w') {
    paddle1.sprite.rotationSpeed = paddle1.speed * paddle1.direction;
    paddle1.swinging = true;
  }
  if (key == 'z' || key == 's' || key == 'd') {
    paddle2.sprite.rotationSpeed = paddle2.speed * paddle2.direction;
    paddle2.swinging = true;
  }
  if (key == 'k' || keyCode == LEFT_ARROW || keyCode == UP_ARROW) {
    paddle3.sprite.rotationSpeed = paddle3.speed * paddle3.direction;
    paddle3.swinging = true;
  }
  if (key == 'm' || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) {
    paddle4.sprite.rotationSpeed = paddle4.speed * paddle4.direction;
    paddle4.swinging = true;
  }
}

function keyReleased() {
  if (key == 'a' || key == 'w') {
    paddle1.sprite.rotationSpeed = -paddle1.speed * paddle1.direction;
    paddle1.swinging = false;
  }
  if (key == 'z' || key == 's' || key == 'd') {
    paddle2.sprite.rotationSpeed = -paddle2.speed * paddle2.direction;
    paddle2.swinging = false;
  }
  if (key == 'k' || keyCode == LEFT_ARROW || keyCode == UP_ARROW) {
    paddle3.sprite.rotationSpeed = -paddle3.speed * paddle3.direction;
    paddle3.swinging = false;
  }
  if (key == 'm' || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) {
    paddle4.sprite.rotationSpeed = -paddle4.speed * paddle4.direction;
    paddle4.swinging = false;
  }

  function endscreen() {
    if (leftscore == )
  }
}