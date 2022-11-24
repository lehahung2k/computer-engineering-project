module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define("Transactions", {
        tranId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pointCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guestCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createTime: {
            type: DataTypes.TIME,
        },
        note: {
            type: DataTypes.STRING,
        }
    }, 
    {
        tableName: 'Transactions',
        createdAt: false,
        updatedAt: false,
    });
    return Transactions;
}
