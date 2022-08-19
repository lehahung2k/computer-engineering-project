module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define("Transactions", {
        tran_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_time: {
            type: DataTypes.TIME,
        },
        note: {
            type: DataTypes.STRING,
        }
    }, 
    {
        tableName: 'transactions',
        createdAt: false,
        updatedAt: false,
    });
    return Transactions;
}
