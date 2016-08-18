import { Session } from 'meteor/session'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.searchBar.onCreated(function searchBarOnCreated() {
  this.inputText = new ReactiveVar('');  
  this.result = new ReactiveVar('');
});

Template.searchBar.helpers({
  inputText() {
    return Session.get('input') || '';
  },
  result() {
    return Session.get('result') || [];
  },
});

Template.searchBar.events({
  'input .search'(event, instance) {
    event.preventDefault();

    const target = event.target;
    const input = target.value;

    Session.set('input', input);
  },
  'submit .search'(event, instance) {
    event.preventDefault();

    // Hold relevant fields
    const target = event.target;
    const cveName = target.text.value;

    // Change text depending on what is entered
    instance.inputText.set(cveName);

    // Clear the search bar
    target.text.value = '';

    // Now call to server to get our CVEs...
    Meteor.call('fetchCVE', cveName, function(error, response) {
      if (error) {
        window.alert(`error: ${error.reason}`);
        console.log(`Error occured on receiving data on server. ${error}`);
      } else {
        Session.set('result', response);
      }
    });
  },
});