module.exports = (sequelize, DataTypes) => {
  const EventsMng = sequelize.define(
    "EventsMng",
    {
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      eventCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenantCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Tenants",
          key: "tenantCode",
        },
      },
      // isActivate: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      eventDescription: {
        type: DataTypes.TEXT,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventImg: {
        type: DataTypes.BLOB("long"),
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "EventsMng",
      createdAt: false,
      updatedAt: false,
    },
    {
      associate: function (db) {
        EventsMng.belongsTo(db.Tenants, {
          foreignKey: "tenantCode",
          targetKey: "tenantCode",
        });
        EventsMng.hasMany(db.PointOfCheckins, {
          foreignKey: "eventCode",
          sourceKey: "eventCode",
        });
      },
    }
  );

  return EventsMng;
};
