import {Router} from 'express'
import controller from '../controllers/userControllers.js'
import { body } from 'express-validator'
// import {getAllUsers} from '../controllers/userControllers'
const userRouter = Router() //created instance of express router

// API routes

//To fetch all users : "GET http://localhost:3000/users/"
userRouter.get("/", controller.getAllUsers)

//To fetch user using ID : "GET http://localhost:3000/users/:id"
userRouter.get("/:id", controller.getUserById)

//To create user : "POST http://localhost:3000/users/"
userRouter.post("/", 
    //validating incoming data
    [
        body('name', 'Enter a valid  Name').trim().isLength({ min: 3 }).escape(),
        body('email', 'Enter a valid Email').isEmail().escape()
    ],
    controller.createUser
)

//To Update  user using ID : "PUT http://localhost:3000/users/:id"
userRouter.put("/:id", 
    //validating incoming data
    [
        body('name', 'Enter a valid  Name').trim().isLength({ min: 3 }).escape(),
        body('email', 'Enter a valid Email').isEmail().escape()
    ],
    controller.updateUser
)

//To Delete user using ID : "DELETE http://localhost:3000/users/:id"
userRouter.delete("/:id", controller.deleteUserById)

export default userRouter