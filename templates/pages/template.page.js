import './{{uiName}}.html'

import { Meteor } from 'meteor/meteor'

Template.{{capitalize uiName}}.helpers({
  method() {
    return 'hello'
  }
})