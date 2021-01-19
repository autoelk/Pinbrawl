function Obstacle(score, image, shape, x, y, width, height = 0, rotation = 0) {
  this.sprite = createSprite(x, y);
  if (shape == "circle") {
    this.sprite.setCollider("circle", 0, 0, width);
    // this.sprite.draw = function () { ellipse(0, 0, width * 2, width * 2) };
  }
  if (shape == "rect") {
    this.sprite.setCollider("obb", 0, 0, width, height, 0);
    // this.sprite.draw = function () { rect(0, 0, width, height) };
  }
  this.sprite.addImage(image);
  this.sprite.rotation = rotation;
  this.sprite.immovable = true;
  this.sprite.restitution = 5; // extra bounciness
  // this.sprite.debug = true;
  
  this.score = score;
  obstacles.add(this.sprite);
}