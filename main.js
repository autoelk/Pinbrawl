// Declare your variables here

let ball, paddle1, paddle2, paddle3, paddle4, wallTop, wallRight, wallLeft, wallBot;
let WALL_WIDTH = 5, MAX_SPEED = 25, GRAVITY = 0.25;
let leftScore = 0, rightScore = 0;

// Runs once before setup()
function preload() {
  bg = loadImage('assets/background.png');
}

// Runs once before draw()
function setup() {
  createCanvas(800, 450);

  ball = new Ball();

  paddle1 = new Paddle(50, 150, -60, -120, -10);
  paddle2 = new Paddle(50, 300, 60, 120, 10);
  paddle3 = new Paddle(750, 150, 60, 120, 10);
  paddle4 = new Paddle(750, 300, -60, -120, -10);

  walls = new Group();
  walls_list = [
    new Wall(108, 50, 220, 20, -60),
    new Wall(108, 400, 220, 20, 60),
    new Wall(692, 50, 220, 20, 60),
    new Wall(692, 400, 220, 20, -60),
    new Wall(width / 2, -WALL_WIDTH / 2, width, WALL_WIDTH, 0),
    new Wall(width / 2, height + WALL_WIDTH / 2, width, WALL_WIDTH, 0),
    // new Wall(width + WALL_WIDTH / 2, height / 2, WALL_WIDTH, height, 0),
    // new Wall(-WALL_WIDTH / 2, height / 2, WALL_WIDTH, height, 0),
  ]

  obstacles = new Group();
  obstacles_list = [
    new Obstacle(10, "circle", 400, 125, 50),
    new Obstacle(10, "circle", 400, 325, 50),
    new Obstacle(5, "circle", 250, 125, 25),
    new Obstacle(5, "circle", 175, 225, 25),
    new Obstacle(5, "circle", 625, 225, 25),
    // new Obstacel(5, "circle", )
  ];
}

// Runs in a loop forever
function draw() {
  background(bg);

  ball.update();

  paddle1.update();
  paddle2.update();
  paddle3.update();
  paddle4.update();

  ball.sprite.bounce(walls);

  ball.sprite.bounce(obstacles, function (pinball, obstacle) {
    for (let i = 0; i < 5; i++) {
      if (obstacle == obstacles_list[i].sprite) {
        ball.score += obstacles_list[i].score;
      }
    }
  })

  if (ball.sprite.bounce(paddle1.sprite) && paddle1.sprite.rotationSpeed == paddle1.speed) {
    ball.sprite.addSpeed(MAX_SPEED, 0);
  }
  if (ball.sprite.bounce(paddle2.sprite) && paddle2.sprite.rotationSpeed == paddle2.speed) {
    ball.sprite.addSpeed(MAX_SPEED, 0);
  }
  if (ball.sprite.bounce(paddle3.sprite) && paddle3.sprite.rotationSpeed == paddle3.speed) {
    ball.sprite.addSpeed(MAX_SPEED, 180);
  }
  if (ball.sprite.bounce(paddle4.sprite) && paddle4.sprite.rotationSpeed == paddle4.speed) {
    ball.sprite.addSpeed(MAX_SPEED, 180);
  }


  // Score Display
  fill(255);
  textSize(32);
  text(leftScore, 32, 40);
  text(ball.score, width / 2, 40);
  text(rightScore, width - 64, 40);

  drawSprites();
}

function keyPressed() {
  if (key == 'a' || key == 'w') { paddle1.sprite.rotationSpeed = paddle1.speed; }
  if (key == 'z' || key == 's' || key == 'd') { paddle2.sprite.rotationSpeed = paddle2.speed; }
  if (key == 'k' || keyCode == LEFT_ARROW || keyCode == UP_ARROW) { paddle3.sprite.rotationSpeed = paddle3.speed; }
  if (key == 'm' || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) { paddle4.sprite.rotationSpeed = paddle4.speed; }
}

function keyReleased() {
  if (key == 'a' || key == 'w') { paddle1.sprite.rotationSpeed = -paddle1.speed; }
  if (key == 'z' || key == 's' || key == 'd') { paddle2.sprite.rotationSpeed = -paddle2.speed; }
  if (key == 'k' || keyCode == LEFT_ARROW || keyCode == UP_ARROW) { paddle3.sprite.rotationSpeed = -paddle3.speed; }
  if (key == 'm' || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) { paddle4.sprite.rotationSpeed = -paddle4.speed; }
}