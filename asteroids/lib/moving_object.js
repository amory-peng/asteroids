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
