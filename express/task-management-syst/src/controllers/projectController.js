const {Project, Task} = require('../models');

exports.getProjectBilling = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findByPk(projectId, {
            include : [
                {
                    model : Task,
                    as : 'tasks',
                    attributes: ['id', 'title', 'description', 'status', 'due_date', 'project_id']
                }
            ]
        });


        if(!project){
            return res.status(404).json({success : false, message : 'Project not found'});
        }

        res.status(200).json({
            success : true,
            data : project
        });

    } catch (error) {
        console.error(error);
       res.status(500).json({ success: false, message: error.message }); 
    }
}      
