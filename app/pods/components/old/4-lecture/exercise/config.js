export default function() {

  this.get('/episodes', recordsFor('episodes', [
    filter([ 'season', 'name' ])
  ]));

  this.get('/characters', recordsFor('characters'));

  // this.get('/characters');
  // this.get('/episodes', filterable('episodes', [ 'season', 'name' ]));
  //
  // this.get('/characters', filterable('characters', [ 'name' ]));

}

function recordsFor(resourceName, transforms=[]) {

  return (schema, request) => {
    let records = schema[resourceName].all();

    transforms.forEach(transform => {
      records = transform(records, request);
    });

    return records;
  };

}

function filter(properties) {
  return (records, request) => {
    let filteredRecords = records;

    properties.forEach(prop => {
      let value = request.queryParams[`filter[${prop}]`];
      if (value) {
        let matcher = new RegExp(value, 'gi');
        filteredRecords = filteredRecords.filter(episode => matcher.test(episode[prop]));
      }
    });

    return filteredRecords;
  };
}

// function filterable(resource, properties) {
//   return (schema, request) => {
//     let episodes = schema[resource].all();
//
//     properties.forEach(prop => {
//       let value = request.queryParams[`filter[${prop}]`];
//       if (value) {
//         let matcher = new RegExp(value, 'gi');
//         episodes = episodes.filter(episode => matcher.test(episode[prop]));
//       }
//     });
//
//     return episodes;
//   };
// }
