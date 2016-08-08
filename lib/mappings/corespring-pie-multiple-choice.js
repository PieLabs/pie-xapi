(function (root) {

  function action(actor, object, detail) {

    object.context = {
      contextActivities: {
        category: [
          {
            id: 'http://pie.org/libraries/corespring-pie-multiple-choice#v1.0.0',
            objectType: 'Activity'
          }
        ]
      }
    }
    
    return new ADL.XAPIStatement(
      new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash(actor.mbox), actor.name),
      new ADL.XAPIStatement.Verb('http://adlnet.gov/expapi/verbs/interacted', 'interacted'),
      object);
  }
  
  var mapping = {
    'choice-selected': action,
    'choice-deselected': action,
  };

  pie.xapi.addMapping('corespring-pie-multiple-choice', mapping);
})(this);