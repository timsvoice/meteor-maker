import { Meteor } from 'meteor/meteor';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import faker from 'faker';
import StubCollections from 'meteor/hwillson:stub-collections';

import { {{capitalize apiName}} } from './{{apiName}}.js';

import './{{apiName}}.methods.js';

describe('{{capitalize apiName}}', function () {
{{#if crudMethods}}
  let {{singular apiName}}Data;

  beforeEach(function() {
    StubCollections.add([{{capitalize apiName}}]);
    StubCollections.stub();
    // Create Product Record
    Factory.define('{{apiName}}', {{capitalize apiName}}, {
      name: 'New {{singular apiName}}',
    });

    Factory.create('{{apiName}}');
  })

  afterEach(function() {
    StubCollections.restore();
  })

  it('Creates a new {{singular apiName}}', function() {
    const {{singular apiName}}Data = { name: 'Newer {{singular apiName}}' }
    Meteor.call('{{apiName}}.create', {{singular apiName}}Data, (err, {{apiName}}Id) => {
      const {{singular apiName}} = {{capitalize apiName}}.findOne({{apiName}}Id);

      assert.equal({{singular apiName}}.name, {{singular apiName}}Data.name);
    })
  });

  it('updates a {{singular apiName}}', function () {
    const newName = 'New Name';
    const {{singular apiName}} = {{capitalize apiName}}.findOne();

    Meteor.call('{{apiName}}.update', { id: {{singular apiName}}._id, key: 'name', value: newName });
    assert.equal({{capitalize apiName}}.findOne({{singular apiName}}._id).name, newName);
  });

  it('deletes an {{singular apiName}}', function() {
    const {{singular apiName}} = {{capitalize apiName}}.findOne();

    Meteor.call('{{apiName}}.delete', {{singular apiName}}._id);
    assert.equal({{capitalize apiName}}.find().count(), 0);
  });
{{/if}}
})
