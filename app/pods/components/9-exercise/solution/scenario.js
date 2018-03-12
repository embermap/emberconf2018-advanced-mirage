export default function(server) {

  server.create('day', 'withEvents', {
    name: 'March 13th'
  });

  server.create('day', 'withTalks', {
    name: 'March 14th'
  });

  server.create('day', 'withTalks', 'withEvents', {
    name: 'March 15th'
  });

}
