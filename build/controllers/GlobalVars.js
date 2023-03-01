let versionapp = 'Versión 02.2023';

let config_clave = 'EDDYMORENO';

let root = document.getElementById('root');
let rootMenu = document.getElementById('rootMenu');
let rootMenuFooter = document.getElementById('rootMenuFooter');
let rootErrores = document.getElementById('rootErrores');

let lbMenuTitulo = document.getElementById('lbMenuTitulo');
let rootMenuLateral = document.getElementById('rootMenuLateral');
const showMenuLateral =(titulo)=>{ $("#modalMenu").modal('show'); lbMenuTitulo.innerText = titulo;};
const hideMenuLateral =()=>{ $("#modalMenu").modal('hide'); lbMenuTitulo.innerText = '';};

let divUsuario = document.getElementById('divUsuario');
let lbTipo = document.getElementById('lbTipo');

divUsuario.innerText = "DESCONECTADO";
lbTipo.innerText = "Inicie sesión";

let dataEmpresas = [ 
    {codsucursal:"6904684-0",nomsucursal:"GLINS",color:"success"}
  ];
  
let GlobalCodSucursal  = '6904684-0';
let boolObteniendoPeso = false;

//variables produccion
let GlobalSelectedClaseDos = '003' // '003', 'MICROS' - '004', 'MACROS'
let GlobalSelectedClaseTres = '01' // '01', 'POLLO' - '02', 'REPRODUCTORA' - '03', 'CERDO' - '04', 'COMERCIAL'
let GlobalSelectedCodprodReceta = '';
let GlobalSelectedCoddocEntrada = ''; let GlobalSelectedCorrelativoEntrada = '';
let GlobalSelectedCoddocSalida = ''; let GlobalSelectedCorrelativoSalida = '';

let GlobalCodUsuario = 99999;
let GlobalUsuario = 'SANTAFE';
let GlobalPassUsuario = '';
let GlobalNivelUser = 0;
let GlobalUsuarioTipo = ''; //MICRO, MACRO

let GlobalSelectedForm = '';


// global vars para cantidad producto
let GlobalSelectedId = 0;
let GlobalSelectedCodprod = '';
let GlobalSelectedDesprod = '';
let GlobalSelectedCodmedida = '';
let GlobalSelectedEquivale = 0;
let GlobalSelectedCantidad = 0;
let GlobalSelectedExento = 0;
let GlobalSelectedCosto = 0;
let GlobalSelectedPrecio = 0;
let GlobalSelectedExistencia = 0;
let GlobalSelectedNoLote = '';
// global vars para cantidad producto

let GlobalConfiguraciones = [];


let GlobalConfMuestraLote = 'NO';
let GlobalConfMostrarCategorias = 'SI';



let GlobalLoaderMini = `<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>`;

let GlobalLoader = `
                <div>
                    <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-danger" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div>
                </div>
                `

let GlobalUrl = document.location.origin.toString();



function showWaitForm(){
    $('#modalWait').modal('show');
};


function hideWaitForm(){
    //esta linea ayuda a que las modales cierren
    if ($('.modal-backdrop').is(':visible')) {
        $('body').removeClass('modal-open'); 
        $('.modal-backdrop').remove(); 
    };

    //$('#modalWait').modal('hide');
    document.getElementById('btnCerrarModalWait').click();

};


//elimina los mensajes de console (  logger.disableLogger()  )
var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();


