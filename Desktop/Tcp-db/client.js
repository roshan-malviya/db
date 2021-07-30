// const input = require('prompt-sync')
const net = require('net')
const option = {
    port :8080
}

const client = net.createConnection(option,()=>{
    console.log(`Connected port: ${client.remotePort}`)

    client.write('set roshan 20')
    setTimeout(() => {
        client.write('get roshan')
    }, 3000)
    setTimeout(() => {
        client.write('save')
    }, 3000)
})
client.on('data',data=>{
    console.log(data.toString())
})
