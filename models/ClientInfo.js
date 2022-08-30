module.exports = (sequelize, DataTypes) => {
    const ClientInfo = sequelize.define("ClientInfo", {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        client_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_img_f: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        client_img_b: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    }, 
    {
        tableName: 'client_info',
        createdAt: false,
        updatedAt: false,
    });
    return ClientInfo;
}
