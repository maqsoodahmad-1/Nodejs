
const EventEmitter = require('events');

const server = http.createServer();
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

customEmitter.on('response', ()=> {
    console.log(`Some other logic`);
})

//We can pass any arguments during emiting the event
customEmitter.emit('response','jhon',32);

//Evnets are the core buliding blocks of node 