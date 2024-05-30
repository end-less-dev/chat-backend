const { where } = require("sequelize");
const models = require("../models");
const { uuid } = require('uuidv4');

const createUser = async(request, response)=>{

    const createUserData = {
        userId: uuid(),
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password,
        avatar: request.body.avatar,
        state: request.body.state,
        country: request.body.country,
        city: request.body.city
    }
    try {
        const result = await models.User.create(createUserData);

        response.status(201).json({
          message: 'User created successfully!',
          data: result,
        });
      } catch (error) {
        response.status(500).json({
          message: 'Something went wrong!',
          error: error.message,
        });
      }
}

const getAllUsers = async (request, response)=>{
  try {
    const result = await models.User.findAll()

    response.status(201).json({
      message : "done",
      data : result
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong!',
      error: error.message,
    });
  }
}

const updateUser = async(request, response)=>{
  const userId = request.params.userId
  const updateData = {
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password,
        avatar: request.body.avatar,
        state: request.body.state,
        country: request.body.country,
        city: request.body.city
  }
  try {
    const result = await models.User.update(updateData, { where: { userId: userId } });
    response.status(201).json({
      message : "Successfully updated!",
      data : result
    })
  } catch (error) {
    response.status(500).json({
      message : "something's not right",
      error :  error
    })
  }
}

const getUserByUserId = async (request, response)=>{
  const userId = request.params.userId
  try {
    const result = await models.User.findOne({ where: { userId : userId } });
    response.status(201).json({
      message : "Successfully done!",
      data : result
    })
  } catch (error) {
    response.status(500).json({
      message : "something's not right",
      error :  error
    })
  }
}


const userLogin = async(request, response)=>{
  const credentials = {
    userName : request.body.userName,
    password : request.body.password
  }
  console.log(credentials,"cred")
  try {
    const result = await models.User.findOne({where : {userName : credentials.userName}}).then((user)=>{
      console.log("user", user)
      if (user && user.password === credentials.password) {
        response.status(201).json({
          message : "Successfully logged in",
          data : user
        })
      }else{
        response.status(401).json({
          message : "Invalid credential",
          data : user
        })
      }
    })
  } catch (error) {
    console.log("error", error)
    response.status(500).json({
      error : error,
      message : "Something's not right"
    })
  }
}

module.exports = {
    createUser : createUser,
    getAllUsers : getAllUsers,
    updateUser : updateUser,
    getUserByUserId : getUserByUserId,
    userLogin :  userLogin
}