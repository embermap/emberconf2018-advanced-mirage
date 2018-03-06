import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({

  name: '',
  season: '',

  findEpisodes: task(function*() {
    let query = { filter: {} };

    [ 'name', 'season' ].forEach(prop => {
      if (this.get(prop)) {
        query.filter[prop] = this.get(prop);
      }
    });

    return yield this.get('store').query('episode', query);
  }).restartable(),

  actions: {
    search() {
      this.get('findEpisodes').perform();
    }
  }

});
