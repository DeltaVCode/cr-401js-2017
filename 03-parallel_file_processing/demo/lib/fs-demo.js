const fs = require('fs');

function readData(filename, cb) {
  fs.readFile(`${__dirname}/../data/${filename}`,
    (err, buff) => {
      if (err) { return cb(err); }

      console.log(`Data from ${filename}`);

      cb && cb(null, buff);
    });
}

exports.readTwo = function(file1, file2, cb) {
  var datSmash = '';
  readData(file1, (err, data1) => {
    if (err) { return cb(err); }
    datSmash += data1;

    readData(file2, (err, data2) => {
      if (err) { return cb(err); }

      datSmash += data2;

      cb(err, datSmash);
    })
  })
}

readData('01.txt',
  () => readData(`02.txt`,
    () => readData(`03.txt`, (err, data) => {
      if (err) throw err;
      console.log(data.length);
    })
  )
);

exports.readData = readData;
