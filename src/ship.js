// ship.js

export default class Ship {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speed = {
      x: 0,
      y: 0,
      direction: -Math.PI/2
    };
  }
}
