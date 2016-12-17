/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// require('./lib/moving_object.js');
	//
	// require('./lib/util.js');

	// require('./lib/asteroid.js');

	// require('./lib/game.js');
	//
	// require('./lib/game_view.js');

	__webpack_require__(6);

	__webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function MovingObject (params) {
	  this.pos = params.pos;
	  this.vel = params.vel;
	  this.radius = params.radius;
	  this.color = params.color;
	  this.game = params.game;
	}

	MovingObject.prototype.draw = function(ctx) {
	  // var canvas = document.getElementById('myCanvas');
	  // var context = canvas.getContext('2d');

	  ctx.beginPath();
	  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	  ctx.closePath();
	  ctx.fillStyle = this.color;
	  ctx.fill();
	  ctx.lineWidth = 5;
	  ctx.strokeStyle = '#003300';
	  ctx.stroke();
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  let x1 = this.pos[0];
	  let y1 = this.pos[1];
	  let x2 = otherObject.pos[0];
	  let y2 = otherObject.pos[1];
	  let dist1 = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
	  let dist2 = this.radius + otherObject.radius;
	  return dist1 < dist2;
	};

	MovingObject.prototype.collidedWith = function(otherObject) {
	//   this.game.remove(this);
	//   this.game.remove(otherObject);
	};

	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.game.wrap(this.pos);
	};

	module.exports = MovingObject;

	// const thing1 = new MovingObject(
	//   {pos: [0,0], vel: 0, radius: 10, color: 'green'}
	// );
	// const thing2 = new MovingObject(
	//   {pos: [25,72], vel: 0, radius: 10, color: 'green'}
	// );
	//
	//
	// console.log(thing1.isCollidedWith(thing2));
	// var canvas = document.getElementById('myCanvas');
	// var context = canvas.getContext('2d');
	// thing.draw(context);


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }

	};

	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(2);
	const Ship = __webpack_require__(7);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(7);
	const DIM_X = 1000;
	const DIM_Y = 500;
	const NUM_ASTEROIDS = 15;

	function Game() {
	  this.start_pos = [DIM_X/2, DIM_Y/2];
	  this.ship = new Ship(this.start_pos, this);
	  this.asteroids = [];
	  for (let i = 0; i < NUM_ASTEROIDS; i++) {
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
	  this.moveObjects(ctx);
	  this.checkCollisions();
	};

	Game.prototype.moveObjects = function(ctx) {
	  this.allObjects().forEach((obj) => {
	    obj.move();
	  });
	};



	module.exports = Game;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);
	const Ship = __webpack_require__(7);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// let canvas = document.getElementById('myCanvas');
	// let context = canvas.getContext('2d');


	const GameView = __webpack_require__(5);



	document.addEventListener("DOMContentLoaded", () => {
	  let canvas = document.getElementById('myCanvas');
	  let context = canvas.getContext('2d');
	  const gameView = new GameView(context);
	  gameView.start();
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(2);

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


/***/ }
/******/ ]);