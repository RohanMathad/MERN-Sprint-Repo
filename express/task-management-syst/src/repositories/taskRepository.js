const Task = require('../models/taskModel');

const findAll = async () => {
    // Equivalent to: SELECT * FROM tasks ORDER BY created_at DESC
    return await Task.findAll({
        order: [['created_at', 'DESC']]
    });
};

const findById = async (id) => {
    // Equivalent to: SELECT * FROM tasks WHERE id = ?
    // findByPk stands for "Find by Primary Key"
    return await Task.findByPk(id);
};

const create = async (taskData) => {
    const { title, description } = taskData;
    // Equivalent to: INSERT INTO tasks (title, description) VALUES (?, ?)
    const newTask = await Task.create({ title, description });
    
    // Sequelize automatically returns the inserted object, so we just return its ID
    // to keep it compatible with our existing Service layer logic.
    return newTask.id;
};

const update = async (id, taskData) => {
    const { title, description, status } = taskData;
    // Equivalent to: UPDATE tasks SET title=?, description=?, status=? WHERE id=?
    const [affectedRows] = await Task.update(
        { title, description, status },
        { where: { id: id } }
    );
    return affectedRows;
};

const remove = async (id) => {
    // Equivalent to: DELETE FROM tasks WHERE id = ?
    // In Sequelize, delete is called 'destroy'
    const affectedRows = await Task.destroy({
        where: { id: id }
    });
    return affectedRows;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};