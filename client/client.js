function Client(doc, input, console) {
  this.doc = doc;
  this.input = input;
  
  this.views = {
    "@@@console": console
  };
  
  this.currentView = "@@@console";
  
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
    let output = this.getViewFor("@@@console");
    output.insertBefore(box, output.firstChild);
  },
  
  getViewFor: function(name) {
    if (name in this.views)
      return this.views[name];

    let newView = this.doc.createElement("div");
    newView.className = "output";
    newView.style.display = "none";
    
    this.views[name] = newView;
    
    this.doc.body.appendChild(newView);
    
    let newButton = this.doc.createElement("button");
    newButton.appendChild(this.doc.createTextNode(name));
    let self = this;
    newButton.addEventListener("click", function() {
      self.switchView(name);
    }, false);
    
    this.doc.getElementById("channelSelector").appendChild(newButton);
    
    return newView;
  },
  
  switchView: function(name) {
    if (this.currentView == name)
      return;
    
    let view = this.getViewFor(name);
    let curView = this.getViewFor(this.currentView);
    curView.style.display = "none";
    view.style.display = "";
    
    this.currentView = name;
  }
}
