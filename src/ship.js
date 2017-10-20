// ship.js

export default class Ship {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.xFront = this.x;
    this.xBackLeft = this.x-7;
    this.xBackRight = this.x+7;
    this.rotation = null;
    this.velocity = {
      x: 0,
      y: 0,
      direction: 0
    };

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update(input) {
    var x = this.x;
    var y = this.y;
    var rotation = input.direction;
    switch (rotation) {
      case 'right':
        this.velocity.direction += .0013;
        break;
      case 'left':
        this.velocity.direction -= .0013;
        break;
    }
    if(input.thrusters == 'on') {
      if(this.velocity.x <= 8 && this.velocity.x >= -8) {
        this.velocity.x += 0.3*Math.sin(this.velocity.direction*180/Math.PI);
      }
      if((this.velocity.x >= 8 && this.velocity.x <= 9 && -Math.cos(this.velocity.direction*180/Math.PI) < 0)
          || (this.velocity.x <= -8 && this.velocity.x >= -9 && -Math.cos(this.velocity.direction*180/Math.PI) > 0)) {
        this.velocity.x += 0.3*(-Math.cos(this.velocity.direction*180/Math.PI));
      }
      if(this.velocity.y <= 8 && this.velocity.y >= -8) {
        this.velocity.y += 0.3*(-Math.cos(this.velocity.direction*180/Math.PI));
      }
      if((this.velocity.y >= 8 && this.velocity.y <= 9 && -Math.cos(this.velocity.direction*180/Math.PI) < 0)
          || (this.velocity.y <= -8 && this.velocity.y >= -9 && -Math.cos(this.velocity.direction*180/Math.PI) > 0)) {
        this.velocity.y += 0.3*(-Math.cos(this.velocity.direction*180/Math.PI));
      }
    }

    if(this.x > 1125) {
      this.x = 0;
    }
    if(this.x < 0) {
      this.x = 1125;
    }
    if(this.y > 750) {
      this.y = 0;
    }
    if(this.y < 0) {
      this.y = 750;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  render(ctx) {
    ctx.save();
    ctx.lineWidth = 1.25;
    ctx.strokestyle = '#000';
    ctx.translate(this.x,this.y+11.5);
    ctx.rotate(this.velocity.direction*180/Math.PI);
    ctx.translate(-(this.x),-(this.y+11.5));
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x+7,this.y+23);
    ctx.lineTo(this.x-7,this.y+23);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
