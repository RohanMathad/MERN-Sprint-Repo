const Task = require('./TaskModel');
const Project = require('./projectModel');

Project.hasMany(Task, {
    foreignKey : 'project_id',
    as : 'tasks'
});

Task.belongsTo(Project, {
    foreignKey : 'project_id',
    as : 'project'
});

module.exports = {
    Task,
    Project
}