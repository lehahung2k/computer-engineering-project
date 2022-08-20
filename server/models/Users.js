module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.INTEGER,
        },
        create_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.TIME,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, 
    {
        tableName: 'users',
        createdAt: false,
        updatedAt: false,
    });
    return Users;
}
