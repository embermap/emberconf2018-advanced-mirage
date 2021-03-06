import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  serialize(episodes, request) {
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);

    // Add metadata, sort parts of the response, etc.
    json.meta = {
      generatedAt: new Date()
    }

    return json;
  }
});
