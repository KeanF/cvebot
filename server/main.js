import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  fetchCVE: function(query) {
    var url = `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${query}`;
    console.log(url);
    //synchronous GET
    var result = Meteor.http.get(url, {timeout:30000});
    console.log(`Status code: ${result.statusCode}`);


    if (result.statusCode == 200) {
      return result;
    } else {
      console.log(`Response issue: ${result.statusCode}`);
      throw new Meteor.Error(result.statusCode);
    }
  },
});