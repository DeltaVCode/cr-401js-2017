'use strict';

exports.invert = function (colorTable) {
  colorTable.forEach((c,i) => {
    colorTable[i] = ~c;
  })
}
