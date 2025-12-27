import sql from 'mssql'

const getAllUsers = async () => {
    // query to fetch all users
    try{
        const result = await sql.query('SELECT * FROM users')
        return result.recordset
    }
    catch (error){
        throw error //throws any error if occured during fetching all user to controller to handel it there
    }
}

const getUserById = async (id) => {
    // query to fetch user using id 
    try{
        const result = await new sql.Request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM users WHERE id = @id')
        return result.recordset[0]
    }
    catch(error){
        throw error // //throws any error if occured during fetching user to controller to handel it there
    }
}

const createUser = async (name, email) => {
    //execute the user creation query
    try{
        const result = await new sql.Request()
        .input('name', sql.VarChar, name) 
        .input('email', sql.VarChar, email)
        .query('INSERT INTO users (name, email) OUTPUT INSERTED.* VALUES (@name, @email)')
        return result.recordset[0]
    }catch(error){
        throw error //throws any error if occured during creating user to controller to handel it there
    }
}

const updateUser = async (id, name, email) => {
    //execute the user update query
    try{
        const result = await new sql.Request()
        .input('id', sql.Int, id)
        .input('name', sql.VarChar, name) 
        .input('email', sql.VarChar, email)
        .query('UPDATE users SET name=@name, email=@email OUTPUT INSERTED.* WHERE id = @id')
        return result.recordset[0]
    }catch(error){
        throw error //throws any error if occured during creating user to controller to handel it there
    }
} 

const deleteUserById = async (id) => {
    try{
        const result = await new sql.Request()
            .input('id', sql.Int, id)
            .query('DELETE FROM users WHERE id = @id')
        return result.rowsAffected[0] > 0
    }
    catch(error){
        throw error //throws any error if occured during deleting user to controller to handel it there
    }
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUserById}