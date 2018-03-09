import Route from '@ember/routing/route';
import Server from 'ember-cli-mirage/server';
import { Model, JSONAPISerializer } from 'ember-cli-mirage';
import episodes from 'emberconf2018-advanced-mirage/mirage/fixtures/episodes';
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
  },

  createServer() {
    return new Server({
      serializers: {
        application: JSONAPISerializer
      },
      models: {
        episode: Model
      },
      fixtures: {
        episodes,
      },
      baseConfig
    })
  },

});
