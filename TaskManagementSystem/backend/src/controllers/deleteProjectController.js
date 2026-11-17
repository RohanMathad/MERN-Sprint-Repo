import { Project } from '../models/index.js';

export default async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        await project.destroy();
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete project' });
    }
};
