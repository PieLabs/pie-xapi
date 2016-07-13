(function() {

  // TODO: Obtain this from the container somehow?
  var actor = {
    name: "Ben Burton",
    mbox: 'mailto:ben@corespring.org'
  };

  function init() {
    ADL.XAPIWrapper.changeConfig({
      // Get this auth from the container somehow?
      "endpoint" : "https://cloud.scorm.com/tc/7RCTBEES1P/sandbox/",
      "auth" : "Basic " + toBase64('Uf1IhNsqBAaLLDNhea4:MIQzxembvsbIw5SJv1g'),
    }); 
  }

  function activity(id, title) {
    var result = {
      id: 'http://corespring.org/' + id,
      definition: {
        type: 'http://adlnet.gov/expapi/activities/interaction'
      }
    };
    if (title) {
      result.definition.name = {
        'en-US' : title
      };
    }
    return result;
  };

  function statement(opts) {
    return new ADL.XAPIStatement(actor, opts.verb, activity(opts.id, opts.title));
  }

  var EventRecorder = {
    start: function(session) {
      var response = ADL.XAPIWrapper.sendStatement(statement({
        id: session.id,
        verb: ADL.verbs.launched
      }));
      return response;
    },
    pass: function(session) {
      var response = ADL.XAPIWrapper.sendStatement(statement({
        id: session.id,
        verb: ADL.verbs.passed
      }));
      console.log('pass response: ', response);
      return response;
    },
    fail: function(session) {
      var response = ADL.XAPIWrapper.sendStatement(statement({
        id: session.id,
        verb: ADL.verbs.failed
      }))
      console.log('fail response: ', response);
      return response;
    }
  };

  document.addEventListener('pie-container.sessionStarted', function(event) {
    console.log('pie-container.sessionStarted', event.detail);
    var session = event.detail;
    EventRecorder.start(session);
  });

  document.addEventListener('pie-container.sessionEvaluated', function(event) {
    console.log('pie-container.sessionEvaluated', event.detail);
    var session = event.detail;

    function process(session) {
      return {
        failed: function() {
          return session.outcome && session.outcome.correctness === 'incorrect';
        },
        passed: function() {
          return session.outcome && session.outcome.correctness === 'correct';
        }
      }
    }

    var resultState = process(event.detail);

    if (resultState.failed()) {
      EventRecorder.fail(session);
    } else if (resultState.passed()) {
      EventRecorder.pass(session);
    }
  });

  init();
  
}());