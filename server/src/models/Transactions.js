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
    },
    {
      tableName: "Transactions",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        Transactions.belongsTo(db.PointOfCheckins);
      },
    }
  );
  return Transactions;
};
