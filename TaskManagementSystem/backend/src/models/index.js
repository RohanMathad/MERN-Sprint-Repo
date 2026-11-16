import Task from "./TaskModel.js";
import Project from './projectModel.js'


Project.hasMany(Task, {
    foreignKey : 'project_id',
    as : 'tasks'
});

Task.belongsTo(Project, {
    foreignKey : 'project_id',
    as : 'project'
});

export {
    Task,
    Project
}