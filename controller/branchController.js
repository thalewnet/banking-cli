const { Branch } = require('../models');

exports.getBranchAll = async (req, res, next) => {
  try {
    const result = await Branch.findAll({});
    res.status(200).json({ Branchs: result });
  } catch (err) {
    next(err);
  }
};
exports.getBranchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Branch.findAll({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({ Branch: result });
  } catch (err) {
    next(err);
  }
};
exports.createBranch = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCustomerObj = {
      name,
    };
    const result = await Branch.create(newCustomerObj);
    res.status(201).json({ Branch: result });
  } catch (err) {
    next(err);
  }
};
exports.editBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const oldData = await Branch.findOne({ where: { id } });
    const newBranchObj = {
      name: name ?? oldData.name,
    };
    const result = await Branch.update(newBranchObj, {
      where: { id },
    });
    res.status(201).json({ Branch: newBranchObj });
  } catch (err) {
    next(err);
  }
};

exports.deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Branch.destroy({ where: { id } });
    res.status(204).json({ message: 'Delete complete' });
  } catch (err) {
    next(err);
  }
};
