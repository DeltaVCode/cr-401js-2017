import superagent from 'superagent';

export const listCreate = (list) => ({
  type: 'LIST_CREATE',
  payload: list,
});

export const listDelete = (list) => ({
  type: 'LIST_DELETE',
  payload: list
});

export const listUpdate = (list) => ({
  type: 'LIST_UPDATE',
  payload: list
});

export const listSet = (lists) => ({
  type: 'LIST_SET',
  payload: lists,
});

export const listCreateRequest = (list) =>
  (dispatch) => {
    superagent.post(`${__API_URL__}/api/list`)
      .send(list)
      .then(res =>
        {
          dispatch(listCreate(res.body));
          return res;
        });
  };

export const listDeleteRequest = (list) =>
  (dispatch) => {
    superagent.delete(`${__API_URL__}/api/list/${list._id}`)
      .then(res => {
        dispatch(listDelete(list));
      });
  }
