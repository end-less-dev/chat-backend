const models = require("../models");
const { uuid } = require('uuidv4');

const createMessage = async(request, response)=>{
    const createMessageData = {
        messageId: uuid(),
        message: request.body.message,
        userId: request.body.userId
    }
    try {
        const result = await models.Message.create(createMessageData);
    
        // Emit the 'chat message' event via Socket.IO
        const io = request.io;
        io.emit('chat message', createMessageData?.message);
    
        response.status(201).json({
          message: 'Message created successfully!',
          data: result,
        });
      } catch (error) {
        response.status(500).json({
          message: 'Something went wrong!',
          error: error.message,
        });
      }
}

module.exports = {
    createMessage : createMessage
}