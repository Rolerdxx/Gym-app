const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  reportcreationdate: {
    type: Date,
    required: true,
  },
  newmembers: {
    type: String,
    default: 0,
  },
  revenu: {
    type: Number,
    default: 0,
  }
});

reportSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

reportSchema.set('toJSON',{
  virtuals:true,
});

const reportModel = mongoose.model('Report',reportSchema);

module.exports=reportModel;
