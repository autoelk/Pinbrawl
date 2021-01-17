function Ball() {
  this.sprite = createSprite(width / 2, height / 4);
  this.sprite.draw = function () { ellipse(0, 0, 10, 10); }
  this.sprite.setCollider("circle", 0, 0, 5);
  this.sprite.maxSpeed = MAX_SPEED;
  this.sprite.friction = 0.02;
  this.sprite.restitution = 0.4;
  this.sprite.debug = true;
  this.score = 1;
}
 
Ball.prototype = {
  update() {
    // add gravity
    if (this.sprite.x < width / 2) {
      this.sprite.addSpeed(GRAVITY, 180);
    }
    else {
      this.sprite.addSpeed(GRAVITY, 0);
    }
    
    // add score
    if (this.sprite.x > width) {
      leftScore += this.score;
      this.sprite.x = width / 4;
      this.sprite.y = height / 4;
      this.sprite.setSpeed(2, 100);
      this.score = 1;
    }
    if (this.sprite.x < 0) {
      rightScore += this.score;
      this.sprite.x = 3 * width / 4;
      this.sprite.y = 3 * height / 4;
      this.sprite.setSpeed(2, 260);
      this.score = 1;
    }
  }
}