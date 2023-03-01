

//inicializa la instalacion de la app
funciones.instalationHandlers('btnInstalarApp');

let btnCerrarModalWait = document.getElementById('btnCerrarModalWait');

function InicializarServiceWorkerNotif(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('./sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
  };

 
  requestPermission();
}

if ('Notification' in window) {};

function requestPermission() {
  if (!('Notification' in window)) {
    //alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    //$status.innerText = result;
  });
};


InicializarServiceWorkerNotif();



let btnMConfig = document.getElementById('btnMConfig');
btnMConfig.addEventListener('click',()=>{                      

    funciones.Confirmacion('¿Está seguro que desea Salir?')
    .then((value)=>{
      if(value==true){
          classNavegar.login();
      }
    });

    return;
    if(GlobalSelectedForm=='LOGIN'){
        funciones.AvisoError('Debe iniciar sesión para ver esta sección');
        return;
    };

    $("#modalMenuPrincipal").modal('show');

    //classNavegar.ConfigVendedor();
});

document.getElementById("btnConfiguraciones").addEventListener("click", ()=>{
    $("#modalConfiguraciones").modal('show');
    document.getElementById("txtVerLotes").value = GlobalConfiguraciones.VER_LOTES;
    document.getElementById("txtVerCategorias").value = GlobalConfiguraciones.VER_CATEGORIAS;
    document.getElementById("txtConfigTabla").value = GlobalConfiguraciones.TABLA_CATEGORIAS;
    document.getElementById("txtConfigValor").value = GlobalConfiguraciones.COD_CATEGORIA;
    
});

document.getElementById('btnConfigGuardarVerLotes').addEventListener('click',()=>{
    funciones.Confirmacion('¿Está seguro que desea guardar los cambios?')
    .then((value)=>{
      if(value==true){
          apigen.config_update_config('LOTES',document.getElementById("txtVerLotes").value)
          .then(()=>{
              funciones.Aviso('Los cambios han sido guardados');
              apigen.config_cargar_config().then((data)=>{GlobalConfiguraciones = data.recordset[0];});
          })
          .catch(()=>{
            funciones.AvisoError('No se pudo guardar los cambios');
          })
        }

    });
});

document.getElementById('btnConfigGuardarVerCategorias').addEventListener('click',()=>{
    funciones.Confirmacion('¿Está seguro que desea guardar los cambios?')
    .then((value)=>{
      if(value==true){
          apigen.config_update_config('CATEGORIAS',document.getElementById("txtVerCategorias").value)
          .then(()=>{
              funciones.Aviso('Los cambios han sido guardados');
              apigen.config_cargar_config().then((data)=>{GlobalConfiguraciones = data.recordset[0];});
          })
          .catch(()=>{
            funciones.AvisoError('No se pudo guardar los cambios');
          })
        }

    });
});

document.getElementById('btnConfigReiniciarBasculas').addEventListener('click',()=>{
    funciones.Confirmacion('¿Está seguro que desea reiniciar las basculas?')
    .then((value)=>{
        if(value==true){
            apigen.config_reiniciar_basculas()
            .then(()=>{
                funciones.Aviso('Se ha dado la orden de reiniciar las basculas');
            })
        }
    });
})


document.getElementById('btnConfigGuardarTablaValor').addEventListener('click',()=>{
  console.log('hola')
  funciones.Confirmacion('¿Está seguro que desea Guardar esta Tabla y Valor a filtrar?')
  .then((value)=>{
      if(value==true){
          apigen.config_update_config('TABLA',document.getElementById('txtConfigTabla').value)
          .then(()=>{
              funciones.Aviso('Campo a filtrar actualizado');
              apigen.config_cargar_config().then((data)=>{GlobalConfiguraciones = data.recordset[0];});
          })
          .catch(()=>{
              funciones.AvisoError('No se actualizó el campo a filtrar')
          })

          apigen.config_update_config('VALOR',document.getElementById('txtConfigValor').value)
          .then(()=>{
              funciones.Aviso('Campo a filtrar actualizado');
              apigen.config_cargar_config().then((data)=>{GlobalConfiguraciones = data.recordset[0];});
          })
          .catch(()=>{
              funciones.AvisoError('No se actualizó el campo a filtrar')
          })

      }
  });
})


// LISTENER DE LOS BOTONES DEL MENU
let btnMenuInicioSalir = document.getElementById('btnMenuInicioSalir');
btnMenuInicioSalir.addEventListener('click',()=>{
    classNavegar.login();
});

// LISTENER DEL BOTON PARA CERRAR EL MODAL DEL MENU LATERAL
let btnCerrarModalMenuLateral = document.getElementById('btnCerrarModalMenuLateral');
btnCerrarModalMenuLateral.addEventListener('click',()=>{
    $('#modalMenu').modal('hide');
})


function setLog(msg,idcontainer){

  document.getElementById(idcontainer).innerHTML = msg;

};


function setState(dispositivo){
  if(dispositivo=='PC'){
    classNavegar.login();
  }else{
    classNavegar.phone();
  }
};
//INICIA COMO PC O TELÉFONO
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
if(/android/i.test(userAgent)){
  setState('PC');
}else{
  setState('PC');
};







//manejador de online, offline
(function () {
  'use strict';

  // :: Internet Connection Detect
  var internetStatus = document.getElementById('internetStatus');

  if (window.navigator.onLine) {
      internetStatus.textContent = "De vuelta en línea";
      internetStatus.style.backgroundColor = "#00b894";
      internetStatus.style.display = "none";
  } else {
      internetStatus.textContent = "No tienes conexión a internet";
      internetStatus.style.backgroundColor = "#ea4c62";
      internetStatus.style.boxShadow = "0 .5rem 1rem rgba(0,0,0,.15)";
      internetStatus.style.display = "block";
  }

  window.addEventListener('online', function () {
      internetStatus.textContent = "De vuelta en línea";
      internetStatus.style.backgroundColor = "#00b894";
      internetStatus.style.boxShadow = "0 .5rem 1rem rgba(0,0,0,.15)";
      $("#internetStatus").delay("5000").fadeOut(500);
  });

  window.addEventListener('offline', function () {
      internetStatus.textContent = "No tienes conexión a internet";
      internetStatus.style.backgroundColor = "#ea4c62";
      internetStatus.style.boxShadow = "0 .5rem 1rem rgba(0,0,0,.15)";
      $("#internetStatus").fadeIn(500);
  });

})();