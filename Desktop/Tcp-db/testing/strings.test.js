const functoions = require('../actions')
const color = require('colors')




describe('this is for strings ', () => {
  store = {'ro':[1,2,3.4,5,6]}

    test('should give the give the error as SET need 2 inputs and given 1',()=>{
        const res1 = functoions.SET(['set', 'a'])
        expect(res1).toBe(`set takes two inputs as arguments but get 1\n`.yellow);

    })
    test('will save the data in memory and  give the output as OK', () => {
        const res = functoions.SET(['set', 'a', '13'])
        expect(res).toBe('OK\n'.green);
    });

    test('should give the give the error as GET need 1 inputs and given 2',()=>{
        
        const res1 = functoions.GET(['get', 'a','roshan'])
        expect(res1).toBe(`get takes one inputs as arguments but get 2\n`.green);

    });
    test(`should give the error as it dosen't work for list type data `, () => {
        res = functoions.GET(['get','ro'])       
        expect(res).toBe('Wrong type opration\n'.yellow) 
    });

    test(`should give the error as the key dosen't exist `, () => {
        res = functoions.GET(['get','o'])       
        expect(res).toBe("key dosen't exist\n".yellow) 
    });
    test(`should give the value of a  `, () => {
        res = functoions.GET(['get','a'])   
        expect(res).toBe(`13\n`.green) 
    })
    test(`should give the error as the expires takes 2 inputs and given is 2  `, () => {
        res = functoions.EXPIRES(['expires','a','12','asdf'])   
        expect(res).toBe((`expire takes 2 inputs given 3\n`.red)) 
    });

    test(`should give the error as the second argument should be a number `, () => {
        res = functoions.EXPIRES(['expires','a','roshan'])   

        expect(res).toBe('second argument should be a number\n'.green) 
    })
    

    test(`should give the error as the key dosen't exist`, () => {
        res = functoions.EXPIRES(['expires','aa','12'])   

        expect(res).toBe(`Key dosen't exist\n`.red) 
    })

    // test(`should expite the entity in 3 sec`, () => {
    //     res = functoions.EXPIRES(['expires','a','3'])   

    //     expect(res).toBe(("OK\n".green)) 

    // })
    



})


