let config_clave = 'EDDYMORENO';
let config_url_servicio_basculas = 'http://192.168.0.135:7000';

let config_valor_permitido_mas = 0.02;
let config_valor_permitido_menos = -0.02;

let dataEmpresas = [ 
    {codsucursal:"8206609-4",nomsucursal:"ANIMAL FOODS S.A."}
  ];

let json_basculas = [
    {CODIGO:"B1",PUERTO:'COM3',NOMBRE:'BASCULA KG 1',TIPO:"KG",HABILITADA:'SI'},
    {CODIGO:"B2",PUERTO:'COM4',NOMBRE:'BASCULA KG 2',TIPO:"KG",HABILITADA:'SI'},
    {CODIGO:"B3",PUERTO:'COM5',NOMBRE:'BASCULA GRAMOS 1',TIPO:"GR",HABILITADA:'SI'},
    {CODIGO:"B4",PUERTO:'COM6',NOMBRE:'BASCULA KG 4',TIPO:"KG",HABILITADA:'NO'},
    {CODIGO:"B5",PUERTO:'COM7',NOMBRE:'BASCULA KG 5',TIPO:"KG",HABILITADA:'NO'}
]