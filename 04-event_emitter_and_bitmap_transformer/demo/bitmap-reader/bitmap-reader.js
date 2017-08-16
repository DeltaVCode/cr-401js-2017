'use strict';

const fs = require('fs');
const bitmap = fs.readFileSync(`${__dirname}/assets/palette-bitmap.bmp`);

const bmp = {};

bmp.type = bitmap.toString('utf-8', 0, 2);
bmp.size = bitmap.readUInt32LE(2);
bmp.offset = bitmap.readUIntLE(0x0A, 4);
bmp.width = bitmap.readUIntLE(0x12, 4);
bmp.height = bitmap.readUIntLE(0x16, 4);

bmp.bpp = bitmap.readUIntLE(0x1C, 2);
bmp.paletteColorCount = bitmap.readUIntLE(0x2E, 4);

console.log('bitmap:', bmp);

const img = bitmap.slice(bmp.offset);

console.log(img.length);
console.log(img);

img.fill(0x1c, 0, img.length / 2);
img.fill(0x0f, img.length / 2);

console.log(img);

console.log(bitmap.toString('hex', bmp.offset, bmp.offset + 100));

const outPath = `${__dirname}/output/half-and-half.bmp`;
fs.writeFileSync(outPath, bitmap);
// console.log(fs.readFileSync(outPath).toString('hex', 0, 20));
