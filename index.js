#!/usr/bin/env node
'use strict';

const program = require('commander');
const functions = require('./program.functions.js');
const VerEx = require('verbal-expressions');

program
  .version('0.0.1')
  .command('project <name>')
  .description('Scaffold a new Meteor project')
  .action((name) => {
    if (typeOf name != 'string') return console.log('Name must be a string');
    return functions.newProject(name)
  });

program
  .command('g:method <name>')
  .description('Create a new method')
  .action((name) => {
    if (typeOf name != 'string') return console.log('Name must be a string');
    return functions.newMethod(name)
  });

program
  .command('g:api <name>')
  .description('Create a new API with methods and tests')
  .option('-T, --no-tests', 'don\'t include a test file')
  .action((name) => {
    if (typeOf name != 'string') return console.log('Name must be a string');
    return functions.newAPI(name)
  });

program
  .command('g:ui <type>')
  .description('Create a new UI element')
  .option('--no-sass', 'don\'t generate the SASS file for this component')
  .action((type, options) => {
    
    const typeCheck = VerEx().find('component').or('layout').or('page');
    
    if (!typeCheck.test(type)) return console.log('UI type not recognized');
    
    return functions.newUI(type, options);
  });

program.parse(process.argv);