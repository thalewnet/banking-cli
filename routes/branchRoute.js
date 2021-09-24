const express = require('express');
const branchController = require('../controller/branchController');
const router = express.Router();

const { getBranchAll, getBranchById, createBranch, editBranch, deleteBranch } =
  branchController;

router.get('/', getBranchAll);
router.get('/:id', getBranchById);
router.post('/', createBranch);
router.put('/:id', editBranch);
router.delete('/:id', deleteBranch);

module.exports = router;
