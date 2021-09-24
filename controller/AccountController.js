const {
  Account,
  Customer,
  Branch,
  Sequelize,
  sequelize,
} = require('../models');

exports.getAllAccount = async (req, res, next) => {
  const result = await Account.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Customer,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      },
      {
        model: Branch,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      },
    ],
  });
  res.status(200).json({ Accounts: result });
};

exports.createAccount = async (req, res, next) => {
  const { openDate, closeDate, balance, status, customerId, branchId } =
    req.body;

  const newAccountObj = {
    openDate,
    closeDate: closeDate ?? null,
    balance,
    status,
    customerId,
    branchId,
  };
  const result = await Account.create(newAccountObj);
  res.status(201).json({ Account: result });
};

exports.updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const { closeDate, balance, status } = req.body;
  const oldData = await Account.findOne({
    where: { id },
  });

  const updateAccount = { ...oldData.toJSON(), closeDate, balance, status };

  await Account.update(updateAccount, { where: { id } });
  res.status(201).json({ Account: updateAccount });
};
exports.deleteAccount = async (req, res, next) => {
  const { id } = req.params;
  await Account.destroy({ where: { id } });
  res.status(204).json();
};
exports.getAccountByBranchId = async (req, res, next) => {
  const { id } = req.params;
  const result = await Account.findAll({
    where: {
      '$Branch.id$': id,
    },
    include: [
      {
        model: Customer,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      { model: Branch, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  res.status(200).json({ Accounts: result });
};
exports.getAccountByCustomerId = async (req, res, next) => {
  const { id } = req.params;

  const result = await Account.findAll({
    where: {
      '$Customer.id$': id,
    },
    include: [
      {
        model: Customer,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      { model: Branch, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  res.status(200).json({ Accounts: result });
};
exports.getAccountByBC = async (req, res, next) => {
  console.log('BCcvcvcvcvcv');
  const { branchId, customerId } = req.params;
  const result = await Account.findAll({
    where: {
      '$Branch.id$': branchId,
      '$Customer.id$': customerId,
    },
    include: [
      {
        model: Customer,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      { model: Branch, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  res.status(200).json({ Accounts: result });
};

exports.getTotalBalancebyBranch = async (req, res, next) => {
  const result = await Account.findAll({
    attributes: [
      'branchId',
      [Sequelize.fn('SUM', Sequelize.col('balance')), 'Total'],
    ],
    group: 'branchId',
    include: Customer,
  });
  res.status(200).json({ Total: result });
};

exports.getTotalBalancebyCustomer = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await Account.findAll({
    attributes: [
      'customerId',
      [Sequelize.fn('SUM', Sequelize.col('balance')), 'Total'],
    ],
    group: 'customerId',
    include: Customer,
  });

  //   const result = await Account.findOne({
  //     where: { '$Customer.id$': id },
  //     attributes: [
  //       'branchId',
  //       [Sequelize.fn('SUM', Sequelize.col('balance')), 'Total'],
  //     ],
  //     group: 'customerId',
  //     include: Customer,
  //   });
  res.status(200).json({ Total: result });
};
