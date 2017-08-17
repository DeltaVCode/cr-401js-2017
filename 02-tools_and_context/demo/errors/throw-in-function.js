function foo() {
  bar();
}

function bar() {
  baz();
}

function baz() {
  const e = new Error('baz failed');
  e.baz = true;
  e.version = '1.2';
  throw e;
}

try {
  foo();
} catch (e) {
  console.log(e);
  const f = new Error('new error');
  f.innerException = e;
  throw f;
} finally {
  console.log('Whether or not there was an error, log this.');
}

throw 1;
