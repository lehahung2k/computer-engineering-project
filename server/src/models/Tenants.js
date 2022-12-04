module.exports = (sequelize, DataTypes) => {
  const Tenants = sequelize.define(
    "Tenants",
    {
      tenantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tenantCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      tenantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenantAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
      },
      contactName: {
        type: DataTypes.STRING,
      },
      contactPhone: {
        type: DataTypes.STRING,
      },
      contactEmail: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Tenants",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        Tenants.hasMany(db.EventsMng, {
          foreignKey: "tenantCode",
          sourceKey: "tenantCode",
        });
        Tenants.hasMany(db.Accounts, {
          foreignKey: "tenantCode",
          sourceKey: "tenantCode",
        });
      },
    }
  );
  return Tenants;
};
