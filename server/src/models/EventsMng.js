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
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        eventImg: {
            type: DataTypes.BLOB
        }
    }, 
    {
        tableName: 'EventsMng',
        createdAt: false,
        updatedAt: false,
    });
    
    return EventsMng;
}
