import Server from 'ember-cli-mirage/server';
import { Model, JSONAPISerializer } from 'ember-cli-mirage';
import { episodes, characters } from 'emberconf2018-advanced-mirage/mirage/fixtures/index';
import baseConfig from './config';

export default function() {

  return new Server({
    serializers: {
      application: JSONAPISerializer.extend({
        serialize(object) {
          let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);
          if (object.meta) {
            json.meta = object.meta;
          }
          return json;
        }
      })
    },

    models: {
      episode: Model,
      character: Model,
    },

    fixtures: {
      episodes,
      characters,
    },

    baseConfig
  })

}
