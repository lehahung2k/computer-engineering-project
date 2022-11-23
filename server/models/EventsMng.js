module.exports = (sequelize, DataTypes) => {
    const EventsMng = sequelize.define("EventsMng", {
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        eventCode: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActivate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eventDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
        },
        startTime: {
            type: DataTypes.TIME,
        },
        endTime: {
            type: DataTypes.TIME,
        },
    }, 
    {
        tableName: 'eventsMng',
        createdAt: false,
        updatedAt: false,
    });
    
    return EventsMng;
}
