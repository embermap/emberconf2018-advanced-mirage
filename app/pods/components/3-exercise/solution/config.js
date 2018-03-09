export default function() {

  this.get('/episodes', filterable('episodes', [ 'season', 'name' ]));

  this.get('/characters', filterable('characters', [ 'name' ]));

}

function filterable(resource, properties) {
  return (schema, request) => {
    let episodes = schema[resource].all();

    properties.forEach(prop => {
      let value = request.queryParams[`filter[${prop}]`];
      if (value) {
        let matcher = new RegExp(value, 'gi');
        episodes = episodes.filter(episode => matcher.test(episode[prop]));
      }
    });

    return episodes;
  };
}
