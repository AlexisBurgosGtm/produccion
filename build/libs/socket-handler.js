const socket = io.connect(config_url_servicio_basculas);
//const socket = io();

socket.on('peso', function(data, nombre){
    
        let peso = limpiarDatosPeso(data);
        console.log(nombre);
        console.log(peso);
        if(boolObteniendoPeso==true){
            try {

                if(nombre==document.getElementById('cmbPesajeBasculasKg').value){document.getElementById('txtPesoKg').value = peso;}
                if(nombre==document.getElementById('cmbPesajeBasculasGr').value){document.getElementById('txtPesoMg').value = peso;}

            } catch (error) {
                
            }
        }
    

});



function limpiarDatosPeso(data){
    let peso = data.replace("ST,NT,","");
    peso = peso.replace("ST,NT","");
    peso = peso.replace(" lb","");
    peso = peso.replace("g","");
    peso = peso.replace("k","");
    peso = peso.replace("kg","");
    peso = peso.replace("US,GS","");
    peso = peso.replace("ST,GS","");
    peso = peso.replace("ST,GS,+","");
    peso = peso.replace("+","");
    peso = peso.replace(",","");
    peso = peso.replace("lb", "");
    peso = peso.replace(/\s/g,'');

    return peso;
}

