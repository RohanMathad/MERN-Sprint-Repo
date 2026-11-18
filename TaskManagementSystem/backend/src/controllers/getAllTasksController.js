import { Task } from '../models/index.js';

export default async (req, res) => {
    try {
        const { role, project_id } = req.user;
        
        let queryOptions = {};

        if (role === 'user') {
            if (!project_id) {
                return res.status(403).json({ success: false, message: 'Access denied: You are not assigned to any project.' });
            }
            queryOptions = { where: { project_id } };
        } 
        else if (role === 'super_admin' && req.query.project_id) {
            queryOptions = { where: { project_id: req.query.project_id } };
        }

        const tasks = await Task.findAll(queryOptions);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};