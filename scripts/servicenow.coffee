servicenow = require('servicenow')
config =
  instance: 'https://demo.servicenow.com'
  username: 'anthony'
  password: 'mypassword'

client = new (servicenow.Client)(config)
  
module.exports = (robot) ->
  robot.hear /list incidents/i, (res) ->
    client.getRecords "incident", "Active=True", (error, result) ->
      res.reply result.id
