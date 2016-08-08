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

    this.setActor = function(name, email){
      actor = {
        name: name, 
        mbox: 'mailto:' + email
      }
    };

    this.setConfig = function(endpoint, authKey){
      ADL.XAPIWrapper.changeConfig({
        endpoint: endpoint, 
        auth: "Basic " + toBase64(authKey)
      });
    };
    var mappings = {};

    this.addMapping = function(key, m){
      mappings = mappings || {};
      if(mappings[key]){
        throw new Error('Mappings for key: ' + key + ' already exists');
      }
      if(!m){
        throw new Error('definition is undefined, key: ' + key);
      }
      mappings[key] = m;
    };

    function getKeyAndType(detail){
      detail = detail || {type: '?'};
      if(detail.type.indexOf(':') === -1){
        return {type: detail.type, key: detail.type};
      } else {
        var split = detail.type.split(':');
        return {key: split[0], type: split[1]};
      }
    }

    doc.addEventListener('pie', function(event){
      console.log('pie event: ', event.detail);
      var keyAndType  = getKeyAndType(event.detail);
      if(mappings[keyAndType.key] && mappings[keyAndType.key][keyAndType.type]){
        var fn = mappings[keyAndType.key][keyAndType.type];
        var object = {
          id: 'http://serve-pie-demo.org/demo',
          objectType: 'Activity',
          definitions: {
            name: {
              'en-US' : 'Just a demo - will be set elsewhere'
            }
          }
        }
        var statement = fn(actor, object, event.detail);
        var response = ADL.XAPIWrapper.sendStatement(statement);
      }
    });
  }

  window.pie = window.pie || {};
  window.pie.xapi = new PieXapi(document);

} ());