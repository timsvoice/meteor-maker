import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const {{capitalize apiName}} = new Mongo.Collection('{{capitalize apiName}}');

// Deny all client-side updates since we will be using methods to manage this collection
{{capitalize apiName}}.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

{{capitalize apiName}}.schema = new SimpleSchema({
  'name': {
    type: String,
    unique: true    
  },
})