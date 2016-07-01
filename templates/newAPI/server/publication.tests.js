import { Meteor } from 'meteor/meteor';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import './{{apiName}}.publications.js';

import { {{capitalize apiName}} } from '../{{apiName}}.js';

describe('{{capitalize apiName}} Publication', function () {
  let {{singular apiName}}Data;

  beforeEach(function() {
    // Create Product Record
    Factory.define('{{apiName}}', {{capitalize apiName}}, {
      name: faker.lorem.words(3),
    });

    Factory.create('{{apiName}}');
  })

  it('Should return an {{capitalize apiName}} publication with at least one record', function() {
    const collector = new PublicationCollector();

    collector.collect('{{apiName}}.public', (collection) => {
      assert.isAbove(collection.{{capitalize apiName}}.length, 1);
    })
  })
})
