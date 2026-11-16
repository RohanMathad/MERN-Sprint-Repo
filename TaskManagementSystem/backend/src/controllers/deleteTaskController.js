import { Task } from '../models/index.js';

const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        const taskToDelete = await Task.findByPk(id);
        if (!taskToDelete) {
            return res.status(404).json({ success: false, message: 'Task doesnt exist!!' });
        }

        await Task.destroy({ where: { id } });

        return res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default deleteTaskController;
export { deleteTaskController };
