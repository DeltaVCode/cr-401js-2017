const initialState = [];

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case 'CATEGORY_CREATE':
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
