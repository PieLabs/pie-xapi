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

    doc.addEventListener('pie', function(event){
      console.log('pie event: ', event.detail);
    });
  }

  window.pie = window.pie || {};
  window.pie.xapi = new PieXapi(document);

} ());