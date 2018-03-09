export default function() {

  this.get('/episodes', (schema, request) => {
    let episodes = schema.episodes.all();

    [ 'season', 'name' ].forEach(prop => {
      let value = request.queryParams[`filter[${prop}]`];
      if (value) {
        let matcher = new RegExp(value, 'gi');
        episodes = episodes.filter(episode => matcher.test(episode[prop]));
      }
    });

    return episodes;
  });

}
