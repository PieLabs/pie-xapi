(function (root) {

  function action(actor, object, detail) {
    var out = new ADL.XAPIStatement(
      new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash(actor.mbox), actor.name),
      new ADL.XAPIStatement.Verb('http://adlnet.gov/expapi/verbs/attempted', 'attempted'),
      object);
    return out;
  }
  
  var mapping = {
    'rendered': action,
  };

  pieXapi.addMapping('container', mapping);
})(this);