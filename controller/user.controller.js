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

module.exports = {
    createUser : createUser,
    getAllUsers : getAllUsers,
    updateUser : updateUser,
    getUserByUserId : getUserByUserId
}