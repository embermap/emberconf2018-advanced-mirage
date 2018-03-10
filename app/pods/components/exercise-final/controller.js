import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  store: service(),

  name: '',
  summary: '',
  season: '',
  number: '',
  sort: 'airdate',
  page: 1,
  pageCount: null,

  onFirstPage: computed('page', function() {
    return this.get('page') === 1;
  }),

  onLastPage: computed('page', 'pageCount', function() {
    return this.get('page') === this.get('pageCount');
  }),

  findEpisodes: task(function*() {
    let queries = {};
    [ 'name', 'summary', 'season', 'number' ].forEach((field) => {
      let value = this.get(field);
      if (value) {
        set(queries, `filter[${field}]`, value);
      }
    });
    set(queries, 'page[number]', this.get('page'));
    set(queries, 'sort', this.get('sort'));

    let episodes = yield this.get('store').query('episode', queries);
    this.set('pageCount', episodes.get('meta.pageCount'));
    this.set('itemCount', episodes.get('meta.itemCount'));

    return episodes;
  }).restartable(),

  actions: {
    search() {
      this.set('page', 1);
      this.get('findEpisodes').perform();
    },

    resort() {
      this.set('page', 1);
      let newSort = (this.get('sort') === 'airdate') ? '-airdate' : 'airdate';
      this.set('sort', newSort);
      this.get('findEpisodes').perform();
    },

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
