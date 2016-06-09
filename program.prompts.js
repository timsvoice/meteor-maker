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

exports.newMethodPrompts = [
  {
    type: 'list',
    name: 'selectAPI',
    message: 'Which API does this method belong to?',
    choices: [],    
  }
]