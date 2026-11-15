import {test,expect,request} from '@playwright/test'

test('apiGETvalidation',async({request})=>{

const response= await request.get('https://jsonplaceholder.typicode.com/posts/1',{

  headers:{'Accept':'application/json'},
  ignoreHTTPSErrors:true,

})


expect(response).toBeOK();
expect(response.status()).toBe(200);
const conResponse=await response.json();
expect(conResponse.id).toBe(1);

});


test('apiPOSTvalidation',async({request})=>{

    const response=await request.post('https://jsonplaceholder.typicode.com/posts',{

        ignoreHTTPSErrors:true,


    data:{
        title:'Freedom is not given',
        body:'it has to be taken',
        userId:1,

    }

    })

    expect(response).toBeOK();
    expect(response.status()).toBe(201);
    const conresponse=await response.json();
    expect(conresponse.title).toBe('Freedom is not given');

});

test('InvalidPostInGET',async({request})=>{

    const response=await request.get('https://jsonplaceholder.typicode.com/posts/99999',{

     ignoreHTTPSErrors:true,

    })

    expect(response.status()).toBe(404);
    
});