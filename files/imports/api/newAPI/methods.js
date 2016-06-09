import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Sample Method Structure

export const {{apiName}}Method = new ValidatedMethod({
  name: '{{apiName}}.method',
  validate: null,
  run({ arg }) {
    // your code here
  }
});