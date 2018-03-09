export default function() {

  this.get('/episodes', (schema, request) => {
    let episodes = schema.episodes.all();

    if (request.queryParams['filter[season]']) {
      let season = request.queryParams['filter[season]'];
      episodes = episodes.filter(episode => episode.season == season);
    }

    return episodes;
  });

}
