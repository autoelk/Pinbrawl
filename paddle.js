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
}

Paddle.prototype = {
  update() {
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
    // apply extra force if the paddle is currently swinging outwards
    if (ball.sprite.bounce(this.sprite) && this.swinging) {
      ball.sprite.addSpeed(25, this.sprite.rotation + 90 * this.direction);
    }
  },
  bot() {
    if (ball.sprite.overlap(this.detector)) {
      this.sprite.rotationSpeed = 2 / 3 * this.speed * this.direction + 2 * Math.random();
      this.swinging = true;
    } else {
      this.sprite.rotationSpeed = 2 / 3 * -this.speed * this.direction + 2 * Math.random();
      this.swinging = false;
    }
  }
}