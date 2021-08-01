const functoions = require('../actions')
const color = require('colors')

store = {}


describe('this is for save command only ',()=>{
         store ={}

    test(`should give the error as the db is empty`, () => {
        res = functoions.SAVE(['save'])   

        expect(res).toBe('DB is empty'.blue) 
    })
})