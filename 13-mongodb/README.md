![DV](https://www.deltavcodeschool.com/wp-content/uploads/DeltaV.png) 13: MongoDB and Express
===

## Resources
* read [mongoose guide](http://mongoosejs.com/docs/guide.html)

## Learning Objectives
* students will be able to work with the MongoDB database management system
* students will understand the primary concepts of working with a NoSQL database management system
* students will be able to create custom data models *(schemas)* through the use of mongoose.js
* students will be able to use mongoose.js helper methods for interacting with their database persistence layer

## Overview
#### MongoDB
  * **Overview**
    * **MongoDB** is a document based (noSQL) database
    * data is stored as a document with a series of key/value pairs
    * the data structure used to define a **MongoDB** document is referred to as `BSON` (Binary JSON)
    * you can install **MongoDB** through npm by running `npm install mongodb`
    * **MongoDB** runs as a daemon process and has an included shell client for easy database access
      * **start the MongoDB process:** `mongod`
      * **start the MongoDB shell:** `mongo`

#### Mongoose
  * **Overview**
    * **Mongoose** provides us with a schema based solution for modeling our application data
    * it provides us with helper methods, validation, queries, and logic hooks to speed up the dev process
    * basic usage:
    ``` javascript
      const mongoose = require('mongoose');
      mongoose.connect(process.env.MONGODB_URI);

      var Note = mongoose.model('Note', { name: String });

      var note = new Note({ name: 'test note' });
      note.save(function(err) {
        if (err) return err;
        console.log('new note created!');
      });
    ```

#### Mongo Shell Commands
  * **Commands**
    * `show dbs` - show a list of available databases
    * `use dbname` - switch to a new database
    * `show collections` - show a list of collections from the current database
    * `db.collection.find()` - show all documents in the collection
    * `db.collection.insert({ <data> })` - insert a new document into the collection
    * `db.collection.save()` - insert a new document or update an existing document in the collection
