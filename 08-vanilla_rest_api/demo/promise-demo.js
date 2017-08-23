'use strict';

function success(result) {
  console.log('success', result);
}

function fail(err) {
  console.error('fail', err);
}

function delay(value, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms||100, value);
  });
}

Promise.resolve('#winning').catch(fail);
Promise.reject('#fail').catch(fail);
function readFile(filename) {
  //if (filename === 'two.txt') return Promise.reject('not found');
  return delay(`Reading ${filename}`, Math.random() * 500);
}

Promise.all([
  Promise.resolve('all#winning'),
  readFile('one.txt'),
  readFile('two.txt'),
//  Promise.reject('all#fail'),
]).then(success).catch(fail);

delay('waiting', 1000).catch(fail).then(success);

function bigNumber(num) {
  /*
  if (num < 100) {
    return Promise.reject(new Error(`${num} is too small`));
  }
  else if (num > 100) {
    return Promise.resolve(num);
  }
  */
  return new Promise(function (resolve, reject){
    if (num < 100) return reject(new Error('boom'));
    if (num > 100) return resolve(num);
  });
}
/*
bigNumber(5).then(success).catch(fail);
bigNumber(200).then(success);
bigNumber(100).then(success).catch(fail);
*/

Promise.all([
  bigNumber(200),
  bigNumber(100),
]).then(success).catch(fail);
