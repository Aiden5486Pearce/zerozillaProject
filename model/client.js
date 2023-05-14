const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const clientSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
    },
    clientId: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      totalBill: {
        type: Number,
        required: true,
      },
      agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true,
      },
})

const clientSchemaValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    totalBill: Joi.number().required(),
    agency: Joi.string().required(),
  });


  clientSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
  }
module.exports={
    Client: mongoose.model('Client', clientSchema),
    clientSchemaValidation
}