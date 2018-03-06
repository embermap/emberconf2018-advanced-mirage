import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('exercise-1');
  this.route('exercise-2');
  this.route('exercise-3');
  this.route('exercise-final');
});

export default Router;
