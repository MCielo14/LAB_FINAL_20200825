const express = require('express');
const mysql = require('mysql2');

const app = express();
const path = require('path')

var cors = require('cors')
app.use(cors())

app.listen(3000,function (){
    console.log("corriendo en el puerto 3000")
})


let conn = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : 'root',
    database : 'bicicentro'
})

conn.connect(function (err){
    if(err) throw err;
    console.log("Conexión a base de datos ")
})

app.get('/trabajadores',function (req,res){
    conn.query("SELECT * FROM bicicentro.trabajadores",function (err,results){
        if(err) throw err;
        res.json(results)
    })
})
app.get("/trabajadores/:id",function (req,res){
    let idtrabajador = req.params.id;
    let sql = "SELECT trabajadores.nombres,trabajadores.apellidos,trabajadores.correo,trabajadores.dni,trabajadores.idsede,s.nombreSede FROM bicicentro.trabajadores inner join sedes s on trabajadores.idsede = s.idsede  where dni =?";
    let params = [idtrabajador];

    conn.query(sql,params,function (err,results){
        if(err) throw  err;
        res.json(results)
    })
})

app.get("/trabajadores/ventas/:id",function (req,res){
    let idtrabajador = req.params.id;
    let sql = "SELECT v.fecha as \"fecha\",i.nombre as \"nombre\",i.numeroserie as \"numeroserie\",m.nombre as \"marca\" from bicicentro.trabajadores left join ventas v on trabajadores.dni = v.dniTrabajador left join inventario i on v.id_inventario=i.idinventario left join marcas m on i.idmarca=m.idmarca where dni=?";
    let params = [idtrabajador];

    conn.query(sql,params,function (err,results){
        if(err) throw  err;
        res.json(results)
    })
})
app.get("/sedes",function (req,res){
    let sql = "SELECT * FROM bicicentro.sedes";

    conn.query(sql,function (err,results){
        if(err) throw  err;
        res.json(results)
    })
})
app.get("/sedes/:id",function (req,res){
    let sedeid = req.params.id;
    let sql = "SELECT * FROM bicicentro.sedes where idsede =?";
    let params = [sedeid];

    conn.query(sql,params,function (err,results){
        if(err) throw  err;
        res.json(results)
    })
})

app.get("/sedes/trabajadores/:id",function (req,res){
    let sedeid = req.params.id;
    let sql = "SELECT * FROM bicicentro.trabajadores where idsede =?";
    let params = [sedeid];

    conn.query(sql,params,function (err,results){
        if(err) throw  err;
        res.json(results)
    })
})




