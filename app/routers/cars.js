var express = require('express');
var router = express.Router();

var carsController = require('../controllers/cars');

router.get('/', carsController.getAll);
router.post('/', carsController.create);
router.get('/:carId', carsController.getCar);
router.put('/:id', carsController.update);
router.delete('/:id', carsController.remove);

module.exports = router;