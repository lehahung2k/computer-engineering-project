module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        passwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.INTEGER,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenantCode: { // Mã doanh nghiệp
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        companyName: {
            type: DataTypes.STRING,
        }
    }, 
    {
        tableName: 'Accounts',
    });

    return Account;
}
