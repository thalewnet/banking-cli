const express = require('express');
const customerController = require('../controller/customerController');
const router = express.Router();

const {
  getCustomerAll,
  getCustomerById,
  createCustomer,
  editCustomer,
  deleteCustomer,
} = customerController;

router.get('/', getCustomerAll);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', editCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
