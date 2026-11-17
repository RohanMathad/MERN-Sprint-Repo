import { Project } from '../models/index.js';

export default async (req, res) => {
    try {
        const { id } = req.params;
        const { name, billing_budget } = req.body;
        
        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        project.name = name || project.name;
        project.billing_budget = billing_budget || project.billing_budget;
        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update project' });
    }
};
