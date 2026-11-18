import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        defaultValue: 'pending'
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'CheckCircle',
    },
}, {
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Task;
