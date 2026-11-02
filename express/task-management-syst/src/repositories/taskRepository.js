const pool = require('../config/db');

/*
Ref.
mysql> CREATE TABLE IF NOT EXISTS tasks (
    ->   id INT AUTO_INCREMENT PRIMARY KEY,
    ->   title VARCHAR(255) NOT NULL,
    ->   description TEXT,
    ->   status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    ->   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ->   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -> );

*/

const findAll = async () => {
    const [rows] = await pool.execute(`
        SELECT * FROM tasks 
        ORDER BY 
        created_at DESC
        `);
    return rows;
};

const findById = async (id) => {
    const [rows] = await pool.execute(`
        SELECT * FROM tasks
        WHERE id = ?
        `, [id]);
    return rows[0];
};

const create  = async (taskData) => {
    const {title, description} = taskData;
    const [result] = await pool.execute(`
        INSERT INTO tasks (title, description)
        VALUES
        (?, ?)
        `, [title, description]);
    return result.insertId;
};


const update = async (id, taskData) => {
    const {title, description, status} = taskData;
    const [result] = await pool.execute(`
        UPDATE tasks 
        SET title = ?, description = ?, status = ?
        WHERE id = ?
        `, [title, description, status, id ]);
    
    return result.affectedRows;
};


const remove = async (id)=> {
    const [result] = await pool.execute(`
        DELETE FROM tasks
        WHERE id = ?
        `, [id]);

    return result.affectedRows;
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};