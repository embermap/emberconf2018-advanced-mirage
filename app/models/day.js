import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  activities: DS.hasMany('activity', { polymorphic: true })
});
