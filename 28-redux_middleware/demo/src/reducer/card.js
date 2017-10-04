let validateCard = (card) => {
  if (!card.id) {
    throw new Error('Validation Error: card must include id');
  }
  if (!card.title) {
    throw new Error('Validation Error: card must include title');
  }
  if (!card.categoryID) {
    throw new Error('Validation Error: card must include categoryID');
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
    case 'CARD_UPDATE':
    {
      validateCard(payload);
      let categoryID = payload.categoryID;
      let categoryCards = state[categoryID];

      return {
        ...state,
        [categoryID]: categoryCards.map(card => {
          return card.id === payload.id ? payload : card;
        })
      };
    }
    case 'CARD_REMOVE':
    {
      validateCard(payload);
      let { categoryID } = payload;
      let categoryCards = state[categoryID]
      return {
        ...state,
        [categoryID]: categoryCards.filter(card => {
          return card.id !== payload.id;
        }),
      };
    }
    default:
      return state;
  }
};
