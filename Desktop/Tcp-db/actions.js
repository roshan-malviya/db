const fs = require('fs')
const DB = (data)=>{
    

    switch(data[0]){
        case ('set'):{
            switch(data.length){
                case 3:
                    store[data[1]]=data[2]
                    return("OK\n".green)
                    
                default :
                    return (`set takes three inputs as arguments but get ${data.length-1}\n`)
            }
        }
        
        case ('get'):{
            switch(data.length){
                case 2:
                    if (store[data[1]]==undefined){
                        return("key dosen't exist\n".yellow)
                    }else{
                        return(`${store[data[1]]}\n`.green)
                    }
                    
                default:
                    return (`get takes three inputs as arguments but get ${data.length-1}\n`.green)

            }
        }
        case('expire'):{
            if (data.length==3){
                if (!isNaN(data[2])){
                    console.log(data[1])
                    if (store[data[1]]!=undefined){
                        setTimeout(function(){
                            delete store[data[1]]
                        },1000*data[2])
                        return("OK\n".green)
                    } else{
                        return(`Key dosen't exist\n`.red)
                    }                  
                }else{
                    return('second argument should be a number\n'.green)
                }
            }else{
                return(`expire takes 2 inputs given ${data.length-1}/n`.red)
            }
        }
        case('save'):{
            if (Object.keys(store).length === 0){
                return('DB is empty'.blue)
            }else{
                const jsonData = JSON.stringify(store)
                fs.writeFileSync('./data.json',jsonData)
                return("OK\n".green)
            }
        }default:
            return('invalid command\n'.red)


    }

}
module.exports=DB;



