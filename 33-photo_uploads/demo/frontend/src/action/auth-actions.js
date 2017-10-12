import superagent from 'superagent';
import * as util from '../lib/util';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token
});

export const tokenDelete = () => ({
  type: 'TOKEN_DELETE',
});

export const logout = () => {
  localStorage.removeItem('token');
  return tokenDelete();
};

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${__API_URL__}/signup`)
    .send(user)
    .then(res => {
      util.log(res);
      dispatch(tokenSet(res.text));

      try {
        localStorage.token = res.text;
      } catch (err) {
        console.log(err);
      }
      return res;
    });
};

export const signinRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/login`)
    .auth(user.username, user.password)
    .then(res => {
      dispatch(tokenSet(res.text));

      try {
        localStorage.token = res.text;
      } catch (err) {
        console.log(err);
      }
      return res;
    });
};
