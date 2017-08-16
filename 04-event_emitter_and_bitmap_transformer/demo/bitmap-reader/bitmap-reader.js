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
bmp.paletteColorCount = bitmap.readUIntLE(0x2E, 4) || (1 << bmp.bpp);

console.log('bitmap:', bmp);

const img = bitmap.slice(bmp.offset);

img.fill(0x1c, 0, bmp.width * 10);

const bytesPerColor = 4;
const palette = bitmap.slice(0x36, bmp.paletteColorCount * bytesPerColor);

// Standard 16 colors
const colors = [
  0x000000,
  0x800000,
  0x008000,
  0x808000,
  0x000080,
  0x800080,
  0x008080,
  0xc0c0c0,
  0x808080,
  0xff0000,
  0x00ff00,
  0xffff00,
  0x0000ff,
  0xff00ff,
  0x00ffff,
  0xffffff,
];
colors.forEach((c, i) => palette.writeUIntLE(c, i << 2, 3));

console.log('palette', palette.toString('hex', 0));

console.log(bitmap.toString('hex', bmp.offset, bmp.offset + 100));

const outPath = `${__dirname}/output/half-and-half.bmp`;
fs.writeFileSync(outPath, bitmap);
// console.log(fs.readFileSync(outPath).toString('hex', 0, 20));
