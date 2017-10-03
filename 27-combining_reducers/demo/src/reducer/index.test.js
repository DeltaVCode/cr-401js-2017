import deepFreeze from 'deep-freeze';

import reducer from './';

const defaultState = {
  categories: [],
};
deepFreeze(defaultState);

test('initial state should have all reducers', () => {
  let res = reducer();
  expect(res).toEqual(defaultState);
});

test('unknown action returns current state', () => {
  const state = defaultState;
  const action = {
    type: 'UNKNOWN',
  };

  deepFreeze(action);

  let res = reducer(state, action);

  expect(res).toEqual(state);
});
