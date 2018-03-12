import DS from 'ember-data';
import Activity from '../mixins/activity';

export default DS.Model.extend(Activity, {
  title: DS.attr('string'),
  start: DS.attr('string'),
  end: DS.attr('string'),
  location: DS.attr('string')
});
