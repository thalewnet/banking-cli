module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: DataTypes.ENUM('MALE', 'FEMALE'),
      birthDate: DataTypes.DATEONLY,
      address: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  Customer.associate = (models) => {
    Customer.hasMany(models.Account, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Customer;
};
