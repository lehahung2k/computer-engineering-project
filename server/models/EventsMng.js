module.exports = (sequelize, DataTypes) => {
    const EventsMng = sequelize.define("EventsMng", {
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        event_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
        },
        end_date: {
            type: DataTypes.DATE,
        },
        start_time: {
            type: DataTypes.TIME,
        },
        end_time: {
            type: DataTypes.TIME,
        },
    }, 
    {
        tableName: 'events_mng',
        createdAt: false,
        updatedAt: false,
    });
    
    return EventsMng;
}
