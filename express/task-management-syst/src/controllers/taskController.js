const taskService = require('../services/taskServices');

const getAllTasks = async (req, res) =>{
    try {
        const task = await taskService.getAllTasks();
        res.status(200).json({success : true, data: task});

    } catch (error) {
        res.status(error.statusCode || 500).json({success : false, message : error.message});
    }
}


const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.getTaskById(taskId); 
        res.status(200).json({success : true, message : task});
    } catch (error) {
        res.status(error.statusCode || 500).json({success : false, message : error.message});
    }
}


const createTask = async (req,res ) =>{
    try {
        const tsakData = req.body;
        const newTask = await taskService.createTask(tsakData);
        res.status(201).json({success : true, data : newTask});
    } catch (error) {
        res.status(error.statusCode || 500).json({ success : false, message : error.message});
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updatedTask = await taskService.updateTask(taskId, taskData);
        res.status(200).json({status : true, data : updatedTask});
    } catch (error) {
        res.status(error.statusCode || 500).json({ success : false, message : error.message});
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await taskService.deleteTask(taskId);
        res.status(200).json({status : true, data : deletedTask})
    } catch (error) {
        res.status(error.statusCode || 500).json({success : false, message : error.message});
    }
}


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}