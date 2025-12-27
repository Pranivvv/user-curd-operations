
import { validationResult } from "express-validator"
import UserModel from "../models/UserModel.js"


const getAllUsers = async (req, res) => {

    try {
        const users = await UserModel.getAllUsers() // get array of users
        if(users && users.length>0){
            return res.status(200).json(users) // if array is not empty
        }
        else{
            return res.status(200).json({message : 'No user found'}) //if user table is empty
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message || 'Internal Server Error' }) // any other unknown error
    }
}


const getUserById = async (req, res) => {
    const id = req.params.id

    try{
        const user = await UserModel.getUserById(id) //fetch user from db 
        if(user){
            res.status(200).json(user) //if user found
        }
        else{
            res.status(404).json({message: 'User not found'}) //if user with specified id is not present
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message || 'Internal Server Error' }) // any other unknown error
    }
}


const createUser = async (req, res) => {
    const { name, email } = req.body
    //check if name and email both are present
    if(!name || !email){
        return res.status(400).json({error:'Username And Email is required'})
    }

    //validate email is in correct format
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors})
    }

    try{
        //add user in database
        const newUser = await UserModel.createUser(name, email)
        if(newUser){
            return res.status(201).json(newUser) // success 
        }
        else{
            return res.status(400).json({error : 'Failed to create user'}) //failed
        }
    }
    catch(error){
        if (error.number === 2627) {
            return res.status(409).json({ error: "Email already exists" }) // if email already exist in db
        }
        else{
            return res.status(500).json({ error: error.message || 'Internal Server Error' }) // any other unknown error
        }
    }
}


const updateUser = async (req, res) =>{
    const id = req.params.id

    try{
        const user = await UserModel.getUserById(id) //fetch user from db 
        if(user){
            //if user found
            const { name, email } = req.body 

            //check if name and email both are present
            if(!name || !email){
                return res.status(400).json({error:'Username And Email is required'})
            }

            //validate email is in correct format
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors})
            }

            const updatedUser = await UserModel.updateUser(id, name, email)

            if(updatedUser){
                return res.status(200).json(updatedUser) //if user is updated successfully
            }
            else{
                return res.status(400).json({error: 'Failed to update user'}) //if user update fails
            }
        }
        else{
            res.status(404).json({message: 'User not found'}) //if user with specified id is not present
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message || 'Internal Server Error' }) // any other unknown error
    }
}


const deleteUserById = async (req, res) => {
    const id = req.params.id

    try{
        const user = await UserModel.getUserById(id) //fetch user from db 
        if(user){
            //if user found
            const isDeleted = await UserModel.deleteUserById(id)
            if(isDeleted){
                return res.status(200).json({message: 'User deleted successfully'}) //if user is deleted successfully
            }
            else{
                return res.status(400).json({error: 'Failed to delete user'}) //if user deletion fails
            }
        }
        else{
            res.status(404).json({message: 'User not found'}) //if user with specified id is not present
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message || 'Internal Server Error' }) // any other unknown error
    }
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUserById }