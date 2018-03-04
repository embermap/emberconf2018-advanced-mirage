import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({

  store: service(),

  name: '',

  findEpisodes: task(function*() {
    let query = {};

    if (this.get('name')) {
      query.filter = {
        name: this.get('name')
      }
    }

    return yield this.get('store').query('episode', query);
  }).restartable(),

  actions: {
    search(property) {
      this.set('page', 1);
      this.get('findEpisodes').perform();
    }
  }

});
