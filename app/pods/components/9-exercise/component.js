import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import createMirageServer from './exercise/server';
// import createMirageServer from './solution/server';

export default Component.extend({
  store: service(),

  fetchConferenceData: task(function*() {
    return yield this.get('store').query('day', {
      include: 'activities.speakers'
    });
  }).drop(),

  days: readOnly('fetchConferenceData.lastSuccessful.value'),

  didInsertElement() {
    this._super(...arguments);

    this.set('server', createMirageServer());

    this.get('fetchConferenceData').perform();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('server').shutdown();
  },

});
