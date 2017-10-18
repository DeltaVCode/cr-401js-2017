'use strict'

import {Router} from 'express'
import User from '../model/user.js'
import bodyParser from 'body-parser'
import basicAuth from '../middleware/basic-auth.js'
import superagent from 'superagent';

function redirectToClient(res, reason) {
  res.redirect(`${process.env.CLIENT_URL}${process.env.CLIENT_URL.indexOf('?') < 0 ? '?' : '&'}reason=${reason}`);
}
export default new Router()
.get('/login/google', (req, res, next) => {
  let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  let clientId = `client_id=${process.env.GOOGLE_CLIENT_ID}`
  let oauthStuff = 'response_type=code&scope=openid%20profile%20email'
  let redirectUri = `redirect_uri=${process.env.CLIENT_URL}/oauth/google/code`;

  let actualUrl =
    `${AUTH_URL}?${clientId}&${oauthStuff}&${redirectUri}`;
  console.log(actualUrl);

  res.redirect(actualUrl);
})
.get('/oauth/google/code', (req, res, next) => {
  if (!req.query.code) {
    redirectToClient(res, 'no-code');
  } else {
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth/google/code`
    })
    .then(response => {
      console.log('POST: oauth2/v4/token', response.body);
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('Authorization', `Bearer ${response.body.access_token}`)
    })
    .then(response => {
      console.log('GET: /people/me/openIdConnect', response.body);
      return User.handleOAUTH(response.body);
    })
    .then(user => user.tokenCreate())
    .then( token => {
      console.log('my oauth token:', token);
      res.cookie('X-Slugchat-Token', token);
      redirectToClient(res, 'authorized');
    })
    .catch((error) => {
      console.error(error);
      redirectToClient(res, 'error');
    })
  }
})
.post('/signup', bodyParser.json() , (req, res, next) => {
  new User.createFromSignup(req.body)
  .then(user => user.tokenCreate())
  .then(token => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
  })
  .catch(next)
})
.get('/usernames/:username', (req, res, next) => {
  User.findOne({username: username})
  .then(user => {
    if(!user)
      return res.sendStatus(409)
    return res.sendStatus(200)
  })
  .catch(next)
})
.get('/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
  .then((token) => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
  })
  .catch(next)
})
