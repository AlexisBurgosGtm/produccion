function getView(){

    let view = {
        body: ()=>{
            return `
        <div class="col-12 p-0 bg-white">
           
           <div class="tab-content" id="myTabHomeContent">
              
               <div class="tab-pane fade  show active" id="ordenes" role="tabpanel" aria-labelledby="">  
                            
                    ${view.ordenes_pendientes() }

               </div>

                <div class="tab-pane fade" id="ordennueva" role="tabpanel" aria-labelledby="">
                   
                    ${view.ordenes_nueva()}
                </div>

               <div class="tab-pane fade" id="inicio" role="tabpanel" aria-labelledby="">
                   
                    ${view.tipos()}
               </div>
             
               <div class="tab-pane fade p-2" id="recetas" role="tabpanel" aria-labelledby="">  
                   <h3 class="negrita text-danger" id="lbTipoReceta"></h3>
                   ${view.recetas() + view.modal_receta_lotes()}
               </div>

               <div class="tab-pane fade" id="pesaje" role="tabpanel" aria-labelledby="">  
                  ${view.pesaje()}
               </div>

               <div class="tab-pane fade" id="bascula" role="tabpanel" aria-labelledby="">  
                  ${view.pesaje_bascula()}
               </div>

           </div>
           <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                <li class="nav-item">
                <a class="nav-link active negrita text-danger" id="tab-ordenes" data-toggle="tab" href="#ordenes" role="tab" aria-controls="home" aria-selected="true">
                    <i class="fal fa-comments"></i>ordenes</a>
                </li>    
                <li class="nav-item">
                    <a class="nav-link negrita text-danger" id="tab-orden-nueva" data-toggle="tab" href="#ordennueva" role="tab" aria-controls="home" aria-selected="true">
                        <i class="fal fa-comments"></i>nueva orden</a>
                </li> 
                <li class="nav-item">
                    <a class="nav-link negrita text-danger" id="tab-inicio" data-toggle="tab" href="#inicio" role="tab" aria-controls="home" aria-selected="true">
                        <i class="fal fa-comments"></i>tipos</a>
                </li> 
                <li class="nav-item">
                    <a class="nav-link negrita text-success" id="tab-recetas" data-toggle="tab" href="#recetas" role="tab" aria-controls="profile" aria-selected="false">
                        <i class="fal fa-chart-pie"></i>recetas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link negrita text-info" id="tab-pesaje" data-toggle="tab" href="#pesaje" role="tab" aria-controls="home" aria-selected="true">
                        <i class="fal fa-edit"></i>pesaje</a>
                </li>  
                <li class="nav-item">
                    <a class="nav-link negrita text-info" id="tab-bascula" data-toggle="tab" href="#bascula" role="tab" aria-controls="home" aria-selected="true">
                        <i class="fal fa-edit"></i>bascula</a>
                </li>            
            </ul> 
          
       </div>
            `
        },
        ordenes_pendientes:()=>{
            return `
            <div class="row">
                <div class="card card-rounded shadow col-12">
                    <div class="card-body p-4">
                        
                        <div class="row">
                            <div class="col-8">
                                <h3 class="negrita">Órdenes Pendientes</h3>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-primary btn-circle btn-lg hand shadow" id="btnOrdenesRecargar">
                                    <i class="fal fa-sync"></i>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="card card-rounded shadow col-12">
                    <div class="card-body p-4">
                        <div class="table-responsive">
                            <table class="table table-responsive table-striped table-bordered" style="font-size:120%">
                                <thead class="bg-secondary text-white">
                                    <tr>
                                        <td></td>
                                        <td>ORDEN</td>
                                        <td>OBSERVACIONES</td>
                                        <td>FECHA</td>
                                        <td>ESTATUS</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody id="tblOrdenesPendientes">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" id="fixed-btn2">
                <button class=" btn btn-circle btn-hand btn-xl btn-success" id="btnOrdenesNueva">
                    <i class="fal fa-plus"></i>
                </button>
            </div>
            `
        },
        ordenes_nueva:()=>{
            return `
                        <div class="card card-rounded shadow">
                            <div class="card-body">

                                <h4 class="negrita text-info" id="lbRecetaDesprod"></h4>

                                <h2 class="negrita">Cantidad a Producir</h2>
                    
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group p-4">
                                            <label>Indique la Cantidad a Producir</label>
                                            <input type="number" class="form-control col-6 negrita text-danger border-danger" style="font-size:120%" id="txtRecetaCantidad" value="0">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Fecha</label>
                                            <input type="date" class="form-control negrita" id="txtOrdenesFecha">
                                        </div>
                                    </div>
                                </div>
                              

                                <div class="form-group">
                                    <label>Observaciones de la Orden</label>
                                    <input type="text" class="form-control negrita" id="txtOrdenesObs" value="SN">
                                    <br>
                                    <input type="text" class="form-control negrita text-info border-info" id="txtOrdenesNoLote" value="" placeholder="Lote...">
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Documento de Entrada</label>
                                            <select class="form-control negrita" id="cmbOrdenesCoddocEntrada">
                                            </select>
                                            <label class="negrita text-danger" id="lbOrdenesCoddocEntradaCorrelativo">0000<label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Documento de Salida</label>
                                            <select class="form-control negrita" id="cmbOrdenesCoddocSalida" disabled="true">
                                            </select>
                                            <label class="negrita text-danger" id="lbOrdenesCoddocSalidaCorrelativo">0000<label>
                                        </div>    
                                    </div>
                                </div>
                            

                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-secondary btn-xl btn-circle hand shadow" id="btnRecetaCantidadAtras">
                                            <i class="fal fa-arrow-left"></i>
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-success btn-xl btn-circle hand shadow" id="btnRecetaCantidadAceptar">
                                            <i class="fal fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>                    
            `
        },
        modal_ordenes :()=>{
            return `
        <div class="modal fade modal-with-scroll" id="modalNuevaOrden" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-info">
                        <label class="modal-title text-white h5" id="">Datos de la Nueva Orden</label>
                    </div>
                    
                    <div class="modal-body">
                        <div class="card card-rounded shadow">
                            <div class="card-body">
                       
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <input type="date" class="form-control negrita" id="txtOrdenesFecha">
                                </div>

                                <div class="form-group">
                                    <label>No. Lote / Observaciones</label>
                                    <input type="text" class="form-control negrita" id="txtOrdenesObs" value="SN">
                                </div>

                               
                                        <div class="form-group">
                                            <label>Documento de Entrada</label>
                                            <select class="form-control negrita" id="cmbOrdenesCoddocEntrada">
                                            </select>
                                            <label class="negrita text-danger" id="lbOrdenesCoddocEntradaCorrelativo">0000<label>
                                        </div>
                                   
                                        <div class="form-group">
                                            <label>Documento de Salida</label>
                                            <select class="form-control negrita" id="cmbOrdenesCoddocSalida" disabled="true">
                                            </select>
                                            <label class="negrita text-danger" id="lbOrdenesCoddocSalidaCorrelativo">0000<label>
                                        </div>
                              
                                

                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-secondary btn-xl btn-circle hand shadow" data-dismiss="modal">
                                            <i class="fal fa-arrow-left"></i>
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-success btn-xl btn-circle hand shadow" id="btnOrdenesGuardar">
                                            <i class="fal fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>                    
                      

                        
                    </div>

                
                </div>
            </div>
        </div>
            `
        },
        tipos: ()=>{
            return `
            <div class="row">
                <div class="card card-rounded col-12 text-center">
                    <div class="card-body">
                        <h3 class="text-info negrita">Seleccione el Tipo de Producción</h3>
                    </div>
                </div>
                
            </div>
            <br>
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                    <div class="card card-rounded shadow hand" onclick="cardSelected('POLLO','01')">
                        <div class="card-header bg-warning text-white">
                            <h5>POLLO</h5>
                        </div>
                        <div class="card-body" align="center">
                            <img class="img-responsive" src="./img/logopollo.png" width="200px" height="200px" >
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                    <div class="card card-rounded shadow hand" onclick="cardSelected('CERDO','03')">
                        <div class="card-header bg-danger text-white">
                            <h5>CERDO</h5>
                        </div>
                        <div class="card-body" align="center">
                            <img class="img-responsive" src="./img/logocerdo.png" width="200px" height="200px" >
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                    <div class="card card-rounded shadow hand" onclick="cardSelected('REPRODUCTORA','02')">
                        <div class="card-header bg-secondary text-white">
                            <h5>REPRODUCTORA</h5>
                        </div>
                        <div class="card-body" align="center">
                            <img class="img-responsive" src="./img/logogallina.png" width="200px" height="200px" >
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                    <div class="card card-rounded shadow hand" onclick="cardSelected('POSTURA COMERCIAL','04')">
                        <div class="card-header bg-info text-white">
                            <h5>POSTURA COMERCIAL</h5>
                        </div>
                        <div class="card-body" align="center">
                            <img class="img-responsive" src="./img/logohuevo.png" width="200px" height="200px" >
                        </div>
                    </div>
                </div>
            </div>
            <div class="" id="fixed-btn3">
                <button class=" btn btn-circle btn-hand btn-xl btn-secondary" id="btnTiposAtras">
                    <i class="fal fa-arrow-left"></i>
                </button>
            </div>
            `
        },
        recetas: ()=>{
            return `
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <input type="text" id="filtroCards" class="border-danger text-danger negrita form-control" onkeyup="aplicaFiltroCards()" placeholder="Filtro...">
                </div>
            </div>
            <br/>

        
            <div class="card-deck" id="tblRecetas">

            </div>
            <div  id="fixed-btn3">
                <button class="btn-bottom-l btn btn-circle btn-hand btn-xl btn-secondary" id="btnRecetasAtras">
                    <i class="fal fa-arrow-left"></i>
                </button>
            </div>
            `
        },
        modal_receta_lotes :()=>{
            return `
        <div class="modal fade modal-with-scroll" id="modalRecetaLotes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-secondary">
                        <label class="modal-title text-white h2" id="">Lotes de Producción</label>
                    </div>
                    
                    <div class="modal-body">
                        <div class="card card-rounded shadow">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <td>No.Lote</td>
                                                <td>Descripción</td>
                                                <td>Fecha</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody id="tblLotes"></tbody>
                                    </table>

                                </div>


                              
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-secondary btn-xl btn-circle hand shadow" data-dismiss="modal">
                                            <i class="fal fa-arrow-left"></i>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>                    
                      

                        
                    </div>

                
                </div>
            </div>
        </div>
            `
        },
        pesaje : ()=>{
            return `

            <h1 class="negrita" id="lbTituloProduccion">Lista de Pesaje</h1>
            <h4 class="negrita text-info" id="lbTituloCoddocOrden">CODDOC-NUMERO</h4>

            
            <div class="row">
                <div class="card card-rounded shadow col-12">
                    <div class="card-body p-2">
                        
                        <div class="form-group" style="font-size:120%">
                            <label>Filtrar por:</label>
                            <div class="input-group">
                                <input type="text" class="form-control border-danger text-danger" placeholder="Buscar por código o descripción" id="txtBuscar">
                                <button class="btn btn-danger" id="btnBuscarEliminar">X</button>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="table-responsive">
                    <table class="table table-responsive col-12" style="font-size:120%" id="tblProductosPesados">
                        <thead class="bg-info text-white">
                            <tr>
                                <td>Código</td>
                                <td>Producto</td>
                                <td>Medida</td>
                                <td>Unidades Producir</td>
                                <td>Unidades Pesadas</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody id="tblProductosPesar">
                        </tbody>
                        
                    </table>
                </div>

            </div>
            
            <div  id="fixed-btn3">
                <button class="btn-bottom-l btn btn-circle btn-hand btn-xl btn-secondary" id="btnPesajeAtras">
                    <i class="fal fa-arrow-left"></i>
                </button>
            </div>
            `
        },
        pesaje_bascula :()=>{
            return `
            <div class="card card-rounded shadow col-12">
                <div class="card-body p-2">
                    <label class="modal-title text-secondary h2" id="">Obtener peso de Báscula</label>
                </div>
            </div>
            <br>
            
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        
                            <div class="card card-rounded shadow col-12">
                                <div class="card-body p-4">
                                    
                                    <h5 class="negrita text-danger" id="lbPesajeDesprod">Desprod</h5>
                                    
                                    <div class="form-group p-4">
                                        <label>Peso Esperado:</label>
                                        <input type="number" class="form-control col-6 negrita text-info border-info" style="font-size:150%" id="txtPesajePesoEsperado" value="0" disabled="true">
                                    </div>

                                    <div class="form-group p-4">
                                        <label>Peso encontrado:</label>
                                        <input type="number" class="form-control col-6 negrita text-danger border-danger" style="font-size:150%" id="txtPesajePeso" disabled="true">
                                    </div>

                                    <div class="row footer">
                                        <div class="col-6">
                                            <button class="btn btn-secondary btn-xl btn-circle hand shadow" id="btnPesajeCerrarModal">
                                                <i class="fal fa-arrow-left"></i>
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button class="btn btn-success btn-xl btn-circle hand shadow" id="btnPesajeAceptarModal">
                                                <i class="fal fa-check"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="card card-rounded shadow col-12">
                                <div class="card-body p-4">
                                    <div class="row">
                                        <div class="col-6">

                                            <h4 class="negrita text-danger">Báscula Kilogramos</h4>
                                            <br />
                                            <div class="form-group">
                                                <label>Peso Detectado:</label>
                                                <div class="input-group">
                                                    <input type="number" class="form-control col-6 negrita text-info border-info" id="txtPesoKg">
                                                    <button class="btn btn-info btn-md shadow hand" id="btnPesajeAgregarKg">
                                                        <i class="fal fa-plus"></i>Agregar
                                                    </button>
                                                </div>
                                            </div>

                                            <hr class="solid">
                                            
                                            <table class="table table-responsive table-bordered table-striped">
                                                <thead class="bg-info text-white">
                                                    <tr>
                                                        <td>Hora</td>
                                                        <td>Peso</td>
                                                        <td></td>
                                                    </tr>
                                                </thead>
                                                <tbody id="tblPesoKg"></tbody>

                                            </table>
                                          

                                        </div>
                                        <div class="col-6">

                                            <h4 class="negrita text-danger">Báscula Miligramos</h4>
                                            <br />
                                            <div class="form-group">
                                                <label>Peso Detectado:</label>
                                                <div class="input-group">
                                                    <input type="number" class="form-control col-6 negrita border-secondary text-secondary" id="txtPesoMg">
                                                    <button class="btn btn-secondary btn-md shadow hand" id="btnPesajeAgregarMg">
                                                        <i class="fal fa-plus"></i>Agregar
                                                    </button>
                                                </div>

                                            </div>

                                            <hr class="solid">
                                            
                                            <table class="table table-responsive table-bordered table-striped">
                                                <thead class="bg-secondary text-white">
                                                    <tr>
                                                        <td>Hora</td>
                                                        <td>Peso</td>
                                                        <td></td>
                                                    </tr>
                                                </thead>
                                                <tbody id="tblPesoMg"></tbody>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                
                        </div>
                    </div>


            `
        }
    }

    root.innerHTML = view.body();

};

function addListeners(){

    //CONFIGURACION
    apigen.config_cargar_config().then((data)=>{GlobalConfiguraciones = data.recordset[0];});
    


    document.getElementById('lbTituloProduccion').innerText = 'Orden de Producción (' + GlobalUsuario + ')';
   
    // ORDENES

    document.getElementById('btnOrdenesRecargar').addEventListener('click',()=>{
        getordenesPendientes();
    });

    document.getElementById('btnOrdenesNueva').addEventListener('click',()=>{ 
      
        if(GlobalConfiguraciones.VER_CATEGORIAS=='SI'){
            document.getElementById('tab-inicio').click();
        }else{
            GlobalSelectedClaseTres = 'TODOS';
            document.getElementById('lbTipoReceta').innerText = 'LISTA DE PRODUCTOS FABRICADOS';
            document.getElementById('tab-recetas').click();
            
            
            getCardsRecetas('TODOS',GlobalConfiguraciones.TABLA_CATEGORIAS,GlobalConfiguraciones.COD_CATEGORIA);
        }
        
        
        

    });

    document.getElementById('txtOrdenesFecha').value = funciones.getFecha()
    getordenesPendientes();

    // ORDENES

    document.getElementById('btnTiposAtras').addEventListener('click',()=>{
        document.getElementById('tab-ordenes').click();
    })

    // --RECETAS
    document.getElementById('btnRecetasAtras').addEventListener('click',()=>{
        if(GlobalConfiguraciones.VER_CATEGORIAS=='SI'){
            document.getElementById('tab-inicio').click();
        }else{
            document.getElementById('tab-ordenes').click();
        }
        
    });


    //GENERA LA NUEVA ORDEN DE PRODUCCION

    document.getElementById('btnRecetaCantidadAtras').addEventListener('click',()=>{
        document.getElementById('tab-recetas').click();
    });

    let btnRecetaCantidadAceptar  = document.getElementById('btnRecetaCantidadAceptar');
    btnRecetaCantidadAceptar.addEventListener('click',()=>{
     
        let cantidad = document.getElementById('txtRecetaCantidad').value || '0';
    
        if(cantidad.toString()=='0'){funciones.AvisoError('Seleccione una cantidad válida');return;}
        //$("#modalRecetaCantidad").modal('hide');
        GlobalSelectedCantidad = cantidad;


//---------------------
        let coddocent = document.getElementById('cmbOrdenesCoddocEntrada').value || 'SN';
        let coddocsal = document.getElementById('cmbOrdenesCoddocSalida').value || 'SN';
        let corrent = document.getElementById('lbOrdenesCoddocEntradaCorrelativo').innerText || '0';
        let corrsal = document.getElementById('lbOrdenesCoddocSalidaCorrelativo').innerText || '0';
        let obs = funciones.limpiarTexto(document.getElementById('txtOrdenesObs').value) || 'SN';
        let fecha = funciones.devuelveFecha('txtOrdenesFecha');

        
        funciones.Confirmacion("¿Está seguro que desea Crear esta nueva orden?")
        .then((value)=>{
            if(value==true){
                btnRecetaCantidadAceptar.disabled = true;
                btnRecetaCantidadAceptar.innerHTML = '<i class="fal fa-check fa-spin"></i>';

                apigen.ordenes_nueva(GlobalCodSucursal,coddocent,corrent,coddocsal,corrsal,fecha,obs,GlobalSelectedCodprod,cantidad,GlobalSelectedDesprod,GlobalSelectedCodmedida,GlobalSelectedEquivale)
                .then(()=>{
                    funciones.Aviso('Orden Generada Exitosamente!!');
                    btnRecetaCantidadAceptar.disabled = false;
                    btnRecetaCantidadAceptar.innerHTML = '<i class="fal fa-check"></i>';
   
                    //$("#modalRecetaCantidad").modal('hide');

                    
                    document.getElementById('tab-ordenes').click();
                    getordenesPendientes();

                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo Guardar la Orden');
                    btnRecetaCantidadAceptar.disabled = false;
                    btnRecetaCantidadAceptar.innerHTML = '<i class="fal fa-check"></i>';
                })
            }
        })
//--------------------

        
        
    })

    //GENERA LA NUEVA ORDEN DE PRODUCCION

    // --RECETAS


    // --PESAJE
    document.getElementById('btnPesajeAtras').addEventListener('click',()=>{
        document.getElementById('tab-ordenes').click();
    });


    document.getElementById('btnPesajeCerrarModal').addEventListener('click',()=>{
        boolObteniendoPeso = false;
        //$("#modalPesajeCantidad").modal('hide');
        document.getElementById('tab-pesaje').click();
    })

    //semaforo peso
    document.getElementById('txtPesajePeso').addEventListener('input',()=>{
        handlerSemaforoPeso();
    });

    document.getElementById('txtPesajePeso').addEventListener('change',()=>{
        handlerSemaforoPeso();
    });
    //semaforo peso


    //GENERA LA NUEVA ORDEN DE PRODUCCION
    let btnPesajeAceptarModal = document.getElementById('btnPesajeAceptarModal');
    btnPesajeAceptarModal.addEventListener('click',()=>{

        let txtPesajePesoEsperado = document.getElementById('txtPesajePesoEsperado');
        let txtPesajePeso = document.getElementById('txtPesajePeso');
        
        if(Number(txtPesajePesoEsperado.value||0)==Number(txtPesajePeso.value||0)){}else{
            funciones.AvisoError('El peso no es igual al esperado');return;
        };

        funciones.Confirmacion('¿Está seguro que desea REGISTRAR ESTE PESO?')
        .then((value)=>{
            if(value==true){

                apigen.update_peso_insumo(GlobalCodSucursal,GlobalSelectedId,txtPesajePeso.value,GlobalSelectedCoddocSalida,GlobalSelectedCorrelativoSalida)
                .then((data)=>{
                    funciones.Aviso('Peso actualizado exitosamente!!');
                    getTblPesaje();
                    //$("#modalPesajeCantidad").modal('hide');
                    db_delete_tbl_peso('pesa1');
                    db_delete_tbl_peso('pesa2');

                    document.getElementById('tab-pesaje').click();
                })  
                .catch(()=>{
                    funciones.AvisoError('No se logró registrar el Peso');
                })

            }
        })




    });
    // --PESAJE


    apigen.get_coddoc(GlobalCodSucursal,'PRO')
    .then((data)=>{
        let str = '';
        data.recordset.map((r)=>{
            str += `
                <option value="${r.CODDOC}">${r.CODDOC}-${r.DESDOC}</option>
            `
        })
        let coddocent =document.getElementById('cmbOrdenesCoddocEntrada');
        coddocent.innerHTML = str;
        coddocent.addEventListener('change',()=>{
            apigen.correlativo_documento(GlobalCodSucursal,coddocent.value)
            .then((data)=>{
                let correlativo = '';
                data.recordset.map((r)=>{
                    correlativo = r.CORRELATIVO.toString();
                })
                document.getElementById('lbOrdenesCoddocEntradaCorrelativo').innerText = correlativo;
                apigen.get_coddoc_salida(GlobalCodSucursal,coddocent.value)
                .then((data)=>{
                    data.recordset.map((r)=>{
                        document.getElementById('cmbOrdenesCoddocSalida').value = r.CODDOCSAL;
                    });
                    getCorrelativosDocumentosProd();
                });
                
                
                
            })
            .catch(()=>{document.getElementById('lbOrdenesCoddocEntradaCorrelativo').innerText = '0'})
        })
    })
    .catch(()=>{
        document.getElementById('cmbOrdenesCoddocEntrada').innerHTML = '';
    });

    apigen.get_coddoc(GlobalCodSucursal,'INV')
    .then((data)=>{
        let str = '';
        data.recordset.map((r)=>{
            str += `
                <option value="${r.CODDOC}">${r.CODDOC}-${r.DESDOC}</option>
            `
        })
        let coddocsal =document.getElementById('cmbOrdenesCoddocSalida');
        coddocsal.innerHTML = str;
        coddocsal.addEventListener('change',()=>{
            apigen.correlativo_documento(GlobalCodSucursal,coddocsal.value)
            .then((data)=>{
                let correlativo = '';
                data.recordset.map((r)=>{
                    correlativo = r.CORRELATIVO.toString();
                })
               
                document.getElementById('lbOrdenesCoddocSalidaCorrelativo').innerText = correlativo;
            })
            .catch(()=>{document.getElementById('lbOrdenesCoddocSalidaCorrelativo').innerText = '0'})
        })
    })
    .catch(()=>{
        document.getElementById('cmbOrdenesCoddocSalida').innerHTML = '';
    });



 

    let btnPesajeAgregarKg = document.getElementById('btnPesajeAgregarKg');
    let btnPesajeAgregarMg = document.getElementById('btnPesajeAgregarMg');
    
   
    btnPesajeAgregarKg.addEventListener('click',()=>{
      
        db_insert_peso("pesa1",funciones.getHora(),Number(document.getElementById('txtPesoKg').value|| 0))
        .then(()=>{
            getTblPesosPesa("pesa1");
            document.getElementById('txtPesoKg').value ='';
        });
         

    });

    btnPesajeAgregarMg.addEventListener('click',()=>{
        db_insert_peso("pesa2",funciones.getHora(),Number(document.getElementById('txtPesoMg').value|| 0))
        .then(()=>{
            getTblPesosPesa("pesa2");
            document.getElementById('txtPesoMg').value ='';
        });
    });

    //busqueda de productos
    document.getElementById('txtBuscar').addEventListener('input',()=>{
        funciones.FiltrarTabla('tblProductosPesados','txtBuscar');
    });

    document.getElementById('btnBuscarEliminar').addEventListener('click',()=>{
        document.getElementById('txtBuscar').value = '';
        funciones.FiltrarTabla('tblProductosPesados','txtBuscar');    
    });


    funciones.slideAnimationTabs();

};

function handlerSemaforoPeso(){
    let txtPesajePesoEsperado = document.getElementById('txtPesajePesoEsperado');
    let txtPesajePeso = document.getElementById('txtPesajePeso');

    console.log('peso:')
    console.log(txtPesajePeso.value);
    console.log('esperado:')
    console.log(txtPesajePesoEsperado.value);

    if(Number(txtPesajePesoEsperado.value||0)==Number(txtPesajePeso.value||0)){
        console.log('es igual');

        txtPesajePeso.classList.remove('border-danger','text-danger');
        txtPesajePeso.classList.add('border-success','text-success');
                       
    }else{
        console.log('no es igual');
        txtPesajePeso.classList.remove('border-success','text-success');
        txtPesajePeso.classList.add('border-danger','text-danger');
    };
}

function getTblPesosPesa(bascula){

    let str = '';
    db_tbl_peso(bascula)
    .then((response)=>{
        response.map((r)=>{
            str += `
            <tr>
                <td>${r.hora}</td>
                <td class="negrita" style="">${r.peso}</td>
                <td>
                    <button class="btn btn-danger btn-circle hand shadow" onclick="delete_tbl_peso('${bascula}','${r.ID}')">
                        <i class="fal fa-trash"></i>
                    </button>
                </td>
            </tr>
            `

        })

        if(bascula=='pesa1'){document.getElementById('tblPesoKg').innerHTML = str;}

        if(bascula=='pesa2'){document.getElementById('tblPesoMg').innerHTML = str;}
    });

    get_total_peso()
    .then((total)=>{
        document.getElementById('txtPesajePeso').value = total || 0;
        handlerSemaforoPeso();
    })
    

};

function delete_tbl_peso(bascula,id){

    db_delete_peso(bascula,id)
    .then(()=>{
        getTblPesosPesa(bascula);
    })
};

function initView(){
    getView();
    addListeners();
};

// INICIO

function getordenesPendientes(){
    let container = document.getElementById('tblOrdenesPendientes');
    container.innerHTML = GlobalLoader;

    let id = '';
    let i = 0;

    apigen.ordenes_pendientes(GlobalCodSucursal)
    .then((data)=>{
        let str = '';
        data.recordset.map((r)=>{
            i += 1;
            id = `btnEliminar${i.toString()}`;
            str += `
            <tr>
                <td>
                    <button class="btn btn-danger btn-xl btn-circle shadow hand" id="${id}"
                        onclick="delete_orden('${id}','${r.CODDOC}','${r.DOC_NUMERO}','${r.CODDOCSAL}','${r.DOC_NUMEROSAL}')">
                        <i class="fal fa-trash"></i>
                    </button>
                </td>    
                <td>${r.CODDOC + r.DOC_NUMERO}</td>
                <td>${r.FABRICADO}
                    <br>
                    <small class="negrita">${r.OBS}</small>
                </td>
                <td>${funciones.convertDateNormal(r.FECHA)}</td>
                <td>
                    <div class="row">
                        <div class="col-6">
                            <label>Micros</label>
                            <br>
                            <label class="negrita text-danger">Ord:${r.MICROS_ESPERADO}</label>
                            <br>
                            <label class="negrita text-info">Pes:${r.MICROS_PESADO}</label>
                        </div>
                        <div class="col-6 border-info border-right-0">
                            <label>Macros</label>
                            <br>
                            <label class="negrita text-danger">Ord:${r.MACROS_ESPERADO}</label>
                            <br>
                            <label class="negrita text-info">Pes:${r.MACROS_PESADO}</label>
                        </div>
                    </div>
                    <div class="row" align="center">
                        <label>Otros:${r.OTROS}</label>
                    </div>
                </td>
                <td>
                    <button class="btn btn-info btn-xl btn-circle shadow hand" onclick="getOrden('${r.CODDOC}','${r.DOC_NUMERO}','${r.CODDOCSAL}','${r.DOC_NUMEROSAL}')">
                        <i class="fal fa-arrow-right"></i>
                    </button>
                </td>

                
                
            </tr>
            `
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...';
    })
    
};

function getOrden(coddoc,correlativo,coddocsal,correlativosal){

    GlobalSelectedCoddocEntrada = coddoc;
    GlobalSelectedCorrelativoEntrada = correlativo;
    GlobalSelectedCoddocSalida = coddocsal;
    GlobalSelectedCorrelativoSalida = correlativosal;

    document.getElementById('lbTituloCoddocOrden').innerText = coddoc + '-' + correlativo.toString();
    
 

    document.getElementById('tab-pesaje').click();
    getTblPesaje();

};

function delete_orden(idbtn,coddocent,correlativoent,coddocsal,correlativosal){
    let btn = document.getElementById(idbtn);

    funciones.solicitarClave('Escriba su Clave')
    .then((name)=>{
        if(name==config_clave){

            funciones.Confirmacion('¿Está completamente seguro que desea ELIMINAR ESTA ORDEN?')
            .then((value)=>{
                if(value==true){
                    
                    btn.innerHTML = '<i class="fal fa-trash fa-spin"></i>';
                    btn.disabled = true;

                    apigen.ordenes_eliminar(coddocent,correlativoent,coddocsal,correlativosal)
                    .then(()=>{
                        
                        //funciones.Aviso('Orden eliminada Exitosamente!!');
                        getordenesPendientes();
                    })
                    .catch(()=>{
                        getordenesPendientes();
                        //funciones.AvisoError('No se pudo eliminar esta orden');
                        
                        //btn.innerHTML = '<i class="fal fa-trash"></i>';
                        //btn.disabled = false;
                    })
                }
            })

        }
    })

    

}

function getCorrelativosDocumentosProd(){
let coddocent = document.getElementById('cmbOrdenesCoddocEntrada');
let coddocsal = document.getElementById('cmbOrdenesCoddocSalida')
    apigen.correlativo_documento(GlobalCodSucursal,coddocent.value)
    .then((data)=>{
        let correlativo = '';
        data.recordset.map((r)=>{
            correlativo = r.CORRELATIVO.toString();
        })
        document.getElementById('lbOrdenesCoddocEntradaCorrelativo').innerText = correlativo;
    })
    .catch(()=>{document.getElementById('lbOrdenesCoddocEntradaCorrelativo').innerText = '0'});

    apigen.correlativo_documento(GlobalCodSucursal,coddocsal.value)
    .then((data)=>{
        let correlativo = '';
        data.recordset.map((r)=>{
            correlativo = r.CORRELATIVO.toString();
        })
        document.getElementById('lbOrdenesCoddocSalidaCorrelativo').innerText = correlativo;
    })
    .catch(()=>{document.getElementById('lbOrdenesCoddocSalidaCorrelativo').innerText = '0'})




};



// inicio tipos
function cardSelected(tipo,codclatres){

    GlobalSelectedClaseTres = codclatres;
    document.getElementById('lbTipoReceta').innerText = tipo;
    document.getElementById('tab-recetas').click();
    
    
    getCardsRecetas(codclatres);

};


// RECETAS 
 function getCardsRecetas(codclatres,tabla,valor){
    let container = document.getElementById('tblRecetas');
    container.innerHTML = GlobalLoader;

    apigen.recetas(GlobalCodSucursal, GlobalSelectedClaseDos, codclatres,tabla,valor)
    .then((data)=>{
        let str = '';
        data.recordset.map((r)=>{
            str += `
        
            <div class="card card-rounded shadow hand" onclick="selectReceta('${r.CODPROD}','${r.DESPROD}','${r.CODMEDIDA}','${r.EQUIVALE}')">
                <div class="card-body p-2">
                    <h1 class="negrita">${r.DESPROD}</h1>
                    <br>
                     <h5 class="text-danger">Código: ${r.CODPROD}</h5>
                </div>
            </div>
                    `   
        })
        container.innerHTML = str;
        /*
          <div class="col-sm-6 col-lg-4 col-xl-4 col-md-4 p-2">
            <div class="card card-rounded shadow hand" onclick="selectReceta('${r.CODPROD}','${r.DESPROD}','${r.CODMEDIDA}','${r.EQUIVALE}')">
                <div class="card-body p-4">
                    <h1 class="negrita">${r.DESPROD}</h1>
                    <br>
                     <h5 class="text-danger">Código: ${r.CODPROD}</h5>
                </div>
            </div>
        </div>
        */
    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...';
    })
};

function selectReceta(codprod,desprod,codmedida,equivale){
    
    GlobalSelectedCodprod = codprod;
    GlobalSelectedDesprod = desprod;
    GlobalSelectedCodmedida = codmedida;
    GlobalSelectedEquivale = equivale;
    
    document.getElementById('lbRecetaDesprod').innerText = desprod;
    
    getCorrelativosDocumentosProd();

    if(GlobalConfiguraciones.VER_LOTES=='SI'){
        GlobalSelectedNoLote = '';
        getTblLotes();
        $("#modalRecetaLotes").modal('show');

    }else{
        GlobalSelectedNoLote = '';
        document.getElementById('txtOrdenesNoLote').value = '';
        document.getElementById('tab-orden-nueva').click();
    }

    
};

function getTblLotes(){
    let container = document.getElementById('tblLotes');
    container.innerHTML = GlobalLoader;

    let str = '';
    apigen.ordenes_lotes(GlobalCodSucursal)
    .then((data)=>{
        data.recordset.map((r)=>{
            str += `
            <tr>
                <td>${r.NOLOTE}</td>
                <td>${r.DESCRIPCION}</td>
                <td>${funciones.convertDateNormal(r.FECHA)}</td>
                <td>
                    <button class="btn btn-circle btn-info shadow hand" onclick="selectNoLote('${r.NOLOTE}','${r.DESCRIPCION}')">
                        <i class="fa fa-check"></i>
                    </button>
                </td>
            </tr>
            `

        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...';
    })


};

function selectNoLote(nolote,deslote){
    
    GlobalSelectedNoLote = nolote;
    $("#modalRecetaLotes").modal('hide');

    document.getElementById('txtOrdenesNoLote').value = GlobalSelectedNoLote;
    document.getElementById('tab-orden-nueva').click();

};


// RECETAS 


// PESAJE
function getTblPesaje(){
    let container = document.getElementById('tblProductosPesar');
    container.innerHTML = GlobalLoader;

        let strClassBtn ='';

        //apigen.productos_receta(GlobalCodSucursal,GlobalSelectedCodprod,GlobalSelectedCoddocEntrada,GlobalSelectedCorrelativoEntrada)
        apigen.productos_receta(GlobalCodSucursal,GlobalSelectedCodprod,GlobalSelectedCoddocSalida,GlobalSelectedCorrelativoSalida)
        .then((data)=>{
            let str = '';
            data.recordset.map((r)=>{
                if(r.PROD_UN_PESADAS.toString()=='0'){strClassBtn='btn-danger'}else{strClassBtn='btn-success'}
                str += `
                    <tr class="border-info border-left-0 border-top-0 border-right-0">
                        <td>${r.PCODPROD}</td>
                        <td>${r.DESPROD}</td>
                        <td>${r.PCODMEDIDA}
                            <br>
                            <small class="text-danger negrita">Exist: ${r.SALDOFINAL.toFixed(4)}</small>
                        </td>
                        <td>${r.PROD_UNIDADES}</td>
                        <td>${r.PROD_UN_PESADAS}</td>
                        <td>
                            <button class="btn ${strClassBtn} btn-lg btn-circle hand shadow" onclick="selectPeso('${r.ID}','${r.PCODPROD}','${r.DESPROD}','${r.PROD_UNIDADES}','${r.PROD_UN_PESADAS}')">
                                <i class="fal fa-calculator"></i>
                            </button>
                        </td>
                    </tr>
                `
            })
            container.innerHTML = str;
        })
        .catch((err)=>{
            container.innerHTML = 'No hay datos...'
        })
  
};

function selectPeso(id,codprod,desprod,pesoesperado,pesoactual){

        if(Number(pesoactual)==0){
        GlobalSelectedId = id;
        document.getElementById('lbPesajeDesprod').innerText = desprod;
        document.getElementById('txtPesajePesoEsperado').value = pesoesperado;
    
        boolObteniendoPeso = true;
    
        //$("#modalPesajeCantidad").modal('show');
        document.getElementById('tab-bascula').click();
    
        getTblPesosPesa('pesa1');
        getTblPesosPesa('pesa2');
    }else{
        funciones.AvisoError('Este insumo ya ha sido registrado');
    }

};

// PESAJE




// FUNCIONES VARIAS ------------------

function aplicaFiltroCards() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("filtroCards");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("tblRecetas");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
};