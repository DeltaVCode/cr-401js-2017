export default store => next => action => {
  if (typeof action.then === 'function') {
    action.then(res => store.dispatch(res))
      .catch(err => {
        console.log(err);
      });
    return;
  }

  next(action);
}
