import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  season: DS.attr(),
  number: DS.attr(),
  summary: DS.attr(),
  image: DS.attr(),

  airdate: DS.attr(),
  airtime: DS.attr(),
  airstamp: DS.attr(),
  runtime: DS.attr(),
});
