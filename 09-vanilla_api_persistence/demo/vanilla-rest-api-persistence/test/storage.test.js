'use strict';

const { expect } = require('chai');
const storage = require('../lib/storage');

describe('storage', function() {
  const schemaName = 'people';
  const itemToSave = { id: 12, name: 'Keith' };

  describe('createItem', function() {
    it('should save item', function(done) {
      storage.createItem(schemaName, itemToSave)
        .then(saveItem => {
          expect(saveItem).to.deep.equal(itemToSave);
          done();
        })
        .catch(done)
    });
  });

  describe('fetchItem', function() {
    it('should fetch item', function (done) {
      storage.fetchItem(schemaName, itemToSave.id)
        .then(fetchedItem => {
          expect(fetchedItem).to.deep.equal(itemToSave);
          done();
        })
        .catch(done)
    });

      it('should fail given missing schema', function (done) {
        storage.fetchItem('missing', itemToSave.id)
          .catch(err => {
            expect(err).to.not.be.null
            done();
          });
      });
  });
});
