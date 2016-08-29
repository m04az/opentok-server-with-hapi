// Dependencies
const Hapi = require('hapi');
var OpenTok = require('opentok');

// TODO put your apikey and your apiSecret here
var apiKey = ;
var apiSecret= "";
var sessionId;
var tokenid;


//function to ctreate session and token
function fun(){
  opentok = new OpenTok(apiKey, apiSecret);
  opentok.createSession(function(err, session) {
if (err) return console.log(err);
sessionId = session.sessionId;
tokenid = opentok.generateToken(sessionId);
});

}

//////////////////////
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({

  //TODO put your ip and port here
    host: '0.0.0.0',
    port: process.env.PORT || 8080
});
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    //run the function for every request
fun();
//return json with the date
    var data = {
      apiKey: apiKey,
      //apisecret : apiSecret,
      sessionId: sessionId,
        token: tokenid
    }
    reply(data)
  }
})

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
