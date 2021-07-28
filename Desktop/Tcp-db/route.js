const net = require('net')
const Socket = require('./server')

Socket.on('data',(data)=>{
    console.log("runing in route file ",data)
})