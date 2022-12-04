module.exports = (sequelize, DataTypes) => {
  const PointOfCheckins = sequelize.define(
    "PointOfCheckins",
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
        primaryKey: true,
        unique: true,
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
        references: {
          model: "EventsMng",
          key: "eventCode",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Accounts",
          key: "username",
        },
      },
    },
    {
      tableName: "PointOfCheckins",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        PointOfCheckins.hasMany(db.Transactions, {
          foreignKey: "pointCode",
          sourceKey: "pointCode",
        });
        PointOfCheckins.belongsTo(db.Accounts, {
          foreignKey: "username",
          targetKey: "username",
        });
        PointOfCheckins.belongsTo(db.EventsMng, {
          foreignKey: "eventCode",
          targetKey: "eventCode",
        });
      },
    }
  );

  return PointOfCheckins;
};
