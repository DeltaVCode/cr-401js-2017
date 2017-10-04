const initialState = [];

let validateCategory = (category) => {
  if (!category.id) {
    throw new Error('Validation Error: category must include id');
  }
  if (!category.title) {
    throw new Error('Validation Error: category must include title');
  }
}

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case 'CATEGORY_CREATE':
      validateCategory(payload);
      return [...state, payload];
    case 'CATEGORY_REMOVE':
      return state.filter(category =>
        category.id !== payload.id);
    case 'CATEGORY_UPDATE':
      return state.map(category =>
        category.id === payload.id ? payload : category);
    default:
      return state;
  }
};
