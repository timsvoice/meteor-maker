'use strict';

const fs = require('fs');
const ncp = require('ncp').ncp;
const Handlebars = require('handlebars');
const exec = require('child_process').exec;
const recursive = require('recursive-readdir');
const inquirer = require('inquirer');
const prompts = require('./program.prompts.js');

exports.copyFiles = (source, dest) => {
  return new Promise( (fulfill, reject) => {
    ncp(source, dest, (err) => {      
      if (err) reject(err);
      fulfill('files copied');
    })
  })  
}

exports.recurseFiles = (path) => {  
  return new Promise( (fulfill, reject) => {
    recursive(path, (err, files) => {
      if (err) reject(err);                  
      fulfill(files);
    })
  })  
}

exports.deleteFolder = function(folderName) {  
  const command = 'rm -rf ' + folderName;
  return new Promise((fulfill, reject) => {
    exec(command, (err, stdout, stderr) => {
     if (err) reject(err);
     fulfill(folderName + ' deleted!');
    })
  })
};

exports.deleteFiles = (files) => {
  return new Promise((fulfill, reject) => {
    files.forEach((filePath) => {
      fs.unlink(filePath, (err, res) => {
        if (err) reject(err);
        fulfill('res');
      })
    })
  })
}

exports.processTemplateFiles = (files, variables) => {  
  return new Promise( (fulfill, reject) => {
    files.forEach((filePath) => {
      let file = fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        if (data) {
          let source = data.toString('utf8');    
          let template = Handlebars.compile(source);    
          let result = template(variables);      
          // write the new file with the result from the handlebars template
          fs.writeFile(filePath, result);
          fulfill(result);
        }   
      });  
    })
  }) 
}

exports.npmInstall = (nodePackage) => {
  let command = 'npm install ' + nodePackage + ' --save';  
  return new Promise( (fulfill, reject) => {
    exec(command, (err, stdout, stderr ) => {
      if (err) reject(err);      
      fulfill(stdout);
    });
  })
}

exports.meteorInstall = (meteorPackage) => {
  let command = 'meteor add ' + meteorPackage;  
  return new Promise( (fulfill, reject) => {
    exec(command, (err, stdout, stderr ) => {
      if (err) reject(err);      
      fulfill(stdout);
    });
  })
}

exports.npmStart = () => {
  let command = 'npm run start';  
  return new Promise( (fulfill, reject) => {
    exec(command, (err, stdout, stderr ) => {
      if (err) reject(err);      
      fulfill(stdout);
    });
  })
}

exports.appRename = (newName) => {
  return new Promise((fulfill, reject) => {
    fs.readFile('./package.json', (err, data) => {
      if (err) reject(err);
      let content = JSON.parse(data.toString('utf8'));
      content.name = newName;    
      fs.writeFile('./package.json', JSON.stringify(content), (err) => {
        if (err) reject(err);
        fulfill('package.json modified');
      });    
    })
  })
}