import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Server from 'ember-cli-mirage/server';
import { Model, JSONAPISerializer } from 'ember-cli-mirage';
import episodes from './_episodes';
import baseConfig from './mirage-config';
import { task } from 'ember-concurrency';
import { set } from '@ember/object';
import { computed } from '@ember/object';

export default Component.extend({

  store: service(),

  didInsertElement() {
    this._super(...arguments);

    this.set('server', this.createServer());
    this.get('findEpisodes').perform();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('server').shutdown();
  },

  createServer() {
    return new Server({
      serializers: {
        application: JSONAPISerializer.extend({
          serialize(object) {
            let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);
            if (object.meta) {
              json.meta = object.meta;
            }
            return json;
          }
        })
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
    search(property) {
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
