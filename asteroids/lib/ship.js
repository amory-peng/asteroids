const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

Ship.RADIUS = 5;
Ship.COLOR = 'blue';

function Ship(pos, game) {
  this.start_pos = game.start_pos;
  MovingObject.call(this, {
    pos: pos,
    vel: [0,0],
    radius: Ship.RADIUS,
    color: Ship.COLOR,
    game: game
  });
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {


  this.pos = this.game.startPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};




// let ship = new Ship([0,0], "test");
// ship.relocate();
// ship.power([0,1]);
// console.log(ship);
module.exports = Ship;
