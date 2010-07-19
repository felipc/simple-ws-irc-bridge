var sys = require("sys"),
    ws = require("./ws"),
    net = require("net");

var ircserver = null;
var websocket = null;

ws.createServer(function (server) {
  websocket = server;
  websocket.addListener("connect", function (resource) { 
    // emitted after handshake
    sys.debug("connect: " + resource);

  }).addListener("data", function (data) { 
    sys.debug(data);
    // handle incoming data
    if (/^@@@Connect/.test(data)) {
      var result = /^@@@Connect ([^ ]+) (\d+)$/.exec(data);
      var server = result[1] || "";
      var port = result[2] || "";
      sys.debug("Connecting to " + server + ":" + port);
      connectToIRC(server, port);
      return;
    }
    
    sys.debug("writing data: " + data);
    ircserver.write(data + "\r\n");
    sys.debug("wrote data");
      
  }).addListener("close", function () { 
    // emitted when server or client closes connection
    sys.debug("close");
  });
}).listen(8080);

sys.debug("Websocket listening on localhost:8080");

function connectToIRC(server, port) {
  sys.debug("connecting...");
  ircserver = net.createConnection(port, server);
  ircserver.addListener("connect", function(resource) {
    sys.debug("tcp connected");
    websocket.write("@@@GO"); 
  })
  .addListener("data", function(data) {
    sys.debug("data from tcp: " + data);
    websocket.write(data);
  });
}