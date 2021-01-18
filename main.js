// Declare your variables here

let MAX_SPEED = 25, GRAVITY = 0.25;
let leftScore = 0, rightScore = 0;
let song;
let state;
let menuSelection = 0;
let menu = ["0player", "1player", "2player"];

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
  endScreenImage1 = loadImage('assets/p1Wins.png');
  endScreenImage2 = loadImage('assets/p2Wins.png');
  arrowImage = loadImage('assets/arrow.png');
  arrowUpImage = loadImage('assets/arrowUp.png');
  arrowDownImage = loadImage('assets/arrowDown.png');


  soundFormats('mp3');
  song = loadSound('assets/actualrealpinball.mp3');
}

// Runs once before draw()
function setup() {
  createCanvas(800, 450);

  // masterVolume(0.75);
  song.loop();

  state = "menu" //used to tell when the game is over

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
  print(state);
  background(bg);

  if (state != "game over") {
    ball.update();
  }

  // bot controls
  if (state == "0player" || state == "menu") {
    // bots play vs. each other
    paddle1.bot();
    paddle2.bot();
  }
  if (state == "1player" || state == "0player" || state == "menu") {
    paddle3.bot();
    paddle4.bot();
  }

  // paddles, ball, wall, and obstacles
  if (state != "game over") {
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
  }

  if (state != "game over") {
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

  if (state == "menu") {
    fill(color('rgba(0, 0, 0, 0.5)'));
    rect(0, 0, width, height); // transparent background
    fill(254, 205, 26);
    textFont(pixelFont, 100);
    textAlign(CENTER);
    text("PINBRAWL", width / 2, 100);
    // menu elements
    textSize(40);
    for (let i = 0; i < menu.length; i++) {
      text(menu[i], width / 2, 200 + 50 * i);
    }
    image(arrowImage, 530, 185 + 50 * menuSelection); // arrowDownImage

    // controls
    textAlign(CENTER)
    textSize(40);
    text("W", 200, 200);
    text("S", 200, 300);
    image(arrowUpImage, 580, 187);
    image(arrowDownImage, 580, 287);
  }

  if (state != "game over" && state != "menu" && (leftScore >= 999) || (rightScore >= 999)) {
    state = "game over";
  }
  if (state == "game over") {
    endScreen();
  }
}

function keyPressed() {
  if (key == 'a' || key == 'w') {
    if (state == "2player" || state == "1player") {
      paddle1.sprite.rotationSpeed = paddle1.speed * paddle1.direction;
      paddle1.swinging = true;
    }
    if (state == "menu") {
      menuSelection--;
      if (menuSelection < 0) {
        menuSelection = menu.length - 1;
      }
    }
  }
  if (key == 'z' || key == 's' || key == 'd') {
    if (state == "2player" || state == "1player") {
      paddle2.sprite.rotationSpeed = paddle2.speed * paddle2.direction;
      paddle2.swinging = true;
    }
    if (state == "menu") {
      menuSelection++;
      if (menuSelection > menu.length - 1) {
        menuSelection = 0;
      }
    }
  }
  if (key == 'k' || keyCode == LEFT_ARROW || keyCode == UP_ARROW) {
    if (state == "2player") {
      paddle3.sprite.rotationSpeed = paddle3.speed * paddle3.direction;
      paddle3.swinging = true;
    }
    if (state == "menu") {
      menuSelection--;
      if (menuSelection < 0) {
        menuSelection = menu.length - 1;
      }
    }
  }
  if (key == 'm' || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) {
    if (state == "2player") {
      paddle4.sprite.rotationSpeed = paddle4.speed * paddle4.direction;
      paddle4.swinging = true;
    }
    if (state == "menu") {
      menuSelection++;
      if (menuSelection > menu.length - 1) {
        menuSelection = 0;
      }
    }
  }
  if (keyCode == ENTER) {
    // change game state based on menu selection
    if (state == "menu") {
      state = menu[menuSelection];
      resetgame();
    }
    if (state == "game over") {
      state = "menu";
      resetgame();
    }
  }
}

function keyReleased() {
  if (state == "2player" || state == "1player") {
    if (key == 'a' || key == 'w') {
      paddle1.sprite.rotationSpeed = -paddle1.speed * paddle1.direction;
      paddle1.swinging = false;
    }
    if (key == 'z' || key == 's' || key == 'd') {
      paddle2.sprite.rotationSpeed = -paddle2.speed * paddle2.direction;
      paddle2.swinging = false;
    }
  }
  if (state == "2player") {
    if (key == 'k' || keyCode == LEFT_ARROW || keyCode == UP_ARROW) {
      paddle3.sprite.rotationSpeed = -paddle3.speed * paddle3.direction;
      paddle3.swinging = false;
    }
    if (key == 'm' || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) {
      paddle4.sprite.rotationSpeed = -paddle4.speed * paddle4.direction;
      paddle4.swinging = false;
    }
  }

}

function endScreen() {
  textFont(pixelFont, 28);
  textAlign(CENTER, CENTER);
  fill(254, 205, 26);
  if (leftScore >= 999) {
    background(endScreenImage1);
    if (state == "1player") {
      text("You win! Great Job!", 20, 10, 800, 90)
    }
  } else if (rightScore >= 999) {
    background(endScreenImage2);
    if (state == "1player") {
      text("The AI won! Nice Try!", 20, 10, 800, 90)
    }
  }
  text("Press ENTER to restart.", 20, 80, 800, 600)
}

function resetgame() {
  leftScore = 0;
  rightScore = 0;
  menuSelection = 0;
  background(bg);
  ball.reset(); // doesn't work TODO make ball reset
}