![DV](https://www.deltavcodeschool.com/wp-content/uploads/DeltaV.png) 12: Express Middleware
===

## Resources
* skim [morgan docs](https://github.com/expressjs/morgan)
* skim [cors docs](https://github.com/expressjs/cors)
* skim [dotenv docs](https://github.com/motdotla/dotenv)

## Learning Objectives
* students will be able to work with application, router, and 3rd party middleware through the use of express.js
* students will be able to implement custom middleware through the use of express.js
* students will be able to create custom routers for a specific resource

## Overview
#### Middleware
  * **Overview**
    * middleware functions are functions that have access to the `req` and `res` objects
    * middleware can also access the next middleware function in the middleware chain by calling `next()`

  * **Types of Middleware**
    * **application level:** binds middleware to an instance of the `app` object through the use of:
      * `app.use()`
      * `app.METHOD()` *get, post, put, delete*
    * **router level:** binds middleware to an instance of `express.Router`
    * **error handling:** handles error status codes, messages, etc in a single location
      * error middleware must be used below other `app.use` calls
      * it contains 4 arguments `(err, req, res, next)`
    * **built-in:** helper methods provided by `express`
      * ex: `express.static()`
    * **3rd party:** is used by passing 3rd party middleware into an `app.use` call
      * ex: `app.use(bodyParser.json())`
      * ex: `app.use(cors())`

#### Express `Router`
  * **Overview**
    * `express.Router` is used to create modular route handlers
      * this is done through an instance of `express.Router`
    * today, we'll use an instance of the `express.Router` to create a custom `note-router` with **GET**, **POST**, and **PUT** route functionality

#### Express API Visualization
  ![visualization](https://s3-us-west-2.amazonaws.com/s.cdpn.io/154088/express-api.png)
