'use strict';

const fs = require('fs');
const ncp = require('ncp').ncp;
const Handlebars = require('handlebars');
const exec = require('child_process').exec;
const recursive = require('recursive-readdir');
const inquirer = require('inquirer');
const prompts = require('./program.prompts.js');
const _ = require('underscore');

exports.createDir = (name, path) => {
  const destPath = path + '/' + name;
  return new Promise( (fulfill, reject) => {
    fs.mkdir(destPath, (err) => {
      if (err) reject(err);
      fulfill(destPath);
    })
  })
}

exports.listDir = (path) => {
  return new Promise( (fulfill, reject) => {
    fs.readdir(path, (err, items) => {
      if (err) reject(err);
      fulfill(items);
    })
  })  
}

exports.createFile = (name, source, dest) => {
  return new Promise( (fulfill, reject) => {
    fs.readFile(source, (err, data) => {
      if (err) reject(err);
      fs.writeFile(dest, data, (err) => {
        if (err) reject(err);
        fulfill('File write successful!');
      });
    })
  })
}

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

exports.processTemplateFiles = (files, variables, newNames) => {  
  console.log(files);
  return new Promise( (fulfill, reject) => {
    files.forEach((filePath, ind) => {
      let file = fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        if (data) {
          let source = data.toString('utf8');    
          let template = Handlebars.compile(source);    
          let result = template(variables);      
          // write the new file with the result from the handlebars template
          if (newNames) {
            let newPath = newNames[ind];
            fs.writeFile(newPath, result);
            fs.unlink(filePath);
          } else {
            fs.writeFile(filePath, result);
          }          
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

exports.registerAPI = (name, path, data) => {
  return new Promise( (fulfill, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) reject(err);
      fulfill('API Registered!');
    })
  })
}

exports.registerMethod = (path, data) => {
  return new Promise( (fulfill, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) reject(err);      
      fulfill('Method Registered!');
    })
  })
}

Handlebars.registerHelper('capitalize', (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
})

Handlebars.registerHelper('lowercase', (word) => {
  return word.toLowerCase();
})