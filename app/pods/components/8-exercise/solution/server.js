import Server from 'ember-cli-mirage/server';
import { Model, hasMany, belongsTo, JSONAPISerializer } from 'ember-cli-mirage';
import scenario from './schema';

export default function() {

  return new Server({
    serializers: {
      application: JSONAPISerializer
    },
    models: {
      day: Model.extend({
        activities: hasMany('activities', { polymorphic: true })
      }),
      talk: Model.extend({
        day: belongsTo('day'),
        speakers: hasMany('speakers')
      }),
      event: Model.extend({
        day: belongsTo('day'),
      }),
      speaker: Model.extend({
        talks: hasMany('talk')
      })
    },

    scenarios: {
      default: scenario
    },

    baseConfig() {
      this.get('days');
    }
  })

}
