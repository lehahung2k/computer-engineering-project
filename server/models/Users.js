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
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, 
    {
        tableName: 'users',
    });

    return Users;
}
