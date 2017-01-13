var app = require('./index.js');


module.exports = {
	getUsers:getUsers,
	getVehicles:getVehicles,
	createUser:createUser,
	createVehicle:createVehicle,
	getVehicleCountForUser:getVehicleCountForUser,
	getVehiclesForUser:getVehiclesForUser,
	getVehiclesByQuery:getVehiclesByQuery,
	getNewerVehiclesSorted:getNewerVehiclesSorted,
	updateVehicleOwner:updateVehicleOwner,
	removeVehicleOwner:removeVehicleOwner,
	destroyVehicle:destroyVehicle
}

function getUsers(req,res,next) {
	var db = app.get('db');

	db.get_all_users(function(err, users) {
		if(!err) {
			res.status(200).send(users);
		} else {
			res.status(500).send(err);
		}
	})
}

function getVehicles(req,res,next) {
	var db = app.get('db');

	db.get_all_vehicles(function(err, vehicles) {
		if(!err) {
			res.status(200).send(vehicles);
		} else {
			res.status(500).send(err);
		}
	})
}

function createUser(req,res,next) {
	var db = app.get('db');

	db.users.insert(
		{
			firstname:req.body.user.firstname,
			lastname:req.body.user.lastname,
			email:req.body.user.email
		}, function(err, user) {
			if (!err) {
				res.status(200).send(user);
			} else {
				res.status(500).send(err);
			}
		}
	)
}

function createVehicle(req,res,next) {
	var db = app.get('db');

	db.vehicles.insert(
		{
			make:req.body.vehicle.make,
			model:req.body.vehicle.model,
			year: parseInt(req.body.vehicle.year),
			ownerid: parseInt(req.body.vehicle.ownerid)
		}, function(err, vehicle) {
			if (!err) {
				res.status(200).send(vehicle);
			} else {
				res.status(500).send(err);
			}
		}
	)
}

function getVehicleCountForUser(req,res,next) {
	var db = app.get('db');

	db.get_vehicle_count_for_user([req.params.userId], function(err, count) {
		if (!err) {
			res.status(200).send(count);
		} else {
			res.status(500).send(err);
		}
	})
}

function getVehiclesForUser(req,res,next) {
	var db = app.get('db');

	db.get_vehicles_by_user_id([req.params.userId], function(err, vehicles) {
		if (!err) {
			res.status(200).send(vehicles);
		} else {
			res.status(500).send(err);
		}
	})
}

function getVehiclesByQuery(req,res) {
	var db = app.get('db');

	if(!!req.query.email) {
		db.get_vehicles_by_email([req.query.email], function(err, vehicles) {
			if (!err) {
				res.status(200).send(vehicles);
			} else {
				res.status(500).send(err);
			}
		})
	} else if (!!req.query.userFirstStart) {	
		var queryString = req.query.userFirstStart + "%";
		db.get_vehicles_by_user_name([queryString], function(err, vehicles) {
			if (!err) {
				res.status(200).send(vehicles);
			} else {
				res.status(500).send(err);
			}
		})
	} else {
		res.status(501).send("Unacceptable Query Parameter Name");
	}
}

function getNewerVehiclesSorted(req,res) {
	var db = app.get('db');

	db.get_newer_vehicles_sorted(function(err, vehicles) {
		if (!err) {
			res.status(200).send(vehicles);
		} else {
			res.status(500).send(err);
		}
	})
}

function updateVehicleOwner(req,res) {
	var db = app.get('db');

	db.update_vehicle_owner([parseInt(req.params.userId),parseInt(req.params.vehicleId)], function(err, vehicle) {
		if (!err) {
			res.status(200).send();
		} else {
			res.status(500).send(err);
		}
	})
}

function removeVehicleOwner(req,res) {
	var db = app.get('db');

	db.remove_vehicle_owner([parseInt(req.params.userId),parseInt(req.params.vehicleId)], function(err, vehicle) {
		if (!err) {
			res.status(200).send();
		} else {
			res.status(500).send(err);
		}
	})
}

function destroyVehicle(req,res) {
	var db = app.get('db');

	db.destroy_vehicle([parseInt(req.params.vehicleId)], function(err, vehicle) {
		if (!err) {
			res.status(204).send("Vehicle Deleted");
		} else {
			res.status(500).send(err);
		}
	})
}