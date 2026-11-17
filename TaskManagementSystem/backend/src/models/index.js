import Project from './projectModel.js';
import Task from './TaskModel.js';
import User from './userModel.js';

Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

Project.hasMany(User, { foreignKey: 'project_id', as: 'users' });
User.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

export { Project, Task, User };