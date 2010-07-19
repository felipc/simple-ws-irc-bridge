function IRC (ws) {
  this.ws = ws;
}

IRC.prototype = {
  _connecting: false;
  connect: function(nick) {
    this._connecting = true;
    this.ws.send(
  },
  
  messageReceived: function(message) {
    if (this._connecting) {
      
    } else {
      
    }
  }
};