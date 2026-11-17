import { Task } from '../models/index.js';

export default async (req, res) => {
    try {
        const { role, project_id: userProjectId } = req.user;
        
        // Note: We also added 'icon' here since we updated the database in Step 1!
        const { title, description, status, due_date, icon, project_id: bodyProjectId } = req.body;

        // Security check: Determine which project ID to use
        let finalProjectId;
        
        if (role === 'super_admin') {
            // Admins manage multiple projects, so they pass the ID in the body
            finalProjectId = bodyProjectId;
            if (!finalProjectId) {
                return res.status(400).json({ success: false, message: 'Super admin must provide a project_id.' });
            }
        } else {
            // Standard users cannot override the project_id. We force it to their assigned project.
            finalProjectId = userProjectId;
            if (!finalProjectId) {
                return res.status(403).json({ success: false, message: 'Cannot create task: You are not assigned to a project.' });
            }
        }

        const newTask = await Task.create({
            title,
            description,
            status: status || 'pending',
            due_date,
            icon: icon || 'CheckCircle', // Default icon if none is provided
            project_id: finalProjectId
        });

        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};