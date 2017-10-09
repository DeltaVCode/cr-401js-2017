export default store =>
  next =>
    action => {
      console.log('__ACTION__', action);

      try {
        let result = next(action);
        console.log('__STATE__', store.getState());
        return result;
      } catch (error) {
        error.action = action;
        console.log('__ERROR__', error);
        return error;
      }
    };
