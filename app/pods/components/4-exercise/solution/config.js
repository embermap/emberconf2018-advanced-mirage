export default function() {

  this.get('/episodes', recordsFor('episodes', [
    filter([ 'season', 'name' ])
  ]));

  this.get('/characters', recordsFor('characters', [
    filter([ 'name' ])
  ]));

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

    properties.forEach(property => {
      let key = `filter[${property}]`;
      let value = request.queryParams[key];

      if (value) {
        let matcher = new RegExp(value, 'gi');
        filteredRecords = filteredRecords.filter(record => matcher.test(record[property]));
      }
    });

    return filteredRecords;
  }
}
