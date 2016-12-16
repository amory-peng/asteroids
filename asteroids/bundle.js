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

	__webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function MovingObject (params) {
	  this.pos = params.pos;
	  this.vel = params.vel;
	  this.radius = params.radius;
	  this.color = params.color;
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
	//
	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};

	module.exports = MovingObject;


	// const thing = new MovingObject(
	//   {pos: [0,0], vel: 0, radius: 10, color: 'green'}
	// );
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);

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


/***/ }
/******/ ]);