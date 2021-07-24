const { Socket } = require("dgram");
const colors = require('colors')
const net = require("net")
const HOST = '127.0.0.1'
const PORT = 8080;
const server = net.createServer((Sock)=>{
    let store1 ={}
    console.log(`connected : ${Sock.remoteAddress} : ${Sock.remotePort}`)
    Sock.setEncoding('utf-8')
    Sock.on('data',(data)=>{
        
        console.log(`data ${Sock.remoteAddress} ${data}`)        
        let  data_ = data.trim().split(' ')
        data_=data_.map((d)=>d.trim().toLowerCase())
        if (data_[0]=='set'&& data_.length==3){
            store1[data_[1]]=data_[2]
            Sock.write('OK\n'.green)
        }else if (data_.length==2){
            if(data_[0]=='get'){
            if (store1[data_[1]]!=undefined){
                Sock.write(`${store1[data_[1]]}\n`)
            }
            else{
                Sock.write("no data available\n".yellow)
            }
            }else if (data_[0]=='del'){
                delete store1[data_[1]]
                Sock.write('deleted\n'.yellow)
            }
            else{
                Sock.write("Wrong command\n".yellow)
            }
        }else if (data_.length==1){
            if(data_[0]=='flushall'){
            store1={}
            Sock.write("DELETED ALL DATA\n".yellow)
            }else if (data_[0]=="quit"){
                Sock.end("Good bye\n".rainbow)
            }
        }
        else{
            console.log("Error is here " )
            Sock.write("Wrong input\n".red)
        }
    })
}).listen(PORT,HOST)

console.log(`server is listening on port ${PORT} `)
