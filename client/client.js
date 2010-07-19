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

    let user = doc.createElement("div");
    user.className = "user";
    user.appendChild(doc.createTextNode(user));
    
    let msgbox = doc.createElement("div");
    msgbox.className = "msg";
    msgbox.appendChild(doc.createTextNode(msg));
    
    box.appendChild(user);
    box.appendChild(msgbox);
    
    out.insertBefore(out.firstChild, box);
  },
  
  postMessage: function() {
    let input = this.doc.getElementById("input");
  },
  
  defaultMsg: function(msg) {
    let box = this.doc.createElement("div");
    box.className = "debugBox";
    box.appendChild(this.doc.createTextNode(msg));
    this.output.insertBefore(this.output.firstChild, msg);
  }
}
    