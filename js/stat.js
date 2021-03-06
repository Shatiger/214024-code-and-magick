'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + GAP + FONT_GAP);

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';

    var barX = CLOUD_X + GAP + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i;
    var barY = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP - Math.round((BAR_HEIGHT * times[i]) / maxTime);
    var barHeight = Math.round((BAR_HEIGHT * times[i]) / maxTime);

    var playerY = CLOUD_Y + CLOUD_HEIGHT - GAP;
    var pointsY = barY - GAP;

    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], barX, playerY);
    ctx.fillText(Math.round(times[i]), barX, pointsY);
  }
};
