import { Factory, trait } from 'ember-cli-mirage';

let day = Factory.extend({
  withTalks: trait({
    afterCreate(day, server) {
      server.createList('talk', 3, {
        day
      });
    }
  }),

  withEvents: trait({
    afterCreate(day, server) {
      server.createList('event', 3, {
        day
      });
    }
  })
});

let talk = Factory.extend({
  title(i) {
    return `Talk ${i}`;
  },

  start: '9:00am',
  end: '10:00am',

  afterCreate(talk, server) {
    server.create('speaker', {
      talks: [talk]
    });
  }
});

let speaker = Factory.extend({
  name: 'Alice Smith'
});

let event = Factory.extend({
  title(i) {
    return `Event ${i}`;
  },

  start: '9:00am',
  end: '10:00am',
  location: 'Location'
});

export default {
  day,
  talk,
  speaker,
  event
}
