module.exports = (sequelize, DataTypes) => {
  const Guests = sequelize.define(
    "Guests",
    {
      guestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      guestCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      guestDescription: {
        type: DataTypes.TEXT,
      },
      frontImg: {
        type: DataTypes.BLOB("long"),
      },
      backImg: {
        type: DataTypes.BLOB("long"),
      },
      identityType: {
        type: DataTypes.STRING,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "Guests",
      createdAt: false,
      updatedAt: false,
    }
  );
  return Guests;
};
