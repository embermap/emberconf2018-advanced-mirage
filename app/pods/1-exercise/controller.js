import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({

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
