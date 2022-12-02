module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define(
    "Accounts",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      passwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.INTEGER,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenantCode: {
        // Mã doanh nghiệp
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Accounts",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        Accounts.belongsTo(db.Tenants);
        Accounts.hasMany(db.PointCheckins, {
          foreignKey: "username",
        });
      },
    }
  );

  return Accounts;
};
