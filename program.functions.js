'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const prompts = require('./program.prompts.js');
const helpers = require('./program.helpers.js');

exports.newProject = (name) => {  
  // copy the files from template directory
  helpers.copyFiles('/usr/local/lib/node_modules/meteor-maker/files', './tmp')
    // recursively get all the file paths
    .then(() => { return helpers.recurseFiles('./tmp') })    
    .then((files) => {      
      // get user project preferences
      inquirer.prompt(prompts.newProjectPrompts).then((answers) => {
        // process files with Handlebars
        helpers.processTemplateFiles(files, answers);
        // transfer files from tmp to root        
        helpers.copyFiles('./tmp', './').then( () => {           
          if (!answers.sassStructure) { 
            let files = ['./client/_mixins.scss', './client/_variables.scss', './client/main.scss']
            helpers.deleteFiles(files);
          }
          // install Foundation if requested          
          if (answers.foundation) {
            console.log('Installing Foundation for Sites...'); 
            helpers.meteorInstall('zurb:foundation-sites');
          }
          // delete temp folder
          helpers.deleteFolder('tmp'); 
          // rename app          
          helpers.appRename(name);
        });
      })
    })
}

exports.newAPI = (name) => {
  
  const templatePath = '/usr/local/lib/node_modules/meteor-maker/files/imports/api/newAPI';
  const destPath = 'imports/api/' + name;
  const registerAPI = "\nimport '../../api/" + name + "/methods.js';";
  const newNames = ['imports/api/' + name + '/' + name + '.tests.js', 'imports/api/' + name + '/' + name + '.js', 'imports/api/' + name + '/' + name + '.methods.js'];

  helpers.createDir(name, './imports/api').then( (res) => {
    helpers.copyFiles(templatePath, res)
      .then((res) => {
        helpers.recurseFiles(destPath).then((files) => {
          helpers.processTemplateFiles(files, {apiName: name}, newNames);
          helpers.registerAPI(name, './imports/startup/server/register-api.js', registerAPI);
          console.log( name + ' API methods created at imports/api/' + name + '.methods.js' );
          console.log( name + ' API method tests created at imports/api/' + name + '.tests.js' );
          console.log( name + ' API collection created at imports/api/' + name + '.js' );
          console.log( name + 'API registered with imports/startup/server/register-api.js' );
        })        
      })
  })
}

exports.newMethod = (name) => {

  const templatePath = '/usr/local/lib/node_modules/meteor-maker/template.method.js';
  const destPath = 'imports/api';
  helpers.listDir(destPath).then((res) => {
    prompts.newMethodPrompts[0].choices = res;
    inquirer.prompt(prompts.newMethodPrompts).then((answers) => {
      const methodPath = `imports/api/${answers.selectAPI}/${answers.selectAPI}.methods.js`;
      fs.readFile(templatePath, (err, data) => {
        const methodData = data.toString('utf8'); 
        const files = [methodPath];
        helpers.registerMethod(methodPath, methodData);
        helpers.processTemplateFiles(files, {apiName: answers.selectAPI});
        console.log('New method added to ' + methodPath);
      });
    })
  })
}