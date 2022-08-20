module.exports = (sequelize, DataTypes) => {
    const PointCheckin = sequelize.define("PointCheckin", {
        point_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        point_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        tableName: 'point_checkin',
        createdAt: false,
        updatedAt: false,
    });
    return PointCheckin;
}
