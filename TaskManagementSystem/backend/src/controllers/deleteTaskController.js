import { Task } from '../models/index.js';

export default async (req, res) => {
    try {
        const { id } = req.params;
        const { role, project_id: userProjectId } = req.user;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (role === 'user' && task.project_id !== userProjectId) {
            return res.status(403).json({ 
                success: false, 
                message: 'Forbidden: You can only delete tasks within your assigned project.' 
            });
        }

        await task.destroy();

        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};