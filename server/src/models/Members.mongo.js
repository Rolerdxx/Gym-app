const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  cin:{
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthdate:{
    type: Date,
    required: true,
  },
  email:{
    type: String,
    default: "",
  },
  adresse:{
    type: String,
    default: "",
  },
  isactive:{
    type: Boolean,
    default: false
  }
});

membersSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

membersSchema.set('toJSON',{
  virtuals:true,
});

const membersModel = mongoose.model('Member',membersSchema);

module.exports=membersModel;
