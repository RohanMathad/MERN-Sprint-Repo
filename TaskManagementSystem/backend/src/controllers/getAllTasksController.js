import { Task } from '../models/index.js';

const getAllTasksController = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            order: [['created_at', 'DESC']]
        });
        return res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default getAllTasksController;
export { getAllTasksController };
