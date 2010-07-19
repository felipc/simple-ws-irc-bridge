
function IRC (ws, client, server, port, nick) {
  this.ws = ws;
  this.client = client;
  this.server = server;
  this.port = port;
  this.nick = nick;
  let self = this;
  function msgRcvd(message) {
    IRC.prototype.messageReceived.call(self, message);
  }
  this.ws.addEventListener("message", msgRcvd, false);
  
  this.ws.addEventListener("open", function() {
    self.ws.send("@@@Connect " + self.server + " " + self.port);
  }, false);
  
}


IRC.prototype = {

  handshake: function() {
    this.client.defaultMsg("starting handshake " + this.nick);
    this.ws.send("USER " + this.nick + "aaa bbb :" + this.nick);
    this.ws.send("NICK " + this.nick);
  },

  messageReceived: function(message) {
    
    if (message.data == "@@@GO") {
      this.client.defaultMsg("GOT a GO");
      IRC.prototype.handshake.call(this);
      return;
    }
    
    this.client.defaultMsg(message.data);
    
    let result = /^(:[^ ]+ )?([^ ]+) (.*)$/.exec(message.data);
    let origin = result[1] || "";
    let command = result[2] || "";
    let data = result[3] || "";

    switch (command) {
      case "PING":
        this.ws.send("PONG " + data);
        break;

      case "PRIVMSG":
        let user = /^:([^!]+)!/.exec(origin)[1] || origin;
        this.client.privMsg(user, data);
        break;
      
      default:
        this.client.defaultMsg(message.data);
        break;
    }
  },
  
  postMessage: function(msg) {
   this.client.defaultMsg(msg);
   this.ws.send(msg);
  }
};
