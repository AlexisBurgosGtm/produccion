
function db_delete_peso(bascula,id){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: bascula,
            where: {
                ID: Number(id)
            }
        });
        if(rowsDeleted>0){
            resolve();
        }else{
            resolve();
        }
    })            
};

function db_delete_tbl_peso(bascula){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.clear(bascula);
        resolve();
    })            
};



function db_tbl_peso(bascula) {


    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: bascula
        });
        resolve(response)
    });
};


function db_insert_peso(bascula,hora,peso){
    
    let datos = {bascula:bascula,hora:hora,peso:peso};


    return new Promise((resolve,reject)=>{
        connection.insert({
            into: bascula,
            values: [datos], //you can insert multiple values at a time
        })
        .then(()=>{
            resolve();
        })
        .catch(()=>{
            reject();
        })
    }) 

};

function get_total_peso(){
    
    let peso1 = 0; let peso2 = 0;

    return new Promise(async(resolve,reject)=>{
        let pesototal = 0;
        //pesa kilogramos
        var response1 = await connection.select({
            from: 'pesa1'
        });
        //pesa miligramos
        var response2 = await connection.select({
            from: 'pesa2'
        });
        response1.map((r)=>{
            peso1 += Number(r.peso);
        });
        response2.map((r)=>{
            peso2 += Number(r.peso);
        });
        
        pesototal = Number(peso1) + (Number(peso2)/1000);
        resolve(pesototal.toFixed(4));

    });
}





