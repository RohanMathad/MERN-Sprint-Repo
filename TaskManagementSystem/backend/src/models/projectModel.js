import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Project = sequelize.define('Project', {
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    billing_budget : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull : false,
        defaultValue : 0.00
    }
}, {
    tableName : 'projects',
    timestamps : true,
    createdAt : 'created_at',
    updatedAt : 'updated_at'
});

export default Project;
