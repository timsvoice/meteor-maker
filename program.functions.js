'use strict';

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