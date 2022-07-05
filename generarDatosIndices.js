var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

const client = new MongoClient(url);

var generarFecha = function(annio)
{
    annio = Math.floor((Math.random() * 2) + 2020);
    dia = Math.floor((Math.random() * 30) + 1);
    mes = Math.floor((Math.random() * 12) + 1);
    
    return new Date(annio, mes, dia, 0, 0);
}

var obtenerCliente = function()
{
    var listadoClientes = [{ID:"1001",NOMBRE:"MARIA CASTRO"}, {ID:"1002",NOMBRE:"ROBERTO SANTANA"}, {ID:"1003",NOMBRE:"MARIO RAMIREZ"},
                           {ID:"1004",NOMBRE:"ALEXANDRA VASQUEZ"},{ID:"1005",NOMBRE:"JOSE RAMON RAMIREZ"}, {ID:"1006",NOMBRE:"CARME GUTIERREZ"},
                           {ID:"1007",NOMBRE:"ANGELA RODRIGUEZ"}, {ID:"1008",NOMBRE:"MANUEL CEPEDA"}, {ID:"1009",NOMBRE:"FRANCISCO PEREZ"},
                           {ID:"1010",NOMBRE:"OLIVER RODRIGUEZ"}]
    
    indice = Math.floor((Math.random() * 10) )
    return listadoClientes[indice];
}

var obtenerCiudad = function()
{
    listadoCiudad = ["SANTIAGO", "MOCA", "LA VEGA", "SANTO DOMINGO", "DAJABON", "MONTECRISTI", "HIGUEY", "MAO VALVERDE"];
    
    indice = Math.floor((Math.random() * 8) );
    return listadoCiudad[indice];
}

var obtenerProducto = function()
{
    listadoProducto = [{ID:"11",DESCRIPCION:"PRODUCTO 11",PRECIO:14.00}, {ID:"14",DESCRIPCION:"PRODUCTO 14",PRECIO:10.00},
                       {ID:"42",DESCRIPCION:"PRODUCTO 42",PRECIO:9.80},{ID:"72",DESCRIPCION:"PRODUCTO 72",PRECIO:34.80},
                       {ID:"51",DESCRIPCION:"PRODUCTO 51",PRECIO:42.40},{ID:"41",DESCRIPCION:"PRODUCTO 41",PRECIO:7.70},
                       {ID:"65",DESCRIPCION:"PRODUCTO 65",PRECIO:16.80},{ID:"20",DESCRIPCION:"PRODUCTO 20",PRECIO:64.80},
                       {ID:"33",DESCRIPCION:"PRODUCTO 33",PRECIO:150.00},{ID:"60",DESCRIPCION:"PRODUCTO 60",PRECIO:27.20},
                       {ID:"39",DESCRIPCION:"PRODUCTO 39",PRECIO:14.40},{ID:"49",DESCRIPCION:"PRODUCTO 49",PRECIO:16.00}];
    indice = Math.floor((Math.random() * 12) );
    return listadoProducto[indice];          
}

var obtenerSucursal = function()
{
    listadoSucursal = ["SUCURSAL SANTIAGO", "SUCURSAL SANTO DOMINGO"];
    indice = Math.floor((Math.random() * 2));
    return listadoSucursal[indice]; 
}
/*db.loadServerScripts();*/
var obtenerArticulos = function(){
    var lista = []
    const cantidadProductos = Math.floor((Math.random() * 6) + 2);
    var aux;
    var total = 0
    for(let i = 0; i < cantidadProductos; i++){
        aux = Math.floor((Math.random() * 15) + 1);
        productoAux = obtenerProducto.apply()
        var producto = {codigoProducto:productoAux["ID"],descripcion:productoAux["DESCRIPCION"],precioVenta:productoAux["PRECIO"],cantidadFacturada:aux,importe:productoAux["PRECIO"] * aux}
        total+= aux*productoAux["PRECIO"]
        lista.push(producto)
    }
    return {productos:lista, total:total}
}
                        
async function main(){
    var cliente = obtenerCliente.apply()
    var productos =  obtenerArticulos.apply()
    var document
    for(let i = 0; i < 50000; i++){
        cliente = obtenerCliente.apply()
        productos =  obtenerArticulos.apply()
        document ={
            codigoFactura: i ,
            sucursal: obtenerSucursal.apply(),
            codigoCliente:cliente["ID"],
            fechaFactura: generarFecha.apply(),
            nombreCliente:cliente["NOMBRE"],
            ciudadFactura: obtenerCiudad.apply(),
            ciudadDespacho: obtenerCiudad.apply(),
            totalFactura: productos["total"],
            articulos: productos["productos"]
        }
        await insert(document)
        
    }
}       
async function insert(document){
    try {
        await client.connect();
        const database = client.db("indices_db");
        const haiku = database.collection("facturas");

        var cliente = obtenerCliente.apply()
        var productos =  obtenerArticulos.apply()
        var document;
        var result
        for(let i = 0; i < 700000; i++){
            cliente = obtenerCliente.apply()
            productos =  obtenerArticulos.apply()
            document ={
                codigoFactura: i ,
                sucursal: obtenerSucursal.apply(),
                codigoCliente:cliente["ID"],
                fechaFactura: generarFecha.apply(),
                nombreCliente:cliente["NOMBRE"],
                ciudadFactura: obtenerCiudad.apply(),
                ciudadDespacho: obtenerCiudad.apply(),
                totalFactura: productos["total"],
                articulos: productos["productos"]
            }
            result = await haiku.insertOne(document);
            
        }


      } finally {
        await client.close();
      }
}
insert()            