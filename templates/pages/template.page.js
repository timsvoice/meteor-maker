import './{{uiName}}.html'

import { Meteor } from 'meteor/meteor'

Template.{{capitalize uiName}}.events({
  'click .button'(event) {
    console.log(`${event} fired!`);
  },
})

Template.{{capitalize uiName}}.helpers({
  method() {
    return 'hello'
  }
})

Template.{{capitalize uiName}}.onCreated(function () {
  /*this.subscribe('your.subscription');*/
})