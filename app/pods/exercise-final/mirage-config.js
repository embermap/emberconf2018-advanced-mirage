export default function() {
  // this.timing = 25;

  this.get('/episodes', recordsFor('episodes', [
    filter([ 'name', 'summary', 'season', 'number' ]),
    sort(),
    paginate()
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
        filteredRecords = filteredRecords.filter(record => record[property].toString().match(matcher));
      }
    });

    return filteredRecords;
  }
}

function sort() {
  return (records, request) => {
    let sort = request.queryParams['sort'];

    return records.sort((a, b) => {
      if (sort === 'airdate') {
        return new Date(a.airdate) - new Date(b.airdate);
      } else if (sort === '-airdate') {
        return new Date(b.airdate) - new Date(a.airdate);
      }
    });
  }
}

function paginate() {
  return (records, request) => {
    let pageSize = 4;
    let itemCount = records.models.length;
    let pageCount = Math.ceil(itemCount / pageSize);
    let page = request.queryParams['page[number]'];
    let start = (page - 1) * pageSize;
    let end = (page) * pageSize;

    let paginatedRecords = records.slice(start, end);
    paginatedRecords.meta = {
      page,
      pageCount,
      itemCount
    };

    return paginatedRecords;
  }
}
