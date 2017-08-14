![DV](https://www.deltavcodeschool.com/wp-content/uploads/DeltaV.png) 18: Image Uploads w/ AWS S3
===

## Resources
* read [multer docs](https://github.com/expressjs/multer)
* create [AWS account](https://aws.amazon.com/)

## Learning Objectives
* students will be able to upload static assets to AWS S3
* students will be able to retrieve a cdn url that contains the previously uploaded static asset
* students will be able to work with secret and public access keys

## Overview
#### AWS S3
* **Overview**
  * S3 *(Amazon Simple Storage Service)* is a scalable object storage platform
  * S3 will be used as a way to store images used within our application
  * using the `aws-sdk` module, each time a new file is saved we will be provided with a url to the associated file
    * this url is what we will be saving to the database in our application, not the actual file
  * when uploading files to S3, we consider each file to be an "object"
  * "objects" can then be contained in buckets for later use

#### Additional Helpers
* **`.env` config**
``` javascript
  PORT='8000'
  MONGODB_URI='mongodb://localhost/yourdbname'
  APP_SECRET='yourdbsecret'
  AWS_BUCKET='yourbucketname'
  AWS_ACCESS_KEY_ID='youraccesskey'
  AWS_SECRET_ACCESS_KEY='yoursecretkey'
```

* **newly added `npm` modules**
  * `multer` - used for handling multipart form data (`entype="multipart/form-data"`)
  * `del` - deletes files and folders
  * `aws-sdk` - official sdk (software development kit) with helper tools for working with AWS
