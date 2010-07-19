function Client(doc, input, output) {
  this.doc = doc;
  this.input = input;
  this.output = output;
}

Client.prototype = {
  privMsg: function(user, msg) {
    let doc = this.doc;
    let out = this.output;

    let box = doc.createElement("div");
    box.className = "box";

    let userbox = doc.createElement("div");
    userbox.className = "user";
    userbox.appendChild(doc.createTextNode(user + ": "));
    
    let msgbox = doc.createElement("div");
    msgbox.className = "privmsg";
    msgbox.appendChild(doc.createTextNode(msg));
    
    box.appendChild(userbox);
    box.appendChild(msgbox);
    
    out.insertBefore(box, out.firstChild);
  },
  
  getMessage: function() {
    return this.input.value;
  },
  
  clearMessage: function() {
    this.input.value = "";
  },
  
  defaultMsg: function(msg) {
    let box = this.doc.createElement("div");
    box.className = "debugBox";
    box.appendChild(this.doc.createTextNode(msg));
    this.output.insertBefore(box, this.output.firstChild);
  }
}
