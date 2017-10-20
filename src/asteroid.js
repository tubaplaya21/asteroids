// asteroid.js

export default class Asteroid {
  constructor(mass,x,y,speed,direction) {
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = 'asteroidLarge.png';
    this.velocity = {
      x: speed*Math.sin(direction*Math.PI/180),
      y: speed*(-Math.cos(direction*Math.PI/180)),
      direction: direction*180/Math.PI
    };
    this.mass = mass;
    this.isDestroyed = false;
    if(Math.random() > 0.5) {
      this.rotationDirection = 'clockwise';
    }
    else {
      this.rotationDirection = 'counterclockwise';
    }
    this.rotation = Math.random()*360*Math.PI/180;
    this.rotationSpeed = (Math.random()*(1-0.1)+0.1)*Math.PI/180;

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if(this.rotationDirection == 'clockwise') {
      this.rotation += this.rotationSpeed;
    }
    else if(this.rotationDirection == 'counterclockwise') {
      this.rotation -= this.rotationSpeed;
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
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = '#000';
    ctx.translate(this.x+this.sprite.width/2,this.y+this.sprite.height/2);
    ctx.rotate(this.rotation);
    ctx.translate(-(this.x+this.sprite.width/2),-(this.y+this.sprite.height/2));
    ctx.drawImage(this.sprite,this.x,this.y,60,60);
    ctx.restore();
  }
}
