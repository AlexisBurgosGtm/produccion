let apigen = {
    login : (sucursal,user,pass)=>{
        
        GlobalUsuarioTipo = user;

        return new Promise((resolve,reject)=>{
            axios.post(`/api/login`,{usuario:user,clave:pass})
            .then((response) => {
                const data = response.data.recordset;
                if(Number(response.data.rowsAffected[0])==1){

                    
                            GlobalUsuario = user;
                            GlobalPassUsuario = pass;
                            GlobalCodSucursal = sucursal;
                            
                            classNavegar.inicio(); 
                       
                    resolve();
                }else{
                    GlobalUsuario = '';
                    GlobalTipoUsuario = '';
                   
                    funciones.AvisoError('Usuario o Contraseña incorrectos, intente seleccionando la sucursal a la que pertenece');
                    reject();
                }
            }, (error) => {
                funciones.AvisoError('Error en la solicitud');
                reject();
            });

        })
        

    },
    config_reiniciar_basculas:()=>{
        return new Promise((resolve,reject)=>{
            axios.post('/reiniciar_basculas')
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve();             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    config_cargar_config:()=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/config', {empnit:GlobalCodSucursal})
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    config_update_config:(opcion,valor)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/config_update', {empnit:GlobalCodSucursal,opcion:opcion,valor:valor})
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve();             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    recetas:(empnit,codclados,codclatres,tabla,valor)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/recetas',{      
                empnit:empnit,
                codclados:codclados,
                codclatres:codclatres,
                tabla:tabla,
                valor:valor
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    productos_receta:(empnit,codprod,coddoc,correlativo)=>{
        
        let micromacro = '';
        
        if(GlobalUsuario=='MICROS'){micromacro = '003';}
        if(GlobalUsuario=='MACROS'){micromacro = '004';}
        if(GlobalConfiguraciones.VER_CATEGORIAS=='NO'){micromacro='TODOS';}

        return new Promise((resolve,reject)=>{
            axios.post('/api/productos_receta',{      
                empnit:empnit,
                codprod:codprod,
                coddoc:coddoc,
                correlativo:correlativo,
                micro_macro:micromacro
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    ordenes_pendientes:(empnit)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/ordenes_pendientes',{      
                empnit:empnit
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    correlativo_documento:(empnit,coddoc,tipo)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/tipodocumentos_correlativo',{      
                empnit:empnit,
                coddoc:coddoc
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    get_coddoc:(empnit,tipo)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/tipodocumentos_coddoc',{      
                empnit:empnit,
                tipo:tipo
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    get_coddoc_salida:(empnit,coddoc)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/tipodocumentos_coddoc_salida',{      
                empnit:empnit,
                coddoc:coddoc
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    ordenes_nueva:(empnit,coddocent, correlativoent, coddocsal, correlativosal, fecha, obs, codprod, cantidad, desprod,codmedida,equivale)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/ordenes_nueva',{      
                empnit:empnit,
                coddocent:coddocent,
                correlativoent:correlativoent,
                coddocsal:coddocsal,
                correlativosal:correlativosal,
                fecha:fecha,
                obs:obs,
                codprod:codprod,
                desprod:desprod,
                cantidad:cantidad,
                codmedida:codmedida,
                equivale:equivale
             })
             .then((response) => {
                 let data = response.data;
                 resolve()             
             }, (error) => {
                 reject();
             });        
        })
    },
    ordenes_eliminar:(coddocent,correlativoent,coddocsal,correlativosal)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/ordenes_eliminar',{      
                empnit:GlobalCodSucursal,
                coddocent:coddocent,
                correlativoent:correlativoent,
                coddocsal:coddocsal,
                correlativosal:correlativosal
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    update_peso_insumo:(empnit,id,peso,coddocsal,correlativosal)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/update_peso_producto',{      
                empnit:empnit,
                id:id,
                peso:peso,
                coddocsal:coddocsal,
                correlativosal:correlativosal
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    },
    ordenes_lotes:(empnit)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/ordenes_lotes',{      
                empnit:empnit
             })
             .then((response) => {
                 let data = response.data;
                 if(Number(data.rowsAffected[0])>0){
                     resolve(data);             
                 }else{
                     reject();
                 }             
             }, (error) => {
                 reject();
             });        
        })
    }
}
