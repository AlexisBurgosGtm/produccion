const DbName = "basculas2";

var tblPesa1 = {
    name: 'pesa1',
    columns: {
        ID:{ primaryKey: true, autoIncrement: true },
        BASCULA:{dataType: "string"},
        HORA:{dataType: "string"},
        PESO:{dataType: "number"}
    }
};

var tblPesa2 = {
    name: 'pesa2',
    columns: {
        ID:{ primaryKey: true, autoIncrement: true },
        BASCULA:{dataType: "string"},
        HORA:{dataType: "string"},
        PESO:{dataType: "number"}
    }
};

var tblPesa3 = {
    name: 'pesa3',
    columns: {
        ID:{ primaryKey: true, autoIncrement: true },
        BASCULA:{dataType: "string"},
        HORA:{dataType: "string"},
        PESO:{dataType: "number"}
    }
};




var database = {
    name: DbName,
    tables: [tblPesa1, tblPesa2, tblPesa3]
};
 
// initiate jsstore connection
var connection = new JsStore.Connection();

async function connectDb(){
        var isDbCreated = await connection.initDb(database);
        // isDbCreated will be true when database will be initiated for first time
        if(isDbCreated){
            console.log('Db Created & connection is opened');          
        }
        else{
            console.log('Connection is opened');
        }
}
//inicia la conexión a la db
connectDb();