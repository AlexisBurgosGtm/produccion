const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

var api  = require('./router/api');
var execute = require('./router/connection');


app.use(bodyParser.json());
app.use(express.static('build'));

var path = __dirname + '/'

router.use(function (req,res,next) {
    
    next();
});


app.get("/",function(req,res){
    res.sendFile(path + 'index.html');
}); 

app.post("/reiniciar_basculas",function(req,res){
    
    getConfigBasculas();

    res.send('reiniciando basculas');
}); 

app.use('/api', api);


app.use("/",router);


app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});

io.sockets.on('connection', function(socket){
    socket.on('peso', function(peso){
        //io.sockets.emit('peso',peso)
    });

    socket.on('disconnected', function(){
        console.log('disconnected');
    });
});

function handlePeso(data,nombrebascula){
    //console.log(data)
    io.sockets.emit('peso', data.toString(), nombrebascula);
    
};


http.listen(PORT, function(){
    console.log('Servidor web iniciado en puerto:' + PORT);
});


function getConfigBasculas(){

    console.log('Iniciando básculas...');
     
    var puertoBascula1 = 'COM4'; var baudR1 = Number(9600); //KG
    var puertoBascula2 = 'COM3'; var baudR2 = Number(9600); //MG
    

    //SE CREA LA BASCULA 1
    const bascula1 = new SerialPort({
        path: puertoBascula1,
        baudRate: baudR1
    }, function (err) {
        if (err) {
            return console.log('Error: ', err.message);
        }
    });
    bascula1.on('open',function(){
        console.log('puerto de báscula abierto: ' + puertoBascula2);

        const parser = bascula1.pipe(new ReadlineParser({ delimiter: '\r' }))
        parser.on('data', data => handlePeso(data, "KG"));
    });


    //SE CREA LA BASCULA 2
    const bascula2 = new SerialPort({
        path: puertoBascula2,
        baudRate: baudR2
    }, function (err) {
        if (err) {
            return console.log('Error: ', err.message);
        }
    });
    bascula2.on('open',function(){
        console.log('puerto de báscula abierto: ' + puertoBascula2);

        const parser2 = bascula2.pipe(new ReadlineParser({ delimiter: '\r' }))
        parser2.on('data', data => handlePeso(data, "MG"));
    });


};

getConfigBasculas();