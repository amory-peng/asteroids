const Game = require('./game.js');
const Ship = require('./ship.js');

function GameView(ctx) {
  this.game = new Game();
  this.context = ctx;
  this.ship = this.game.ship;
}
//
// GameView.prototype.bindKeyHandlers = function() {
//   key('up', this.ship.power([0, -1]));
//   key('down', this.ship.power([0, 1]));
//   key('right', this.ship.power([1, 0]));
//   key('left', this.ship.power([-1, 0]));
//
// };
GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

GameView.prototype.bindKeyHandlers = function () {

  const ship = this.ship;
  console.log(ship);
  Object.keys(GameView.MOVES).forEach((k) => {
    let move = GameView.MOVES[k];
    key(k, function () { console.log(ship); ship.power(move); });
  });
};



GameView.prototype.start = function() {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.draw(this.context);
    this.game.step(this.context);
  } ,1000/60);
};


module.exports = GameView;
