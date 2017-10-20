// game.js

import Ship from './ship';
import Laser from './laser';
import Asteroid from './asteroid';

export default class Game {
  constructor() {
    this.input = {direction: null,thrusters: 'off'};
    this.gameStarted = false;
    this.gamePaused = false;
    this.ship = new Ship(562.5,375);
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
        console.log(this.ship.velocity.x);
        break;
      case ' ':
        this.gameStarted = true;
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
  }

  update() {
    this.ship.update(this.input);
  }

  render() {
    this.backBufferContext.fillStyle = '#f7f7f7';
    this.backBufferContext.fillRect(0, 0, 1125, 750);
    //this.backBufferContext.fillStyle = 'white';
    //this.backBufferContext.fillRect(0,0,1125,75);
    this.ship.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }

  loop() {
    this.update();
    this.render();
  }
}
