/*
 img2term
 Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/
var fs = require('fs');
var clc = require('cli-color');
var jpeg = require('jpeg-js');
var x256 = require('x256');

module.exports.clear = function () {
   process.stdout.write(clc.reset);
}

module.exports.print = function (fileName, scaleHeight, scaleWidth) {
   scaleHeight = scaleHeight || 1;
   scaleWidth = scaleWidth || 1;
   
   var rawImage = fs.readFileSync(fileName);
   var image = jpeg.decode(rawImage);
   
   process.stdout.write('\n');
   for (var j = 0; j < image.height; j += scaleHeight) {
      for (var i = 0; i < image.width; i += scaleWidth) {
         var indx = (j * image.width + i) << 2;
         var red = image.data[indx + 0];
         var green = image.data[indx + 1];
         var blue = image.data[indx + 2];
         var alpha = image.data[indx + 3];
         var color = x256(red, green, blue);
         process.stdout.write(clc.bgXterm(color).xterm(color)(' '));
      }
      process.stdout.write('\n');
   }
}
