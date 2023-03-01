function getView(){
    let view = {
        body: ()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body">
                    <img width="100px" height="100px" src="./favicon.png">
                    <hr class="solid">
                    <div class="form-group">
                        <label class="negrita text-info">Peso báscula KG</label>
                        <input type="number" style="font-size:120%" class="negrita form-control text-info border-info" id="txtPesoKg" disabled="true">
                    </div>
                    <hr class="solid">
                    <hr class="solid">
                    <div class="form-group">
                        <label class="negrita text-secondary">Peso báscula MG</label>
                        <input type="number" style="font-size:120%" class="form-control negrita text-secondary border-secondary" id="txtPesoMg" disabled="true">
                    </div>
                    <hr class="solid">
                    <button class="btn btn-danger btn-circle btn-xl hand shadow" id="btnReiniciarBasculas">
                        <i class="fal fa-sync"></i>
                    </button>

                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.body();

};

function addListeners(){
    
    boolObteniendoPeso = true;

    document.getElementById("btnReiniciarBasculas").addEventListener("click", ()=>{
        funciones.Confirmacion('¿Está seguro que desea reiniciar las basculas?')
        .then((value)=>{
            if(value==true){

                apigen.config_reiniciar_basculas()
                .then(()=>{
                    funciones.Aviso('Se ha dado la orden de reiniciar las basculas');
                })
            }
        });
        


    });
    
};

function initView(){
    getView();
    addListeners();
};  