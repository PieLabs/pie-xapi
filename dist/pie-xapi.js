(function () {

  function PieXapi(doc) {
    var actor = null;

    function activity(id, title) {
      return {
        id: 'http://corespring.org/' + id,
        definition: {
          type: 'http://adlnet.gov/expapi/activities/interaction',
          name: {
            'en-US': title
          }
        }
      };
    };

    function statement(verb) {
      return new ADL.XAPIStatement(actor, verb, activity('578644e5c3f99897cad5c44b', 'My CoreSpring Item'));
    }

    this.setActor = function (a) {
      actor = a || {};
      actor.mbox = 'mailto:' + actor.email;
      actor.name = actor.user;
    };

    this.setConfig = function (config) {
      ADL.XAPIWrapper.changeConfig(config);
    };

    var object = {};
    this.setObject = function(uri, name){
      object.id = uri;
      object.objectType = 'Activity';
      object.definition = {
        name : {
          'en-US': name
        }
      }
    };

    var mappings = {};

    this.addMapping = function (key, m) {
      mappings = mappings || {};
      if (mappings[key]) {
        throw new Error('Mappings for key: ' + key + ' already exists');
      }
      if (!m) {
        throw new Error('definition is undefined, key: ' + key);
      }
      mappings[key] = m;
    };

    function getKeyAndType(detail) {
      detail = detail || { type: '?' };
      if (detail.type.indexOf(':') === -1) {
        return { type: detail.type, key: detail.type };
      } else {
        var split = detail.type.split(':');
        return { key: split[0], type: split[1] };
      }
    }

    doc.addEventListener('pie', function (event) {
      console.log('pie event: ', event.detail);
      var keyAndType = getKeyAndType(event.detail);
      if (mappings[keyAndType.key] && mappings[keyAndType.key][keyAndType.type]) {
        var fn = mappings[keyAndType.key][keyAndType.type];
        var statement = fn(actor, object, event.detail);
        var response = ADL.XAPIWrapper.sendStatement(statement);
      }
    });
  }

  window.pieXapi = new PieXapi(document);
  window.pie = window.pie || {};
  window.pie.xapi = window.pieXapi;

} ());;(function (root) {

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
})(this);;(function (root) {

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