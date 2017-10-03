import * as actions from './category-actions';
import deepFreeze from 'deep-freeze';

test('category create', () => {
  const category = {
    title: 'Test',
  };

  deepFreeze(category);

  let res = actions.categoryCreate(category);

  expect(res.type).toBe('CATEGORY_CREATE');
  expect(res.payload.title).toBe('Test');
  expect(res.payload.id).not.toBe(undefined);
  expect(res.payload.timestamp).not.toBe(undefined);
});
