import { Factory, trait } from 'ember-cli-mirage';

let day = Factory.extend({
  withTalks: trait({

  }),

  withEvents: trait({

  })
});

let talk = Factory.extend({

});

let speaker = Factory.extend({

});

let event = Factory.extend({

});

export default {
  day,
  talk,
  speaker,
  event
}
