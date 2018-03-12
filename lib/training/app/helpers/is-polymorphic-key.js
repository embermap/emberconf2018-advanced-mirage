import Helper from '@ember/component/helper';

export default Helper.extend({
  compute: function([ key ]) {
    return key && key.id && key.type;
  }
});
