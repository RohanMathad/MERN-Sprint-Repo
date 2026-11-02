const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync')


let users = [
    {
        id : "1", //crypto.randomUUID(),
        name : 'Amit',
        role : 'Admin'
    }
]


const getUsers = catchAsync( async (req, res, next) => {
    res.status(200).json({success : true, data : users})
})

const createUser = catchAsync( async (req, res, next) => {

    if(!req.body.name || !req.body.role){
        const error = new Error('Please provide name and role both.');
        error.statusCode = 400;
        return next(error);
    }

    const newUser  = {id : crypto.randomUUID(), ...req.body};
    users.push(newUser);
    
    res.status(201).json({success : true, data : newUser})
})

const updateUser = (req,res, next) => {
    const {id} = req.params;
    const userIndex = users.findIndex(user => user.id === id);


    if(userIndex === -1){
        const error = new Error(`user with id ${id} not found!`);
        error.statusCode = 404;
        return next(error);
    }

    users[userIndex] = {...users[userIndex], ...req.body};
    

    res.status(200).json({success : true, message : `User ${id} updated!`})
}

const deleteUser = (req,res) => {
    const {id} = req.params;
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        const error = new Error(`user with id ${id} not found!`);
        error.statusCode = 404;
        return next(error);
    }

    users = users.filter(user => user.id !== id);

    res.status(200).json({success : true, message : `User ${id} deleted!`})
}


module.exports =  {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};