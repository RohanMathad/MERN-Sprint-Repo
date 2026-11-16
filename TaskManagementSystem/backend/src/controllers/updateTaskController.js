import { Task } from '../models/index.js';

const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, due_date, project_id } = req.body;

        const existingTask = await Task.findByPk(id);
        if (!existingTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (!title || title.trim() === '') {
            return res.status(400).json({ success: false, message: 'Task title is required' });
        }

        await Task.update(
            {
                title: title.trim(),
                description,
                status,
                due_date,
                project_id
            },
            { where: { id } }
        );

        const updatedTask = await Task.findByPk(id);

        return res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default updateTaskController;
export { updateTaskController };
