const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Ship = require('./ship.js');

Asteroid.COLOR = 'green';
Asteroid.RADIUS = 30;

function Asteroid(pos, game) {
  MovingObject.call(this, {
    pos: pos,
    vel: randomVec(3 * Math.random() + 1),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
    game: game
  });
}


Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collidedWith = function(otherObject) {
  if (otherObject instanceof Ship ) {
    otherObject.relocate();
    return;
  }

  let temp = this.vel;
  this.vel = otherObject.vel;
  otherObject.vel = temp;
  this.move();
  otherObject.move();
  return ;
};

function randomVec(length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
}



module.exports = Asteroid;
