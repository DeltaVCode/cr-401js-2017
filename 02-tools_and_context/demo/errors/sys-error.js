const fs = require('fs');

try {
  fs.readFileSync('missing');
} catch (e) {
  console.log(e);
}
