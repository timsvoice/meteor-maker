{{#if flowRouter}}
import { FlowRouter } from 'meteor/kadira:flow-router';
{{/if}}import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import  '../../ui/pages/home.js';

FlowRouter.route('/', {
  name: 'app.home',
  action() {    
    BlazeLayout.render('Home')
  }
})