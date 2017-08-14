![DV](https://www.deltavcodeschool.com/wp-content/uploads/DeltaV.png) 16: Basic Auth
===

## Resources
* read [basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication)

## Learning Objectives
* students will be able to create basic authorization middleware
* students will be able to test basic authorization for signup/signin routes

## Overview
#### Continuous Integration (CI)
  * **Overview**
    * CI is the concept of merging new code into a collaborative repository multiple times a day
    * CI tools provide us with a basic level of build automation and software quality management (SQM) - this is done by:
      * running our build processes
      * checking to ensure our build is working
      * checking to ensure that all of our tests have passed

  * **TravisCI**
    * [TravisCI](http://www.travis-ci.org) is an easy to use, highly configurable CI tool
    * to enable a new repository to work with TravisCI, you simply need to:
      * create an account with TravisCI
      * enable the repository(s) you wish to use
      * create a `.travis.yml` file, which is used to configure a build **(see example file below)**
      * each time a new PR is made, TravisCI will run and provide the build status to ensure all checks have passed *(using the built in TravisCI widget on GitHub)*

  * **Example: `.travis.yml`**
    ``` javascript
      language: node_js
      node_js:
        - 'stable'
      services:
        - mongodb
      addons:
        apt:
          sources:
            - ubuntu-toolchain-r-test
          packages:
            - gcc-4.8
            - g++-4.8
      env:
        - CXX=g++-4.8
      sudo: required
      before_script: npm i
      script:
        - npm run test
    ```

#### Authorization & Authentication
  * **Authorization**
    * **authorization** refers to *user permissions*
      * we'll be using authorization to verify access to use our application

  * **Authentication**
    * **authentication** refers to *who you are*
      * think of authentication as a user *login* and *password*

  * **Basic Authentication Scheme**
    * basic access authentication is used when a user provides a username and password over HTTP
    * basic auth provides **no real significant protection** as the credentials are sent through the HTTP headers when making a request
    * the `req.headers.authorization` header property provides us with a standard base64 encoded string that is prepended with `Basic `
    * upon splitting off the end of the `Basic ` base64 string, we can transform this into a UTF-8 string and grab the username and password as they are now available and split with a `:`
      * ex: `username:password`
