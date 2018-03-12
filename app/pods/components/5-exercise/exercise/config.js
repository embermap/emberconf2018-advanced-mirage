export default function() {

  this.get('/episodes', (schema, request) => {
    let episodes = schema.episodes.all();

    let pageSize = 4;
    let itemCount = episodes.length;
    let pageCount = Math.ceil(itemCount / pageSize);
    let page = request.queryParams['page[number]'];
    let start = (page - 1) * pageSize;
    let end = (page) * pageSize;

    return episodes.slice(start, end);
  });

}
