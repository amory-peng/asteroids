const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

function Asteroid(pos) {
  this.pos = pos;
  MovingObject.call(this, {
    pos: pos,
    vel: randomVec(3),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR
  });
}

function randomVec(length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
}


Asteroid.COLOR = 'green';
Asteroid.RADIUS = '20';

Util.inherits(Asteroid, MovingObject);

// const test = new Asteroid(
//   [0,0]
// );


//
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
// test.draw(context);
//
module.exports = Asteroid;
