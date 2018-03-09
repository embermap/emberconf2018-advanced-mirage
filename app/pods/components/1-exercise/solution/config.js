export default function() {

  this.get('/episodes', (schema, request) => {
    let season = request.queryParams['filter[season]'];
    let episodes;

    if (season) {
      episodes = schema.episodes.where({ season });
    } else {
      episodes = schema.episodes.all();
    }

    return episodes;
  });

}
