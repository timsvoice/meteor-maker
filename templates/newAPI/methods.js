import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
{{#if crudMethods}}
import { {{capitalize apiName}} } from './{{apiName}}.js';
{{/if}}
// Sample Method Structure

{{#if crudMethods}}

export const create{{capitalize apiName}} = new ValidatedMethod({
  name: '{{apiName}}.create',
  validate: null,
  run( name ) {
    let {{lowercase apiName}}_id = {{capitalize apiName}}.insert(name, (err, id) => {
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

    {{capitalize apiName}}.update({_id: id}, { $set: operator });
  }
});

export const remove{{capitalize apiName}} = new ValidatedMethod({
  name: '{{apiName}}.delete',
  validate: null,
  run( id ) {
    {{capitalize apiName}}.remove({ _id: id });
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
