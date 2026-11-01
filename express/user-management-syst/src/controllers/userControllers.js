const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync')


let users = [
    {
        id : 1,
        name : 'Amit',
        role : 'Admin'
    }
]


const getUsers = catchAsync( async (req, res, next) => {
    res.status(200).json({success : true, data : users})
})

const createUser = catchAsync( async (req, res, next) => {
    
    const newUser  = {id : crypto.randomUUID(), ...req.body};
    users.push(newUser);
    
    res.status(200).json({success : true, data : newUser})
})

const updateUser = (req,res, next) => {
    const {id} = req.params;
    
    if(isNaN(id)){
        const error =  new Error(`Invaid user id : ${id}. Must be a number.`)
        error.statusCode = 400;

        return next(error)
    }

    res.status(200).json({success : true, message : `User ${id} updated!`})
}

const deleteUser = (req,res) => {
    const {id} = req.params;

    // delete user logic

    res.status(200).json({success : true, message : `User ${id} deleted!`})
}


module.exports =  {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};