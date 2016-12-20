const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const DIM_X = 1000;
const DIM_Y = 500;
const NUM_ASTEROIDS = 15;

function Game() {
  this.start_pos = [DIM_X/2, DIM_Y/2];
  this.ship = new Ship(this.start_pos, this);
  this.asteroids = [];
  while (this.asteroids.length < NUM_ASTEROIDS) {
    this.addAsteroids();
  }

}

Game.prototype.startPosition = function() {
  return [DIM_X/2, DIM_Y/2];
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]);
};

Game.prototype.addAsteroids = function() {
  let asteroid = new Asteroid(this.randomPosition(), this);
  //check for collisions on spawn
  let needNew = true;
  while (needNew === true) {
    needNew = false;
    for (let i = 0; i < this.asteroids.length; i++) {
      console.log(asteroid.pos, this.asteroids[i].pos);
      if (asteroid.isCollidedWith(this.asteroids[i])) {
        console.log(this.asteroids);
        needNew = true;
      }
    }
    if (needNew) {
      asteroid.pos = this.randomPosition();
    }
    console.log(needNew);
  }
  this.asteroids.push(asteroid);
};

Game.prototype.randomPosition = function() {
  let posX = Math.random() * DIM_X;
  let posY = Math.random() * DIM_Y;
  return [posX, posY];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, DIM_X, DIM_Y);
  this.allObjects().forEach ( (obj) => {
    obj.draw(ctx);
  });
};

Game.prototype.remove = function(obj) {
  let idx = this.allObjects().indexOf(obj);
  this.allObjects().splice(idx, 1);
};

Game.prototype.wrap = function(pos) {
  if (pos[0] > DIM_X) {
    pos[0] = 0;
  }
  if (pos[1] > DIM_Y) {
    pos[1] = 0;
  }
  if (pos[0] < 0) {
    pos[0] = DIM_X;
  }
  if (pos[1] < 0) {
    pos[1] = DIM_Y;
  }
  return pos;
};

Game.prototype.checkCollisions = function() {

  for (let i = 0; i < this.allObjects().length - 1; i++) {
    for (let j = i + 1; j < this.allObjects().length; j++) {
      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collidedWith(this.allObjects()[j]);
      }
    }
  }
};

Game.prototype.step = function(ctx) {
  this.checkCollisions();
  this.moveObjects(ctx);
  this.checkCollisions();
};

Game.prototype.moveObjects = function(ctx) {
  this.allObjects().forEach((obj) => {
    obj.move();
  });
};



module.exports = Game;
