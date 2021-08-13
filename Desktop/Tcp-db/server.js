const fs = require('fs')
const colors = require('colors')
const net = require("net");
const HOST = '127.0.0.1'
const PORT = 8080;

const SET= require('./actions').SET
const GET= require('./actions').GET
const EXPIRES= require('./actions').EXPIRES
const SAVE= require('./actions').SAVE
const LPUSH= require('./actions').LPUSH
const RPUSH= require('./actions').RPUSH

const LRANGE= require('./actions').LRANGE





const server = net.createServer((Sock)=>{
     fileExistence = fs.existsSync('/tmp/data.json')
    if (fileExistence){
        let kk = fs.readFileSync('/tmp/data.json','utf-8')
        store = JSON.parse(kk)
    }else{
        store = {}
    }

    console.log(`connected : ${Sock.remoteAddress} : ${Sock.remotePort}`)
    Sock.setEncoding('utf-8')
    Sock.on('data',(data)=>{
        
        console.log(`data ${Sock.remoteAddress} ${data}`)        
        let  data_ = data.trim().split(' ')
        data_=data_.map((d)=>d.trim())
        let command = data_[0]

        try {

            switch (command.toLowerCase()){
                case ('set'):
                    let res =  SET(data_)
                    Sock.write(res)
                case ('get'):
                     res =  GET(data_)
                    Sock.write(res)
                case ('expires'):
                     res =  EXPIRES(data_)
                    Sock.write(res)
                case('save'):
                 res =  SAVE(data_)
                Sock.write(res)
                case ('lpush'):
                     res =  LPUSH(data_)
                    Sock.write(res)
                case ('rpush'):
                     res =  RPUSH(data_)
                    Sock.write(res)
                case ('lrange'):
                     res =  SET(data_)
                    Sock.write(res)
                default :
                    throw("NOT A COMMAND \n".red)
            }
            
        } catch (err) {
            Sock.write(err)
        }
    })





}).listen(PORT,HOST)

console.log(`server is listening on port ${PORT} `)
