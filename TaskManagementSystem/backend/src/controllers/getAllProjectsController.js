import { Project } from '../models/index.js';

export default async (req, res) => {
    try {
        const projects = await Project.findAll({
            attributes: ['id', 'name', 'billing_budget']
        });
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
