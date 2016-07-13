(function() {

  // TODO: Obtain this from the container somehow?
  var actor = {
    name: "Ben Burton",
    mbox: 'mailto:ben@corespring.org'
  };


  /**
   * Initialize the xAPI SCORM cloud endpoint (sandbox). Note that this should be injected
   * somehow.
   */
  function init() {
    ADL.XAPIWrapper.changeConfig({
      // Get this auth from the container?
      "endpoint" : "https://cloud.scorm.com/tc/7RCTBEES1P/sandbox/",
      "auth" : "Basic " + toBase64('Uf1IhNsqBAaLLDNhea4:MIQzxembvsbIw5SJv1g'),
    }); 
  }

  /**
   * Helper function for building an ADL.XAPI activity.
   */
  function activity(id, title) {
    // 'id' is probably some combination of the item id (if that exists for PIE), as well
    // as the specific interaction id
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

  /**
   * Helper function for building an ADL.XAPIStatement.
   */
  function statement(opts) {
    return new ADL.XAPIStatement(actor, opts.verb, activity(opts.id, opts.title));
  }

  /**
   * Helper util that sends events for start/pass/fail to xAPI.
   */
  var EventRecorder = {
    start: function(session) {
      var response = ADL.XAPIWrapper.sendStatement(statement({
        id: session.id,
        verb: ADL.verbs.launched
      }));
      return response;
    },
    pass: function(session) {
      return ADL.XAPIWrapper.sendStatement(statement({
        id: session.id,
        verb: ADL.verbs.passed
      }));
    },
    fail: function(session) {
      return ADL.XAPIWrapper.sendStatement(statement({
        id: session.id,
        verb: ADL.verbs.failed
      }));
    }
  };

  /**
   * Bind event for session started and record the event.
   */
  document.addEventListener('pie-container.sessionStarted', function(event) {
    EventRecorder.start(event.detail);
  });

  /**
   * Bind event for session evaluated and record pass/fail.
   */
  document.addEventListener('pie-container.sessionEvaluated', function(event) {
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
      EventRecorder.fail(event.detail);
    } else if (resultState.passed()) {
      EventRecorder.pass(event.detail);
    }
  });

  init();
  
}());