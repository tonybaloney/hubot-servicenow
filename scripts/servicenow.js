config = {
  instance: 'dev123456',
  username: 'admin',
  password: 'Testing123'
};

// Create a object type for servicenow
var GlideRecord = require('servicenow-rest').gliderecord;

var getIncidents = function (res){
  // Create a new GlideRecord (query interface)
    gr = new GlideRecord(config.instance,
                     'incident', // ServiceNow table name
                     config.username,
                     config.password);
    // Add any additional filters
    gr.addEncodedQuery('active=true');
    // Fix the maximum number of records
    gr.setLimit(10);
    
    gr.query().then(function(result){ //returns promise
      if (result){
        var msg = '';
        msg += 'listing '+ gr.limit +' active incidents\n';
        // For each incident, show the incident number (.e.g. INC100101) and the description with the URL
        for(var i =0 ; i < result.length; i++){
          msg += result[i].number + ' ' + result[i].description + ' ' + (result[i].location !== '' ? result[i].location.link : '') + '\n';
        }
        res.send(msg);
      } else {
        res.send('no incidents found');
      }
    });
};


module.exports = function(robot) {
  return robot.hear(/list incidents/i, function(res){
    return getIncidents(res);
  });
};