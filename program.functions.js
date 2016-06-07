'use strict';

const fs = require('fs');
const ncp = require('ncp').ncp;
const Handlebars = require('handlebars');
const exec = require('child_process').exec;
const recursive = require('recursive-readdir');

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

const processTemplate = (path, variables) => {
  let pathString = path;  
  let file = fs.readFile(pathString, (err, data) => {
    if (data) {
      let source = data.toString('utf8');    
      let template = Handlebars.compile(source);    
      let result = template(variables);      
      // write the new file with the result from the handlebars template
      fs.writeFile(path, result); 
    }   
  });  
}

const npmInstall = (nodePackage) => {
  let command = 'npm install ' + nodePackage + ' --save';
  exec(command, (err, stdout, stderr ) => {
    console.log(stdout);
  });
}

exports.newProject = (name) => {
  // copy the files and get the resulting filepaths
  copyFiles('/usr/local/lib/node_modules/meteor-maker/files', './tmp')
    .then(() => {
      return recurseFiles('./tmp')
    })
    .then((files) => {      
      // process each file using handlebar variables
      files.forEach((fileName) => {
        let path = fileName;
        let variables = { name: name, flowRouter: true };
        processTemplate(path, variables);
      })
      // copy files into root and then delete the tmp folder
      copyFiles('./tmp', './').then(() => { 
        deleteFolderRecursive('./tmp') } 
      );
    })
}