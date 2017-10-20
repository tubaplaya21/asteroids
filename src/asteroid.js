// asteroid.js

export default class Asteroid {
  constructor(mass,x,y,speed,direction) {
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = 'asteroidLarge.png';
    this.velocity = {
      x: speed*Math.cos(direction*180/Math.PI),
      y: speed*Math.sin(direction*180/Math.PI),
      direction: direction*180/Math.PI
    };
    this.mass = mass;
    this.isDestroyed = false;
    this.rotation = Math.random(360)*180/Math.PI;
    this.rotationSpeed = Math.random(0.1)*180/Math.PI;

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.rotation += this.rotationSpeed;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = '#000';
    ctx.translate(this.x+25,this.y+25);
    ctx.rotate(this.rotation);
    ctx.translate(-(this.x+25),-(this.y+25));
    ctx.drawImage(this.sprite,this.x,this.y);
    ctx.restore();
  }
}
