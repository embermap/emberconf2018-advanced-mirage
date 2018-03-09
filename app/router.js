import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('1-exercise');
  this.route('2-exercise');
  this.route('3-exercise');
  this.route('4-lecture');
  this.route('5-exercise');
  this.route('exercise-final');
});

export default Router;
