// ship.js
import Laser from './laser';

export default class Ship {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: 0,
      y: 0,
      direction: 0
    };
    this.lasers = [];
    this.sprite = new Image();
    this.sprite.src = 'ship.png';
    this.vertices = [
                      {x: 8,y: 0},
                      {x: 4,y: 12},
                      {x: 12,y: 12},
                      {x: 0,y: 24},
                      {x: 16,y: 24}
    ];
    this.rads = this.velocity.direction*Math.PI/180;
    this.rotation = null;
    this.height = this.sprite.height;
    this.width = this.sprite.width;

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update(input) {
    var rotation = input.direction;
    switch (rotation) {
      case 'right':
        this.velocity.direction += 4;
        break;
      case 'left':
        this.velocity.direction -= 4;
        break;
    }
    if(this.velocity.direction > 180) {
      this.velocity.direction -= 360;
    }
    if(this.velocity.direction < -180) {
      this.velocity.direction += 360;
    }
    if(this.velocity.direction < 90 && this.velocity.direction > -90) {
      this.facingUD = 'up';
    }
    if((this.velocity.direction > 90 && this.velocity.direction <= 180)
        || (this.velocity.direction < -90 && this.velocity.direction >= -180)) {
      this.facingUD = 'down';
    }
    if(this.velocity.direction > 0 && this.velocity.direction < 180) {
      this.facingLR = 'left';
    }
    if(this.velocity.direction < 0 && this.velocity.direction > -180) {
      this.facingLR = 'right';
    }

    if(input.thrusters == 'on') {
      if(this.velocity.x <= 6 && this.velocity.x >= -6) {
        this.velocity.x += 0.4*(Math.sin(this.velocity.direction*Math.PI/180));
      }
      else if((this.velocity.x >= 6 && (this.velocity.direction < 0 && this.velocity.direction > -180))
          || (this.velocity.x <= -6 && (this.velocity.direction > 0 && this.velocity.direction < 180))) {
        this.velocity.x += 0.4*(Math.sin(this.velocity.direction*Math.PI/180));
      }
      if(this.velocity.y <= 6 && this.velocity.y >= -6) {
        this.velocity.y += 0.4*(-Math.cos(this.velocity.direction*Math.PI/180));
      }
      else if((this.velocity.y <= -6 && ((this.velocity.direction > 90 && this.velocity.direction <= 180)
          || (this.velocity.direction < -90 && this.velocity.direction >= -180))
          || (this.velocity.y >= 6 && this.velocity.direction < 90 && this.velocity.direction > -90))) {
        this.velocity.y += 0.4*(-Math.cos(this.velocity.direction*Math.PI/180));
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
    ctx.strokeStyle = '#000';
    ctx.translate(this.x+this.sprite.width/2,this.y+this.sprite.height/2);
    ctx.rotate(this.velocity.direction*Math.PI/180);
    ctx.translate(-(this.x+this.sprite.width/2),-(this.y+this.sprite.height/2));
    ctx.drawImage(this.sprite,this.x,this.y,16,24);
    ctx.restore();
  }
}
