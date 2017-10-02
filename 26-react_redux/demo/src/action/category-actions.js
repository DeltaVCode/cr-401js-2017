import uuid from 'uuid/v1';

export const categoryCreate = (category) => {
  return {
    type: 'CATEGORY_CREATE',
    payload: Object.assign({}, category, {
      id: uuid(),
      timestamp: new Date(),
    }),
  };
}

export const categoryUpdate = (category) => {
  return {
    type: 'CATEGORY_UPDATE',
    payload: category,
  };
};

export const categoryRemove = (category) => {
  return {
    type: 'CATEGORY_REMOVE',
    payload: category,
  };
};
