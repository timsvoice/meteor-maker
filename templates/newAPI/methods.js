import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Sample Method Structure

{{#if crudMethods}}

export const create{{capitalize apiName}} = new ValidatedMethod({
  name: '{{apiName}}.new',
  validate: null,
  run( name ) {
    let {{lowercase apiName}}_id = {{apiName}}.insert({ name }, (err, id) => {
      return id;
    });
    return {{lowercase apiName}}_id;
  },
});

export const update{{capitalize apiName}} = new ValidatedMethod({
  name: '{{apiName}}.update',
  validate: null,
  run({ id, key, value }) {
    let operator = {};
    operator[key] = value;
    
    Meteor.users.update({_id: id}, { $set: operator });
  }
});

export const remove{{capitalize apiName}} = new ValidatedMethod({
  name: '{{apiName}}.delete',
  validate: null,
  run( id ) {
    Meteor.users.remove({ _id: id });
  }
});

{{else}}

export const {{apiName}}Method = new ValidatedMethod({
  name: '{{apiName}}.method',
  validate: new SimpleSchema({
    /*argument: { type: String },*/
  }).validator(),
  run({ /*arg*/ }) {
    // your code here
  }
});

{{/if}}
