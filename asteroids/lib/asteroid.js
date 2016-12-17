const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Ship = require('./ship.js');

Asteroid.COLOR = 'green';
Asteroid.RADIUS = 20;

function Asteroid(pos, game) {
  this.pos = pos;
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

  }


};

function randomVec(length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
}



const thing1 = new Asteroid(
  {pos: [0,0], vel: 0, radius: 10, color: 'green'}
);
const thing2 = new Asteroid(
  {pos: [25,72], vel: 0, radius: 10, color: 'green'}
);

console.log(thing1.isCollidedWith(thing2));

module.exports = Asteroid;
