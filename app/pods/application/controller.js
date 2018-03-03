import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  queryParams: [ 'exercise' ],

  activeComponentName: computed('exercise', function() {
    let i = this.get('exercise');

    if (this.get('exercise')) {
      return `exercise-${i}`;
    }
  })

});
