import deepFreeze from 'deep-freeze';

import category from '../category';

test('initial state should be empty array', () => {
  let res = category();
  expect(res).toEqual([]);
});

test('unknown action returns current state', () => {
  const state = [];
  const action = {
    type: 'UNKNOWN',
  };

  deepFreeze(state);
  deepFreeze(action);

  let res = category(state, action);

  expect(res).toEqual(state);
});

test('create category', () => {
  const state = [{ title: 'Utilities' }];
  const action = {
    type: 'CATEGORY_CREATE',
    payload: { title: 'Groceries' },
  };

  deepFreeze([state, action]);

  let res = category(state, action);

  expect(res).toEqual([
    { title: 'Utilities' },
    { title: 'Groceries' },
  ])
});

test('remove category', () => {
  const state = [
    { id: 1, title: 'Utilities' },
    { id: 2, title: 'Groceries' },
  ];
  const action = {
    type: 'CATEGORY_REMOVE',
    payload: { id: 2 },
  };

  deepFreeze([state, action]);

  let res = category(state, action);

  expect(res).toEqual([
    { id: 1, title: 'Utilities' },
  ])
});

test('update category', () => {
  const state = [
    { id: 1, title: 'Utilities' },
    { id: 2, title: 'Groceries' },
  ];
  const action = {
    type: 'CATEGORY_UPDATE',
    payload: { id: 2, title: 'Food' },
  };

  deepFreeze([state, action]);

  let res = category(state, action);

  expect(res).toEqual([
    { id: 1, title: 'Utilities' },
    { id: 2, title: 'Food' },
  ])
});
