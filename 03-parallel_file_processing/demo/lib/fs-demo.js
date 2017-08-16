const fs = require('fs');

function readData(filename, cb) {
  fs.readFile(`${__dirname}/../data/${filename}`,
    (err, buff) => {
      if (err) { return cb(err); }

      console.log(`Data from ${filename}`);

      cb && cb(null, buff);
    });
}

exports.readAll = function(files, cb) {
  var results = [];
  var resultCount = 0;

  files.forEach((file, index) => {
    readData(file, (err, data) => {
      if (err) { return cb(err); }

      results[index] = data.toString();
      resultCount++;

      if (resultCount === files.length) {
        results.forEach(console.log);
        cb(null, results);
      }
    })
  })
}

exports.readTwo = function(file1, file2, cb) {
  var datSmash = '';
  readData(file1, (err, data1) => {
    if (err) { return cb(err); }
    datSmash += data1;

    readData(file2, (err, data2) => {
      if (err) { return cb(err); }

      datSmash += data2;

      cb(null, datSmash);
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
