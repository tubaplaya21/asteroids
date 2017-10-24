// laser.js

export default class Laser {
  constructor(x,y,velocity) {
    this.x = x;
    this.y = y;
    this.shipVelocity = velocity;
    this.xLaunch = 5*Math.sin(velocity.direction*Math.PI/180);
    this.yLaunch = -5*Math.cos(velocity.direction*Math.PI/180);
    this.velocity = {
      x: velocity.x+this.xLaunch,
      y: velocity.y+this.yLaunch,
      direction: velocity.direction
    };
    this.rads = this.velocity.direction*Math.PI/180;
    this.sprite = new Image();
    this.sprite.src = 'bullet.png';
    this.height = this.sprite.height;
    this.width = this.sprite.width;
    this.x += 2.5*this.xLaunch;
    this.y += 2.5*this.yLaunch;

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x+this.sprite.width/2,this.y+this.sprite.height/2);
    ctx.rotate(this.shipVelocity.direction);
    ctx.translate(-(this.x+this.sprite.width/2),-(this.y+this.sprite.height/2));
    ctx.drawImage(this.sprite,this.x,this.y,3,3);
    ctx.restore();
  }
}
