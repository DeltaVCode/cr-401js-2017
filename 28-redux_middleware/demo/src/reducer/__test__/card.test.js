import deepFreeze from 'deep-freeze';

import reducer from '../card';

const defaultState = {};
deepFreeze(defaultState);

test('create card creates card if category is empty', () => {
  const categoryID = 3;
  const state = {
    [categoryID]: [],
  };
  const action = {
    type: 'CARD_CREATE',
    payload: {
      title: 'New Card',
      id: 1,
      categoryID,
    },
  }

  deepFreeze(state);
  deepFreeze(action);

  let res = reducer(state, action);
  expect(res).toEqual({
    3: [
      { categoryID, id: 1, title: 'New Card' },
    ],
  })
});

test('create card creates card if category is not empty', () => {
  const categoryID = 3;
  const state = {
    [categoryID]: [
      { categoryID, id: 12, title: 'Old Card' },
    ],
  };
  const action = {
    type: 'CARD_CREATE',
    payload: {
      title: 'New Card',
      id: 1,
      categoryID,
    },
  }

  deepFreeze(state);
  deepFreeze(action);

  let res = reducer(state, action);
  expect(res).toEqual({
    3: [
      { categoryID, id: 12, title: 'Old Card' },
      { categoryID, id: 1, title: 'New Card' },
    ],
  })
});

test('create card throws validation error if id is missing', () => {
  const categoryID = 3;
  const state = {
    [categoryID]: [],
  };
  const action = {
    type: 'CARD_CREATE',
    payload: {
      title: 'New Card',
      categoryID,
    },
  }

  deepFreeze(state);
  deepFreeze(action);

  expect(() => {
    reducer(state, action);
  }).toThrow(/^Validation.+ id$/);
})

test('create card throws validation error if title is missing', () => {
  const categoryID = 3;
  const state = {
    [categoryID]: [],
  };
  const action = {
    type: 'CARD_CREATE',
    payload: {
      id: 12,
      categoryID,
    },
  }

  deepFreeze(state);
  deepFreeze(action);

  expect(() => {
    reducer(state, action);
  }).toThrow(/^Validation.+ title$/);
})

test('create category initializes cards with category', () => {
  const categoryID = 5;
  let state = defaultState;
  let action = {
    type: 'CATEGORY_CREATE',
    payload: { id: categoryID },
  };

  deepFreeze(action);

  let res = reducer(state, action);

  expect(res).toEqual({
    [categoryID]: [],
  });
})

test('remove category removes category from cards', () => {
  const categoryID = 5;
  let state = {
    [categoryID]: [
      { id: 50, title: 'Deleted Card' },
    ],
  };
  let action = {
    type: 'CATEGORY_REMOVE',
    payload: { id: categoryID },
  };

  deepFreeze(state);
  deepFreeze(action);

  let res = reducer(state, action);

  expect(res).toEqual({});
  expect(categoryID in res).toBe(false);
})
