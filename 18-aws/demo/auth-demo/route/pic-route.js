'use strict';

const Router = require('express').Router;
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('app:route/pic');

const Pic = require('../model/pic');
const Gallery = require('../model/gallery');
const router = module.exports = new Router();

const dataDir = `${__dirname}/../temp`;
const upload = require('multer')({ dest: dataDir });

const fs = require('fs');
const path = require('path');
const del = require('del');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();
const s3uploadAsync = (options) => {
  return new Promise((resolve, reject) => {
    s3.upload(options, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

router.post('/api/gallery/:id/pic', upload.single('image'), (req, res, next) => {
  debug(`POST /api/gallery/${req.params.id}`);

  if (!req.file) {
    return next(createError(400, 'file not found'));
  }
  if (!req.file.path) {
    return next(createError(500, 'file not saved'));
  }

  req.file.ext = path.extname(req.file.originalname);
  debug('file', req.file);

  let s3options = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}-${req.file.originalname}`,
    Body: fs.createReadStream(req.file.path),
  };

  Gallery.findById(req.params.id)
    .then(gallery => {
      if (!gallery)
        return next(createError(404, 'gallery not found'));

      return s3uploadAsync(s3options);
    })
    .then(s3data => {
      debug('s3data', s3data);
      del([req.file.path]);
      return new Pic({
        ...req.body,
        objectKey: s3data.Key,
        imageURI: s3data.Location,
        userID: req.user._id,
        galleryID: req.params.id,
      }).save();
    })
    .then(pic => res.json(pic))
    .catch(next);
});
