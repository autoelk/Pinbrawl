function Paddle(x, y, startRotation, swingRotation, speed) {
  this.sprite = createSprite(x, y);
  this.sprite.draw = function () { rect(0, 0, 100, 20) };
  this.sprite.setCollider("rectangle", 0, 0, 100, 20);
  this.sprite.rotation = startRotation;
  this.sprite.immovable = true;
  this.sprite.debug = true;

  this.swingRotation = swingRotation;
  this.startRotation = startRotation;
  this.speed = speed;
}

Paddle.prototype = {
  update() {
    if (this.speed > 0) {
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
  }
}