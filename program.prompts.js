'use strict';



exports.newProjectPrompts = [
  {
    type: 'confirm',
    name: 'flowRouter',
    message: 'Use FlowRouter?',
    default: true
  },
  {
    type: 'confirm',
    name: 'foundation',
    message: 'Use Foundation Framework?',
    default: true
  },
  {
    type: 'confirm',
    name: 'sassStructure',
    message: 'Setup mixin and variable sass files?',
    default: true
  }
]

exports.newApiPrompts = [
  {
    type: 'confrim',
    name: 'crudMethods',
    message: 'Create CRUD methods for this API?',
    default: true,
  }
]

exports.newMethodPrompts = [
  {
    type: 'list',
    name: 'selectAPI',
    message: 'Which API does this method belong to?',
    choices: [],    
  }
]

exports.newUIPrompts = [
  {
    type: 'input',
    name: 'uiName',
    message: 'What\'s the name of your ui element? (must be cammelCase)',    
  }
]