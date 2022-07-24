
const EventEmitter = require('events');
//Evennt Varaible created
const server = http.createServer();
//Creating the instance of the Event 
const customEmitter = new EventEmitter();
//methods on this object
//on -listen for specific event
//emit - emit an event 
//order matters that is
//we first listen to event then only we emit an event
//it dosn't make sense to listen to an event that has already been emitted
customEmitter.on('response', (name,id)=> {
    console.log(`Data recieved from user ${name} hvaing the id ${id}`);
})
//Making the point that wwe can have as many functions aw we want to listen for an event 
customEmitter.on('response', ()=> {
    console.log(`Some other logic`);
})
//** The point is the order matters it makes no sense to listen for an event that has already been emmited
//We can pass any arguments during emiting the event
customEmitter.emit('response','jhon',32);

//Evnets are the core buliding blocks of node 