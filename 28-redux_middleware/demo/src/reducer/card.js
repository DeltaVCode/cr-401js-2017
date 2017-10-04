let validateCard = (card) => {
  if (!card.id) {
    throw new Error('Validation Error: card must include id');
  }
  if (!card.title) {
    throw new Error('Validation Error: card must include title');
  }
}

export default (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'CATEGORY_CREATE':
      return {
        ...state,
        [payload.id]: [],
      };
    case 'CATEGORY_REMOVE':
      let nextState = {...state};
      delete nextState[payload.id];
      return nextState;
    case 'CARD_CREATE':
      validateCard(payload);
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
