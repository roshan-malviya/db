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
        console.log(store)
        if(data_[0].toLowerCase()=='set'){
            let aaa =SET(data_)
            console.log(store)
            Sock.write(aaa)
        }
        else if (data_[0].toLowerCase()=='get'){
            let aaa1 = GET(data_)
            console.log(typeof(aaa1))
            Sock.write(aaa1)
        }        else if (data_[0].toLowerCase()=='expires'){
            let aaa1 = EXPIRES(data_)
            Sock.write(aaa1)
        }        else if (data_[0].toLowerCase()=='save'){
            let aaa1 = SAVE(data_)
            Sock.write(aaa1)
        }else if(data_[0].toLowerCase()=='lpush'){
            const res2 = LPUSH(data_)
            Sock.write(res2)
        }else if(data_[0].toLowerCase()=='rpush'){
            const res2 = RPUSH(data_)
            Sock.write(res2)
        }else{
            if (data_[0]==''){
                Sock.write('\n')
            }else(
                Sock.write('wrong input\n'.red)
            )
        }
    })





}).listen(PORT,HOST)

console.log(`server is listening on port ${PORT} `)
