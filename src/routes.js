const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.delete('/categories/:id', CategoryController.delete);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);

module.exports = router;
