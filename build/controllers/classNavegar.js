let classNavegar = {
    login : async(historial)=>{
        divUsuario.innerText = 'DESCONECTADO';
        lbTipo.innerText = "Inicie sesión";
        rootMenu.innerHTML = '';
        GlobalCoddoc = '';
        GlobalCodUsuario=99999;
        GlobalUsuario = '';
        GlobalPassUsuario = '';
        GlobalTipoUsuario ='';
        
            funciones.loadScript('../views/login.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGIN';
                InicializarVista();
                rootMenuFooter.innerHTML = '<b class="text-white"></b>';
            })      
    },
    inicio: ()=>{
        funciones.loadScript('../views/inicio.js','root')
        .then(async()=>{
            GlobalSelectedForm='INICIO';
            initView();
            document.getElementById('btnConfiguraciones').style = "visibility:visible";
        })
    },
    phone: ()=>{
        funciones.loadScript('../views/phone.js','root')
        .then(async()=>{
            GlobalSelectedForm='PHONE';
            initView();
        })
    },
    config: ()=>{
        funciones.loadScript('../views/config.js','root')
        .then(async()=>{
            GlobalSelectedForm='CONFIG';
            initView();
        })
    }
}