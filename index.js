var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var config      = require('./config.js');
//Need to enter username and password for your database
var connString = "postgres://postgres:" + config.pglogin + "@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());


//Import database controller
//var dbController = require('./dbController.js');


//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
    
    // db.user_create_seed(function(){
    //    console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //    console.log("Vehicle Table Init")
    // });


    var dbController = require('./dbController.js');
    //END POINTS

    app.get('/api/users', dbController.getUsers);
    app.get('/api/vehicles', dbController.getVehicles);
    app.post('/api/users', dbController.createUser);
    app.post('/api/vehicles', dbController.createVehicle);
    
    app.get('/api/user/:userId/vehiclecount', dbController.getVehicleCountForUser);
    app.get('/api/user/:userId/vehicle', dbController.getVehiclesForUser);
    app.get('/api/vehicle/', dbController.getVehiclesByQuery);
    
    app.get('/api/newervehiclesbyyear', dbController.getNewerVehiclesSorted)
    app.put('/api/vehicle/:vehicleId/user/:userId', dbController.updateVehicleOwner);
    app.delete('/api/user/:userId/vehicle/:vehicleId', dbController.removeVehicleOwner);
    app.delete('/api/vehicle/:vehicleId', dbController.destroyVehicle);
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
