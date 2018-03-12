import Server from 'ember-cli-mirage/server';
import { Model, hasMany, belongsTo, JSONAPISerializer } from 'ember-cli-mirage';
import scenario from './scenario';
import factories from './factories';

export default function() {

  return new Server({
    serializers: {
      application: JSONAPISerializer
    },
    models: {
      day: Model.extend({
        activities: hasMany({ polymorphic: true })
      }),
      talk: Model.extend({
        day: belongsTo({ inverse: 'activities' }),
        speakers: hasMany()
      }),
      event: Model.extend({
        day: belongsTo({ inverse: 'activities' }),
      }),
      speaker: Model.extend({
        talks: hasMany()
      })
    },

    factories,

    scenarios: {
      default: scenario
    },

    baseConfig() {
      this.get('days');
    }
  })

}
