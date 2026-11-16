import { Task } from '../models/index.js';

const getTaskByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        return res.status(200).json({ success: true, data: task });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default getTaskByIdController;
export { getTaskByIdController };
