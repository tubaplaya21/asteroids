// game.js

import Ship from './ship';
import Laser from './laser';
import Asteroid from './asteroid';

export default class Game {
  constructor() {
    this.input = {direction: null,thrusters: 'off',laser:'inactive'};
    this.gameStarted = false;
    this.gamePaused = false;
    this.asteroidNum = 10;
    this.timer = 0;
    this.ship = new Ship(562.5,375);
    this.lasers = [];
    this.asteroids = [];
    for(var i = 0; i < this.asteroidNum; i++) {
      var x = 500;
      var y = 375;
      do {
        x = Math.random()*1125;
        y = Math.random()*750;
      } while(x > 460 && x < 660 && y > 275 && y < 475);
      this.asteroids.push(new Asteroid((Math.floor(Math.random()*3)),x,y,(Math.random()*2+1),(Math.random()*360)));
    }
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 1125;
    this.backBufferCanvas.height = 750;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 1125;
    this.screenBufferCanvas.height = 750;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    // Create HTML UI Elements
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "";
    document.body.appendChild(message);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.hitTest = this.hitTest.bind(this);
    this.hitBoxTest = this.hitBoxTest.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
    this.interval = setInterval(this.loop,20);
  }

  handleKeyDown(event) {
    event.preventDefault();
    var message = document.getElementById("message");
    switch(event.key) {
      case 'ArrowLeft':
        this.input.direction = 'left';
        break;
      case 'ArrowRight':
        this.input.direction = 'right';
        break;
      case 'ArrowUp':
        this.input.thrusters = 'on';
        break;
      case ' ':
        this.input.laser = 'active';
        break;
    }
  }

  handleKeyUp(event) {
    event.preventDefault();
    if(event.key == 'ArrowLeft' && this.input.direction == 'left') {
      this.input.direction = null;
    }
    if(event.key == 'ArrowRight' && this.input.direction == 'right') {
      this.input.direction = null;
    }
    if(event.key == 'ArrowUp' && this.input.thrusters == 'on') {
      this.input.thrusters = 'off';
    }
    if(event.key == ' ' && this.input.laser == 'active') {
      this.input.laser = 'inactive';
    }
  }

  handleKeyPress(event) {
    if(event.key == ' ' && this.input.laser == 'active') {
      this.timer = performance.now();
    }
  }

  hitTest(source,target) {
    var isHit = false;

    if(this.hitBoxTest(source,target)) {
      isHit = true;
    }
    return isHit;
  }

  hitBoxTest(source,target) {
    var sc = Math.abs(Math.cos(source.rads));
    var tc = Math.abs(Math.cos(target.rads));
    var ss = Math.abs(Math.sin(source.rads));
    var ts = Math.abs(Math.sin(target.rads));
    var sWidth = source.height*ss + source.width*sc;
    var tWidth = target.height*ts + target.width*tc;
    var sHeight = source.height*sc + source.width*ss;
    var tHeight = target.height*tc + target.width*ts;
    return!(
            ((source.y + sHeight) < target.y) ||
            (source.y > (target.y + tHeight)) ||
            ((source.x + sWidth) < target.x)  ||
            (source.x > (target.x + tWidth))
    );
  }

  update() {

    this.ship.update(this.input);
    for(var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
    for(var i = 0; i < this.lasers.length; i++) {
      this.lasers[i].update();
    }
    for(var i = 0; i < this.lasers.length; i++) {
      if(this.lasers[i].x < 0 || this.lasers[i].x > 1125 || this.lasers[i].y < 0 || this.lasers[i].y > 750) {
        this.lasers.splice(i,1);
      }
    }
    for(var i = 0; i < this.asteroids.length; i++) {
      for(var j = 0; j < this.lasers.length; j++) {
        if(this.hitTest(this.asteroids[i],this.lasers[j])) {
          this.lasers.splice(j,1);
          if(this.asteroids[i].mass == 0) this.asteroids.splice(i,1);
          else {
            var angle = Math.random()*360;
            this.asteroids.push(new Asteroid(this.asteroids[i].mass-1,this.asteroids[i].x+4,this.asteroids[i].y,(Math.random()*2+1),angle));
            this.asteroids.push(new Asteroid(this.asteroids[i].mass-1,this.asteroids[i].x-4,this.asteroids[i].y,(Math.random()*2+1),360-angle))
            this.asteroids.splice(i,1);
          }
        }
      }
    }

    if(this.input.laser == 'active') {
      if(performance.now()-this.timer > 200) {
        this.lasers.push(new Laser(this.ship.x+this.ship.sprite.width/2,this.ship.y+this.ship.sprite.height/2,this.ship.velocity));
        this.timer = performance.now();
      }
    }
  }

  render() {
    this.backBufferContext.fillStyle = '#f7f7f7';
    this.backBufferContext.fillRect(0, 0, 1125, 750);
    //this.backBufferContext.fillStyle = 'white';
    //this.backBufferContext.fillRect(0,0,1125,75);
    this.ship.render(this.backBufferContext);
    for(var i = 0; i < this.asteroids.length; i++) {
      if(!this.asteroids[i].isDestroyed){
        this.asteroids[i].render(this.backBufferContext);
      }
    }
    for(var i = 0; i < this.lasers.length;i++) {
      if(this.lasers[i] != null) this.lasers[i].render(this.backBufferContext);
    }
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }

  loop() {
    this.update();
    this.render();
  }
}
