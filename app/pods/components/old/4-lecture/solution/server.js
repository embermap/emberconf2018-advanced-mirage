import Server from 'ember-cli-mirage/server';
import { Model, JSONAPISerializer } from 'ember-cli-mirage';
import { episodes, characters } from 'emberconf2018-advanced-mirage/mirage/fixtures/index';
import baseConfig from './config';

export default function() {

  return new Server({
    serializers: {
      application: JSONAPISerializer
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
