const express = require('express');
const router = express.Router();
const accountController = require('../controller/AccountController');

const {
  getAllAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountByBC,
  getAccountByCustomerId,
  getAccountByBranchId,
  getTotalBalancebyBranch,
  getTotalBalancebyCustomer,
} = accountController;

// เรียง route ให้เอา exact path ขี้นก่อนแล้วค่อยไล่่ลงมา

router.get('/', getAllAccount);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.get('/customers/:id', getAccountByCustomerId);
router.get('/branchs/:id', getAccountByBranchId);
router.get('/:branchId/:customerId', getAccountByBC);
router.get('/branchbalances', getTotalBalancebyBranch);
router.get('/customerbalances', getTotalBalancebyCustomer);

module.exports = router;

// CRUD account
// Get account by customer
// Get account by branch
// get account by branch and customer
// get total balance on each branch
// get total baland on each customer
