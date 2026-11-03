const taskRepository = require('../repositories/taskRepository')

const getAllTasks = async () => {
    return await taskRepository.findAll();
}

const getTaskById = async (id) => {
    const task = await taskRepository.findById(id);
    
    if(!task){
        const error = new Error('Task not found');
        error.statusCode = 404;
        throw error;
    }

    return task;
}

const createTask = async (taskData) => {

    if(!taskData.title || taskData.title.trim() === ''){
        const error = new Erorr('Task title is required.')
        erorr.statusCode = 400;
        throw error
    };

    const newTaskId = await taskRepository.create(taskData);

    
    return await taskRepository.findById(newTaskId);
}

const updateTask = async (id, taskData) => {

    const existingTask = await taskRepository.findById(id);
    if (!existingTask) {
        const error = new Error('Task not found');
        error.statusCode = 404;
        throw error;
    }

    if (!taskData.title || taskData.title.trim() === '') {
        const error = new Error('Task title is required');
        error.statusCode = 400;
        throw error;
    }

    await taskRepository.update(id, taskData);

    return await taskRepository.findById(id);

}

const deleteTask = async (id) => {

    const taskToDelete = await taskRepository.findById(id);
    if(!taskToDelete){
        const error = new Error('Task doesnt exist!!');
        error.statusCode = 404;
        throw error;
    }

    await taskRepository.remove(id);
    return { message: 'Task deleted successfully'};
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}



