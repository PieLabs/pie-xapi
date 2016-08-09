(function (root) {

  function action(actor, object, detail) {
    var out = new ADL.XAPIStatement(
      new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash(actor.mbox), actor.name),
      new ADL.XAPIStatement.Verb('http://adlnet.gov/expapi/verbs/interacted', 'interacted'),
      object);

    out.context = {
      contextActivities: {
        category: [
          {
            id: 'http://pie.org/libraries/corespring-pie-multiple-choice#v1.0.0',
            objectType: 'Activity'
          }
        ]
      }
    }

    return out;
  }
  
  var mapping = {
    'choice-selected': action,
    'choice-deselected': action,
  };

  pieXapi.addMapping('corespring-pie-multiple-choice', mapping);
})(this);