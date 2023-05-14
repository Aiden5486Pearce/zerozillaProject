const catchAsyncError = require('./catchAsyncError')
const errorHandler = require('../utils/errorHandler')
const jsonWebToken = require('jsonwebtoken')
const Client = require('../model/client')

exports.isAuthincateClient = catchAsyncError(async(req,res,next)=>{
    const {token} = req.token;

    if(!token){
        return next(new errorHandler('Please log in with valid id', 404))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.client = await Client.findById(decodedData.id)
    next();
})