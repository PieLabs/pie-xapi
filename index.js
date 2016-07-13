(function() {
  var actor = {
    name: "Ben Burton",
    mbox: 'mailto:ben@corespring.org'
  };

  function activity(id, title) {
    return {
      id: 'http://corespring.org/' + id,
      definition: {
        type: 'http://adlnet.gov/expapi/activities/interaction',
        name: {
          'en-US' : title
        }
      }
  };
  };

  function statement(verb) {
    return new ADL.XAPIStatement(actor, verb, activity('578644e5c3f99897cad5c44b', 'My CoreSpring Item'));
  }

  var XAPI = {
    start: function() {
      var response = ADL.XAPIWrapper.sendStatement(statement(ADL.verbs.launched));
      console.log(response);
    },
    pass: function() {

    },
    fail: function() {

    }
  };

  document.addEventListener('pie-container.sessionEvaluated', function(event) {
    console.log('event.detail:', event.detail);
    _.each(event.detail, function(response) {
      console.log(response);
    });
  });

  ADL.XAPIWrapper.changeConfig({
    "endpoint" : "https://cloud.scorm.com/tc/7RCTBEES1P/sandbox/",
    "auth" : "Basic " + toBase64('Uf1IhNsqBAaLLDNhea4:MIQzxembvsbIw5SJv1g'),
  });
  
}());