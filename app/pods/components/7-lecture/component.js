import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import createMirageServer from './exercise/server';
// import createMirageServer from './solution/server';

export default Component.extend({

  db: computed('server', function() {
    let server = this.get('server');
    return server ? server.db.dump() : {};
  }),

  pollServer: task(function*() {
    while (true) {
      yield timeout(1000);
      this.notifyPropertyChange('db');
    }
  }).drop(),

  didInsertElement() {
    this._super(...arguments);

    this.set('server', createMirageServer());
    window.server = this.get('server');
    window.schema = server.schema;

    this.get('pollServer').perform();
  },

  willDestroyElement() {
    this._super(...arguments);

    window.server = null;
    window.schema = null;
    this.get('server').shutdown();
  },

});
