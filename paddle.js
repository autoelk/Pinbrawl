function Paddle(x, y, startRotation, swingRotation, direction, mirrorX, mirrorY) {
  this.sprite = createSprite(x, y);
  // this.sprite.draw = function () { rect(0, 0, 100, 30) };
  this.sprite.addImage(paddleImage);
  this.sprite.mirrorX(mirrorX);
  this.sprite.mirrorY(mirrorY);
  this.sprite.setCollider("rectangle", 0, 0, 100, 30);
  this.sprite.rotation = startRotation;
  this.sprite.immovable = true;
  // this.sprite.debug = true;

  this.detector = createSprite(x, y);
  this.detector.setCollider("circle", 0, 0, 50);
  this.detector.draw = function () { }; // don't draw the detector
  // this.detector.debug = true;

  this.swingRotation = swingRotation;
  this.startRotation = startRotation;
  this.swinging = false;
  this.direction = direction;
  this.speed = 10;

  // print(this.sprite.x + " " + this.sprite.y + " " + this.direction);
}

Paddle.prototype = {
  update() {
    // apply extra force if the paddle is currently swinging outwards
    if (ball.sprite.bounce(this.sprite) && this.swinging) {
      // changing restitution does not appear to work for some reason
      ball.sprite.addSpeed(25, this.sprite.rotation - (90 * this.direction));
    }
    // stop the swing from going past its bounds
    if (this.direction > 0) {
      if (this.sprite.rotation > this.swingRotation) {
        this.sprite.rotation = this.swingRotation;
        this.sprite.rotationSpeed = 0;
      }
      if (this.sprite.rotation < this.startRotation) {
        this.sprite.rotation = this.startRotation;
        this.sprite.rotationSpeed = 0;
      }
    }
    else {
      if (this.sprite.rotation > this.startRotation) {
        this.sprite.rotation = this.startRotation;
        this.sprite.rotationSpeed = 0;
      }
      if (this.sprite.rotation < this.swingRotation) {
        this.sprite.rotation = this.swingRotation;
        this.sprite.rotationSpeed = 0;
      }
    }
    // stop the previous thing from causing the paddle to rapidly vibrate
    if (this.sprite.rotationSpeed == 0) {
      this.swinging = false;
    }
  },
  bot() {
    // slower and slightly random swing speed for bot to simulate human behavior and allow time for ball to hit the paddle before the paddle completes its swing
    if (ball.sprite.overlap(this.detector)) {
      this.sprite.rotationSpeed = 2 / 3 * this.speed * this.direction + 2 * Math.random();
      this.swinging = true;
    } else if (this.sprite.rotation != this.startRotation) {
      this.sprite.rotationSpeed = 2 / 3 * -this.speed * this.direction + 2 * Math.random();
      this.swinging = false;
    }
  }
}