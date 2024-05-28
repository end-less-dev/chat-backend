// middleware/attachIO.js
const attachIO = (io) => {
    return (req, res, next) => {
        if (io) {
            req.io = io;
            next();
        }
    };
  };
  
module.exports = attachIO;
  