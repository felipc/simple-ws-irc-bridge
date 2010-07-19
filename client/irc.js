
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
    this.ws.send("NICK " + this.nick);
    this.ws.send("USER " + this.nick + "aaa bbb :" + this.nick);
  },

  messageReceived: function(message) {

    if (message.data == "@@@GO") {
      this.client.defaultMsg("GOT a GO");
      let self = this;
      setTimeout(function() {
        IRC.prototype.handshake.call(self);
      }, 2000);
      return;
    }

    let msg = message.data.replace(/[\r\n]/g, "");
    this.client.defaultMsg(msg);

    let result = /^(:[^ ]+ )?([^ ]+) (.*)$/.exec(msg);

    let origin, command, data;

    try {
      origin = result[1] || "";
      command = result[2] || "";
      data = result[3] || "";
    } catch (e) { }

    
    switch (command) {
      case "PING":
        this.client.defaultMsg("Ponging " + data);
        this.ws.send("PONG " + data);
        break;

      case "PRIVMSG":
        let user = /^:([^!]+)!/.exec(origin)[1] || origin;
        this.client.privMsg(user, data, this.nick);
        break;
      
      default:
        this.client.defaultMsg(msg);
        break;
    }
  },
  
  postMessage: function(msg, currentView) {
   if (msg.substring(0, 1) == "/") {
     let result = /^\/([^ ]+) ?(.*)$/.exec(msg);
     let command, data;

     try {
       command = result[1];
       data = result[2];
     } catch (e) { }

     switch (command) {
       case "join":
       case "query":
         this.client.getViewFor(data);
         if (command == "join")
           this.ws.send("JOIN " + data);
         break;
      
        default:
          this.client.defaultMsg("cant parse " + msg);
          break;
      }
   } else {
     if (currentView != "@@@console") {
       this.ws.send("PRIVMSG " + currentView + " :" + msg);
       this.client.privMsg(this.nick,
                           currentView + " :" + msg,
                           this.nick);
     } else {
       this.ws.send(msg);
       this.client.defaultMsg("@@@console: " + msg);
     }
   }
  }
};
