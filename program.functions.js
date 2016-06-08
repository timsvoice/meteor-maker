'use strict';

const fs = require('fs');
const ncp = require('ncp').ncp;
const Handlebars = require('handlebars');
const exec = require('child_process').exec;
const recursive = require('recursive-readdir');
const inquirer = require('inquirer');
const prompts = require('./program.prompts.js');

const copyFiles = (source, dest) => {
  return new Promise( (fulfill, reject) => {
    ncp(source, dest, (err) => {      
      if (err) reject(err);
      fulfill('files copied');
    })
  })  
}

const recurseFiles = (path) => {  
  return new Promise( (fulfill, reject) => {
    recursive(path, (err, files) => {
      if (err) reject(err);                  
      fulfill(files);
    })
  })  
}

const deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const processTemplateFiles = (files, variables) => {  
  files.forEach((filePath) => {
    let file = fs.readFile(filePath, (err, data) => {
      if (err) console.log(err);
      if (data) {
        let source = data.toString('utf8');    
        let template = Handlebars.compile(source);    
        let result = template(variables);      
        // write the new file with the result from the handlebars template
        fs.writeFile(filePath, result); 
      }   
    });  
  }) 
}

const npmInstall = (nodePackage) => {
  let command = 'npm install ' + nodePackage + ' --save';
  console.log(command);
  exec(command, (err, stdout, stderr ) => {
    console.log(stdout);
  });
}

const appRename = (newName) => {
  fs.readFile('./package.json', (err, data) => {
    if (err) throw err;
    let content = JSON.parse(data.toString('utf8'));
    content.name = newName;    
    fs.writeFile('./package.json', JSON.stringify(content), (err) => {
      if (err) throw err;
    });    
  })
}

exports.newProject = (name) => {
  // copy the files from template directory
  copyFiles('/usr/local/lib/node_modules/meteor-maker/files', './tmp')
    // recursively get all the file paths
    .then(() => { return recurseFiles('./tmp') })    
    .then((files) => {
      // get user project preferences
      inquirer.prompt(prompts.newProjectPrompts).then((answers) => {
        // process files with Handlebars
        processTemplateFiles(files, answers);        
        // install Foundation if requested
        if (answers.foundation) npmInstall('foundation-sites');
        // transfer files from tmp to root
        copyFiles('./tmp', './').then( () => { 
          // delete temp folder
          deleteFolderRecursive('./tmp'); 
          // rename app
          appRename(name); 
        });
      })
    })
}