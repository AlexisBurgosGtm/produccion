//const socket = io.connect('http://localhost:8000');
const socket = io();

socket.on('peso', function(data, nombre){
    
        let peso = limpiarDatosPeso(data);
        
        if(boolObteniendoPeso==true){
            try {

                if(nombre=='KG'){document.getElementById('txtPesoKg').value = peso;}
                if(nombre=='MG'){document.getElementById('txtPesoMg').value = peso;}

            } catch (error) {
                
            }
        }
    

});



function limpiarDatosPeso(data){
    let peso = data.replace("ST,NT,","");
    peso = peso.replace(" lb","");
    peso = peso.replace("g","");
    peso = peso.replace("k","");
    peso = peso.replace("kg","");
    peso = peso.replace("US,GS","");
    peso = peso.replace("ST,GS","");
    peso = peso.replace("+","");
    peso = peso.replace(",","");

    peso = peso.replace(/\s/g,'');

    return peso;
}

