const { Customer } = require('../models');

exports.getCustomerAll = async (req, res, next) => {
  try {
    const result = await Customer.findAll({});
    res.status(200).json({ customers: result });
  } catch (err) {
    next(err);
  }
};
exports.getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Customer.findAll({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({ customer: result });
  } catch (err) {
    next(err);
  }
};
exports.createCustomer = async (req, res, next) => {
  try {
    const { firstname, lastname, gender, birthdate, address } = req.body;
    console.log(req.body);
    const newCustomerObj = {
      firstName: firstname,
      lastName: lastname,
      gender: gender ?? null,
      birthDate: new Date(birthdate) ?? null,
      address: address ?? null,
    };
    const result = await Customer.create(newCustomerObj);
    res.status(201).json({ customer: result });
  } catch (err) {
    next(err);
  }
};
exports.editCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, gender, birthdate, address } = req.body;
    const oldData = await Customer.findOne({ where: { id } });
    const updateObj = {
      firstName: firstname ?? oldData.firstName,
      lastName: lastname ?? oldData.lastName,
      gender: gender ?? oldData.gender,
      birthDate: new Date(birthdate) ?? oldData.birthDate,
      address: address ?? oldData.address,
    };
    const result = await Customer.update(updateObj, {
      where: { id },
    });
    res.status(201).json({ customer: updateObj });
  } catch (err) {
    next(err);
  }
};
exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Customer.destroy({ where: { id } });
    res.status(204).json({ message: 'Delete complete' });
  } catch (err) {
    next(err);
  }
};
