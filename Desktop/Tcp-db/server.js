const fs = require('fs')
const colors = require('colors')
const net = require("net");
const { fstat } = require("fs");
const HOST = '127.0.0.1'
const PORT = 8080;
const db = require('./actions')
store = {};
const server = net.createServer((Sock)=>{
    let store1 ={}
    console.log(`connected : ${Sock.remoteAddress} : ${Sock.remotePort}`)
    Sock.setEncoding('utf-8')
    Sock.on('data',(data)=>{
        
        console.log(`data ${Sock.remoteAddress} ${data}`)        
        let  data_ = data.trim().split(' ')
        data_=data_.map((d)=>d.trim().toLowerCase())
        const a =db(data_)
        Sock.write(a)
    })
}).listen(PORT,HOST)

console.log(`server is listening on port ${PORT} `)


