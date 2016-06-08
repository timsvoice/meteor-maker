'use strict';

const expect = require('chai').expect;
const helpers = require('../program.helpers.js');

describe("New Project", () => {
  
  it('should copy an array of files ', function() {
    const file = './index.js';
    const dest = './tmp';
    return helpers.copyFiles(file, dest).then((res) => {
      expect(res).to.equal('files copied');
    });    
  });

  it('should recursively list files in a given dir', function() {
    const files = './files';
    const filesLength = 11;

    return helpers.recurseFiles(files).then((files) => {
      expect(files.length).to.equal(filesLength);
    })
  });

  it('should delete a folder', function() {
    return helpers.deleteFolder('tmp').then((res) => {      
      expect(res).to.equal('tmp deleted!');
    });    
  });

  it('should parse an array of template file using handlebars and return the res', function() {
    const files = ['./test/files/template.js'];
    const variables = { engine: 'handlebars' };
    return helpers.processTemplateFiles(files, variables).then((res) => {
      expect(res).to.equal("'this is to test handlebars parsing'");
    })
  });

  // TODO NPM install function test

  it('should edit the name field of a package.json file', function() {
    const newName = 'testapp';
    return helpers.appRename(newName).then((res) => {
      expect(res).to.equal('package.json modified');
    })
  });


})