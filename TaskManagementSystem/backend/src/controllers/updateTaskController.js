import { Task } from '../models/index.js';

export default async (req, res) => {
    try {
        const { id } = req.params;
        const { role, project_id: userProjectId } = req.user;
        const { title, description, status, due_date, icon } = req.body;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (role === 'user' && task.project_id !== userProjectId) {
            return res.status(403).json({ 
                success: false, 
                message: 'Forbidden: You can only update tasks within your assigned project.' 
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.due_date = due_date || task.due_date;
        task.icon = icon || task.icon;

        await task.save();

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};