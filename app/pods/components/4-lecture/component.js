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
    this.get('findCharacters').perform();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('server').shutdown();
  },

  findEpisodes: task(function*() {
    let query = { filter: {} };

    [ 'name', 'season' ].forEach(prop => {
      if (this.get(prop)) {
        query.filter[prop] = this.get(prop);
      }
    });

    return yield this.get('store').query('episode', query);
  }).restartable(),

  findCharacters: task(function*() {
    let query = { };

    if (this.get('characterName')) {
      query.filter = {
        name: this.get('characterName')
      }
    }

    return yield this.get('store').query('character', query);
  }).restartable()

});
