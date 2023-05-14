const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const agencySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    agencyId: {
      type: String,
      required: true,
    },
    address1:{
        type: String,
        required: true,
    },
    address2:{
        type:String,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
      },
    ],
})

const validateAgency = (agency) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string().allow(''),
      state: Joi.string().required(),
      city: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      clients: Joi.array().items(Joi.string()),
    });
    return schema.validate(agency);
  };
  

  agencySchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


module.exports = {
    Agency: mongoose.model('Agency', agencySchema),
    validateAgency,
  };
