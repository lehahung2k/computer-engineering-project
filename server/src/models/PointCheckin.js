module.exports = (sequelize, DataTypes) => {
    const PointCheckin = sequelize.define("PointCheckin", {
        pointId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            type: DataTypes.STRING
        },
        eventCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        tableName: 'PointOfCheckin',
        createdAt: false,
        updatedAt: false,
    });

    return PointCheckin;
}
