module.exports = (sequelize, DataTypes) => {
    const Guests = sequelize.define("Guests", {
        guestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        guestCode: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        guestDescription: {
            type: DataTypes.STRING,
        },
        frontImg: {
            type: DataTypes.BLOB,
        },
        backImg: {
            type: DataTypes.BLOB,
        },
        identityType: {
            type: DataTypes.STRING
        }
    }, 
    {
        tableName: 'Guests',
        createdAt: false,
        updatedAt: false,
    });
    return Guests;
}
