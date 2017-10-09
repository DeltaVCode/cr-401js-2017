export default store =>
  next =>
    action => {
      if (typeof action === 'function') {
        console.log('__THUNK', action);
        return action(store.dispatch, store.getState);
      }

      return next(action);
    };
