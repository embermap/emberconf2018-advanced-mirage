import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
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

  page: 1,
  pageCount: readOnly('findEpisodes.lastSuccessful.value.meta.pageCount'),
  itemCount: readOnly('findEpisodes.lastSuccessful.value.meta.itemCount'),

  onFirstPage: computed('page', function() {
    return this.get('page') === 1;
  }),

  onLastPage: computed('page', 'pageCount', function() {
    return this.get('page') === this.get('pageCount');
  }),

  findEpisodes: task(function*() {
    let queries = {
      page: {
        number: this.get('page')
      },
    };

    return yield this.get('store').query('episode', queries);
  }).restartable(),

  actions: {
    previousPage() {
      this.decrementProperty('page');
      this.get('findEpisodes').perform();
    },

    nextPage() {
      this.incrementProperty('page');
      this.get('findEpisodes').perform();
    },
  }
});
