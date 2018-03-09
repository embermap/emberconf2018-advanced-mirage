import Route from '@ember/routing/route';
import Server from 'ember-cli-mirage/server';
import { Model, JSONAPISerializer } from 'ember-cli-mirage';
import { episodes, characters } from 'emberconf2018-advanced-mirage/mirage/fixtures/index';
import baseConfig from './mirage-config';

export default Route.extend({

  activate() {
    this._super(...arguments);
    this.set('server', this.createServer());
  },

  deactivate() {
    this._super(...arguments);
    this.get('server').shutdown();
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.get('controller.findEpisodes').perform();
    this.get('controller.findCharacters').perform();
  },

  createServer() {
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
  },

});
