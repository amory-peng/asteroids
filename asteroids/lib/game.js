const Asteroid = require('./asteroid.js');

const DIM_X = 1000;
const DIM_Y = 1000;
const NUM_ASTEROIDS = 190;

function Game() {
  this.asteroids = [];
  for (let i = 0; i < NUM_ASTEROIDS; i++) {
    this.addAsteroids();
  }

}


Game.prototype.addAsteroids = function() {
  let asteroid = new Asteroid(this.randomPosition());
  this.asteroids.push(asteroid);
};

Game.prototype.randomPosition = function() {
  let posX = Math.random() * DIM_X;
  let posY = Math.random() * DIM_Y;
  return [posX, posY];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, DIM_X, DIM_Y);
  this.asteroids.forEach ( (asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function(ctx) {
  this.asteroids.forEach((asteroid) => {
    asteroid.move();
  });
};

let game = new Game();
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

setInterval( () => {
  game.draw(context);
  game.moveObjects(context);
}, 1000/60);

module.exports = Game;
