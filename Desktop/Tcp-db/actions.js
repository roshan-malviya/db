const fs = require('fs')
const color = require('colors')



const SET = (data) => {
    switch (data.length) {
        case 3:
            store[data[1]] = data[2]
            return ("OK\n".green)

        default:
            return (`set takes two inputs as arguments but get ${data.length - 1}\n`.yellow)
    }
}


const GET = (data) => {


    switch (data.length) {
        case 2:
            if(Array.isArray(store[data[1]])){
                return('Wrong type opration\n'.yellow)
            }

            if (store[data[1]] == undefined) {
                return ("key dosen't exist\n".yellow)
            } else {
                return (`${store[data[1]]}\n`.green)
            }

        default:
            return (`get takes one inputs as arguments but get ${data.length - 1}\n`.green)

    }


}



const EXPIRES = (data) => {

    if (data.length == 3) {
        if (!isNaN(data[2])) {
            console.log(data[1])
            if (store[data[1]] != undefined) {
                setTimeout(function () {
                    delete store[data[1]]
                }, 1000 * data[2])
                return ("OK\n".green)
            } else {
                return (`Key dosen't exist\n`.red)
            }
        } else {
            return ('second argument should be a number\n'.green)
        }
    } else {
        return (`expire takes 2 inputs given ${data.length - 1}\n`.red)
    }
}

const SAVE = (data) => {

    if (Object.keys(store).length === 0) {
        return ('DB is empty'.blue)
    } else {
        const jsonData = JSON.stringify(store)
        fs.writeFileSync('/tmp/data.json', jsonData)
        console.log("saved")
        return ("OK\n".green)
    }
}


const LPUSH =(data)=>{

    if ((store[data[1]]==undefined || store[data[1]]) &&  ! Array.isArray(store[data[1]])){
        let arr = [data[2]]
       store[data[1]]=arr;
       
    }else if (Array.isArray(store[data[1]])){
        let arr1 = store[data[1]]
        arr1.push(data[2])
    }
   return("OK\n".green)
}


const RPUSH =(data)=>{

    if ((store[data[1]]==undefined || store[data[1]]) &&  ! Array.isArray(store[data[1]])){
        let arr = [data[2]]
       store[data[1]]=arr;
       
    }else if (Array.isArray(store[data[1]])){
        let arr1 = store[data[1]]
        arr1.unshift(data[2])
    }
   return("OK\n".green)
}








module.exports = { SET, GET, EXPIRES, SAVE, LPUSH, RPUSH };



