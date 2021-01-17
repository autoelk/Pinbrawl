function Obstacle(score, shape, x, y, width, height = 0, rotation = 0) {
  this.sprite = createSprite(x, y);
  if (shape == "circle") {
    this.sprite.setCollider("circle", 0, 0, width);
    this.sprite.draw = function () { ellipse(0, 0, width * 2, width * 2) };
  }
  if (shape == "rect") {
    this.sprite.setCollider("obb", 0, 0, width, height, rotation);
    this.sprite.draw = function () { rect(0, 0, width, height) };
  }
  this.sprite.debug = true;
  this.sprite.maxSpeed = MAX_SPEED;
  this.sprite.immovable = true;
  this.score = score;
  obstacles.add(this.sprite);
}