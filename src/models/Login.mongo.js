const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  }
});

loginSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

loginSchema.set('toJSON',{
  virtuals:true,
});

const loginModel = mongoose.model('User',loginSchema);

module.exports=loginModel;
