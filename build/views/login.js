function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
     
            <div class="col-md-6 col-sm-12 col-lg-6 col-lx-6">
                <div class="row">
                    <div class="col-12">
                        <img src="./favicon.png" width="240" height="240">                                    
                    </div>    
                </div>
            </div>

            <div class="col-md-6 col-sm-12 col-lg-6 col-lx-6">
   
                <div class="card shadow p-2 card-rounded border-primary">
                    <h1>MÓDULO DE PRODUCCIÓN</h1>
                    <div class="card-body">
                        <form class="" id="frmLogin" autocomplete="off">
                            <div class="form-group">
                                <label class="negrita text-primary">Empresa:</label>
                                <select class="negrita form-control" id="cmbSucursal">
                                    
                                </select>
                                
                            </div>
                            <div class="form-group">
                                <label class="negrita text-primary">Usuario:</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-user"></i>
                                        </span>
                                    </div>
                                    <input class="form-control" type="text" id="txtUser" placeholder="Escriba su usuario" required="true">
                                </div>
                                
                            </div>

                            <div class="form-group">
                                <label class="negrita text-primary">Clave:</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-lock"></i>
                                        </span>
                                    </div>
                                    <input class="form-control" type="password" id="txtPass" placeholder="Escriba su contraseña" required="true">
                                </div>
                                        
                            </div>

                            <br>
                            <div class="form-group" align="right">
                                <button class="btn btn-primary btn-xl shadow btn-circle"  type="submit" id="btnIniciar">
                                    <i class="fal fa-unlock"></i>  
                                </button>
                            </div>

                           
                        </form>
                    </div>

                
    

                </div>
            </div>
     
            `
        }
    };

    root.innerHTML = view.login();
};



function addListeners(){
    
      
    let frmLogin = document.getElementById('frmLogin');
    let btnIniciar = document.getElementById('btnIniciar');
    frmLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
        
       
        btnIniciar.innerHTML = '<i class="fal fa-unlock fa-spin"></i>';
        btnIniciar.disabled = true;
        apigen.login(frmLogin.cmbSucursal.value,frmLogin.txtUser.value.trim(),frmLogin.txtPass.value.trim())
        .then(()=>{
            //classNavegar.inicio();    
        })
        .catch(()=>{
            btnIniciar.disabled = false;
            btnIniciar.innerHTML = '<i class="fal fa-unlock"></i>'
        });
    });

    //carga las sucursales directamente desde código
    document.getElementById('cmbSucursal').innerHTML = funciones.getComboSucursales();

  
};


function InicializarVista(){
   getView();
   addListeners();
    
   document.getElementById('btnPedidosPend').style ="visibility:hidden";

};




