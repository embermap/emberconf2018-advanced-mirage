import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import createMirageServer from './exercise/server';
// import createMirageServer from './solution/server';

export default Component.extend({

  store: service(),

  didInsertElement() {
    this._super(...arguments);

    this.set('server', createMirageServer());
    this.get('findEpisodes').perform();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('server').shutdown();
  },

  findEpisodes: task(function*() {
    let query = {};

    if (this.get('season')) {
      query.filter = {
        season: this.get('season')
      }
    }

    return yield this.get('store').query('episode', query);
  }).restartable()

});
