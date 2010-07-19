function IRC (ws, client) {
  this.ws = ws;
  this.client = client;
  let self = this;
  function msgRcvd(message) {
    IRC.prototype.messageReceived.call(self, message);
  }
  this.ws.addEventListener("message", msgRcvd, false);
}

IRC.prototype = {

  connect: function(nick) {
    this._connecting = true;
    this.ws.send("NICK " + nick);
    this.ws.send("USER " + nick + "aaa bbb :" + nick); 
  },

  messageReceived: function(message) {
    
    if (message == "@@@GO") {
      this.connect("felipetest");
      return;
    }
    
    let result = /^(:[^ ]+ )?([^ ]+) (.*)$/.exec(message);
    let origin = result[1];
    let command = result[2];
    let data = result[3];

    switch (command) {
      case "PING":
        this.ws.send("PONG " + data);
        break;

      case "PRIVMSG":
        let user = /^:([^!]+)!/.exec(origin)[1] || origin;
        this.client.privMsg(user, data);
        break;
    }
  }
};