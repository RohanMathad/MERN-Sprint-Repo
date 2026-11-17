import { Project } from '../models/index.js';

export default async (req, res) => {
    try {
        const { name, billing_budget } = req.body;
        const newProject = await Project.create({ name, billing_budget });
        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create project' });
    }
};
