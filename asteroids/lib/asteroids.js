// let canvas = document.getElementById('myCanvas');
// let context = canvas.getContext('2d');


const GameView = require('./game_view.js');



document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('myCanvas');
  let context = canvas.getContext('2d');
  const gameView = new GameView(context);
  gameView.start();
});
