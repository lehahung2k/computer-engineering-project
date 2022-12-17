module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    "Transactions",
    {
      tranId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pointCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "PointOfCheckins",
          key: "pointCode",
        },
      },
      guestCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createTime: {
        type: DataTypes.DATE,
      },
      note: {
        type: DataTypes.TEXT,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "Transactions",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        Transactions.belongsTo(db.PointOfCheckins, {
          foreignKey: "pointCode",
          targetKey: "pointCode",
        });
      },
    }
  );
  return Transactions;
};
