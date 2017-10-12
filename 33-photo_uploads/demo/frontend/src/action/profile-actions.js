import superagent from 'superagent';

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,
});

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
});

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  const { auth } = getState();
  const { bio, avatar } = profile;

  return superagent.post(`${__API_URL__}/profiles`)
    .set(`Authorization`, `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      dispatch(profileCreate(res.body));
      return res;
    });
};

export const profileFetchRequest = () => (dispatch, getState) => {
  const { auth } = getState();
  return superagent.get(`${__API_URL__}/profiles/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(profileCreate(res.body));
      return res;
    });
}
