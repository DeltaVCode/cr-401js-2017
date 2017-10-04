export default (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'CATEGORY_CREATE':
      return {
        ...state,
        [payload.id]: [],
      };
    case 'CATEGORY_REMOVE':{
      let nextState = {...state};
      delete nextState[payload.id];
      return nextState;
    case 'CARD_CREATE':
      let { categoryID } = payload;
      let categoryCards = state[categoryID];
      return {
        ...state,
        [categoryID]: [
          ...categoryCards,
          payload,
        ],
      };
    default:
      return state;
  }
};
