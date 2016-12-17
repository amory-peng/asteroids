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
