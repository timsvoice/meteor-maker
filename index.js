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
  .command('method <name>')
  .description('Create a new method')
  .action(functions.newMethod);

program
  .command('api <name>')
  .description('Create a new API with methods and tests')
  .option('-T, --no-tests', 'don\'t include a test file')
  .action(functions.newApi);

program
  .command('component <name>')
  .description('Create a new UI component')
  .option('-js, --no-js', 'don\'t generate the JS file for this component')
  .option('-html, --no-html', 'don\'t generate the HTML file for this component')
  .option('-sass, --no-sass', 'don\'t generate the SASS file for this component')
  .action(functions.newComponent);

program
  .command('page <name>')
  .description('Create a new page')
  .option('-js, --no-js', 'don\'t generate the JS file for this page')
  .option('-html, --no-html', 'don\'t generate the HTML file for this page')
  .option('-sass, --no-sass', 'don\'t generate the SASS file for this page')
  .action(functions.newPage);

program
  .command('layout <name>')
  .description('Create a new layout')
  .option('-js, --no-js', 'don\'t generate the JS file for this layout')
  .option('-html, --no-html', 'don\'t generate the HTML file for this layout')
  .option('-sass, --no-sass', 'don\'t generate the SASS file for this layout')
  .action(functions.newLayout);



program.parse(process.argv);