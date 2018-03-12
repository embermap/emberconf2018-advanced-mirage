import Server from 'ember-cli-mirage/server';
import { Model } from 'ember-cli-mirage';
import scenario from './schema';

export default function() {

  return new Server({
    models: {
    },

    scenarios: {
      default: scenario
    },

    baseConfig() {}
  });

}
