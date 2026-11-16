import { Task } from '../models/index.js';

const createTaskController = async (req, res) => {
    try {
        const { title, description, status, due_date, project_id } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ success: false, message: 'Task title is required.' });
        }

        const newTask = await Task.create({
            title: title.trim(),
            description,
            status,
            due_date,
            project_id
        });

        return res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default createTaskController;
export { createTaskController };
