module.exports = (sequelize, DataTypes) => {
  const PointOfCheckins = sequelize.define(
    "PointCheckins",
    {
      pointId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pointCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pointName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pointNote: {
        type: DataTypes.TEXT,
      },
      eventCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "PointOfCheckin",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        PointOfCheckins.hasMany(db.Transactions, {
          foreignKey: "pointCode",
        });
        PointOfCheckins.belongsTo(db.Accounts);
        PointOfCheckins.belongsTo(db.EventsMng);
      },
    }
  );

  return PointOfCheckins;
};
