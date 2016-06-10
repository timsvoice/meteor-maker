#!/usr/bin/env node
'use strict';

const program = require('commander');
const functions = require('./program.functions.js');


program
  .version('0.0.1')
  .command('project <name>')
  .description('Scaffold a new Meteor project')
  .action(functions.newProject);

program
  .command('g:method <name>')
  .description('Create a new method')
  .action(functions.newMethod);

program
  .command('g:api <name>')
  .description('Create a new API with methods and tests')
  .option('-T, --no-tests', 'don\'t include a test file')
  .action(functions.newAPI);

program
  .command('g:ui <type>')
  .description('Create a new UI element')
  .option('--no-sass', 'don\'t generate the SASS file for this component')
  .action(functions.newUI);

program.parse(process.argv);