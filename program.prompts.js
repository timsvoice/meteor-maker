'use strict';



exports.newProjectPrompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Project Name',
    default: 'newapp'
  },
  {
    type: 'confirm',
    name: 'flowRouter',
    message: 'Use FlowRouter?',
    default: true
  },
  {
    type: 'confirm',
    name: 'foundation',
    message: 'Use Foundation for Sites?',
    default: true
  }
]