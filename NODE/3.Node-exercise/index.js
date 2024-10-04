const LogEvents = require ('./LogEvent');

// Create an event emitter
const EventEmitter = require ('events');
class myNewEvent extends EventEmitter {
  constructor () {
    super ();
  }

  emitMessage (message) {
    this.emit ('Message from Emitter \t' + message);
  }
}

// Create an instance of a class
const eventInstance = new myNewEvent ();
setTimeout (() => {
  LogEvents ();
  eventInstance.emitMessage ('New event emitted');
}, 2000);

//Listen to emitted message
eventInstance.on ('message', msg => {
  console.log ('New event message \t' + msg);
});
