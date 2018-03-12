import Server from 'ember-cli-mirage/server';
import { Model, hasMany, belongsTo } from 'ember-cli-mirage';
import scenario from './schema';

export default function() {

  return new Server({
    models: {
      user: Model.extend({
        posts: hasMany('post'),
        videos: hasMany('video')
      }),
      post: Model.extend({
        user: belongsTo('user')
      }),
      video: Model.extend({
      }),
      comment: Model.extend({
        commentable: belongsTo({ polymorphic: true })
      })
    },

    scenarios: {
      default: scenario
    },

    baseConfig() {}
  })

}
