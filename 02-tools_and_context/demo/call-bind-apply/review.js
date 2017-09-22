'use strict';

this.global = true;

var map = function (src) {
  console.log({ src,  'this': this });
};
console.log(map);
map('no bind');

map.call([2,4,6], 'call');
map.apply([1,3,5], ['apply']);

var numbers = [1,2,3,4];

var mapNumbers = map.bind(numbers);
console.log(mapNumbers);
mapNumbers('bound');

/*
app.get('/api/gallery/:id', (req, res, next) => {
  Gallery.findById(id)
    .then(res.json.bind(res)) // === then(g => res.json(g))
    .catch(next);
});
*/
