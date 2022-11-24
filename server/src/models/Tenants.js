module.exports = (sequelize, DataTypes) => {
    const Tenant = sequelize.define("Tenant", {
        tenantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tenantCode: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tenantAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING
        },
        contactName: {
            type: DataTypes.STRING,
        },
        contactPhone: {
            type: DataTypes.STRING,
        },
        contactEmail: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'Tenants',
        createdAt: false,
        updatedAt: false
    });
    return Tenant;
}