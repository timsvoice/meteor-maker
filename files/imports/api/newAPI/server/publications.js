import { Meteor } from 'meteor/meteor';
import { {{capitalize apiName}} } from '../{{apiName}}.js';

Meteor.publish('{{lowercase apiName}}.public', function lists{{capitalize apiName}}() {
  return {{capitalize apiName}}.find();
});