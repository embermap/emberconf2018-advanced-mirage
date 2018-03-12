import Server from 'ember-cli-mirage/server';
import { Model } from 'ember-cli-mirage';
import { episodes } from 'emberconf2018-advanced-mirage/mirage/fixtures/index';
import Serializer from './serializer';
import baseConfig from './config';

export default function() {

  return new Server({
    serializers: {
      application: Serializer
    },

    models: {
      episode: Model
    },

    fixtures: {
      episodes
    },

    baseConfig
  })

}
