let CarModel = require('../models/cars');

function sanitizeCarInput(input) {
  let car = { ...input };
  let numericFields = ['year', 'kilometers', 'doors', 'seats', 'price'];

  for (let field of numericFields) {
    if (car[field] === undefined || car[field] === null) {
      continue;
    }

    if (typeof car[field] === 'string') {
      let normalized = car[field].replace(/[^0-9.-]/g, '');
      if (normalized.length > 0) {
        car[field] = Number(normalized);
      }
    }
  }

  return car;
}

module.exports.getCar = async function (req, res, next) {
  try {
    // Find one using the id sent in the parameter of the request
    let car = await CarModel.findOne({ _id: req.params.carId });

    // Set the response status
    if (!car) {
      throw new Error('Car not found. Are you sure it exists?');
    }

    res.status(200);
    res.json(
      {
        success: true,
        message: "Car retrieved successfully.",
        data: car
      }
    );


  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    // Get input from the request
    let car = sanitizeCarInput(req.body);

    // Insert into the DB
    let result = await CarModel.create(car);
    console.log("Result: " + result);

    // Set the response status
    res.status(200);
    // Send a response
    res.json(
      {
        success: true,
        message: "Car created successfully.",
        data: result
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    // Get all from the DB.
    let list = await CarModel.find({});

    // Set the response status
    res.status(200);
    // Send a response
    res.json({
        success: true,
        message: "Car list retrieved successfully.",
        data: list
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    // Create a car object from the request body
    let updatedCar = sanitizeCarInput(req.body);
    
    // Change the _id to use the one received in the request parameters.
    updatedCar._id = req.params.carId;
    updatedCar.updated = Date.now();

    // Submit the change
    let result = await CarModel.updateOne({ _id: req.params.carId }, updatedCar);
    console.log("Result: " + result);

    // Handle the result: send a response.
    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Car updated successfully."
        }
      );
    } else {
      throw new Error('Car not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    // Delete  using the id received in the parameter of the request
    let result = await CarModel.deleteOne({ _id: req.params.carId });
    console.log("Result: " + result);

    // Handle the result and send a response
    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Car deleted successfully."
        }
      );
    } else {
      throw new Error('Car not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
