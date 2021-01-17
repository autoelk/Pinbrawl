function Wall(x, y, w, h, r) {
  this.sprite = createSprite(x, y);
  this.sprite.draw = function () { rect(0, 0, w, h) };
  this.sprite.setCollider("rectangle", 0, 0, w, h);
  this.sprite.rotation = r;
  this.sprite.immovable = true;
  walls.add(this.sprite);
}

