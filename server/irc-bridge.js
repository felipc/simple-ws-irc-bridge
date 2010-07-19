var sys = require("sys"),
    ws = require("./ws");

var count = 0;

ws.createServer(function (websocket) {
  websocket.addListener("connect", function (resource) { 
    // emitted after handshake
    sys.debug("connect: " + resource);
    sys.debug("equality: " + (ws == websocket) ? "true" : "false");
    // server closes connection after 10s, will also get "close" event
    setTimeout(websocket.end, 3 * 1000); 

  }).addListener("data", function (data) { 
    // handle incoming data
    sys.debug(data);
    if (data == "hello")
      // send data to client
      websocket.write("World!!!!");
      
    if (data == "count")
      websocket.write("" + ++count);
      
  }).addListener("close", function () { 
    // emitted when server or client closes connection
    sys.debug("close");
  });
}).listen(8080);

sys.debug("listening on localhost:8080");