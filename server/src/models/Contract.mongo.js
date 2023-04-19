const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  Member: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Member",
    required: true,
  },
  startdate: {
    type: Date,
    default: new Date("2000/00/00"),
  },
  enddate: {
    type: Date,
    default: new Date("2000/00/00"),
  },
  duration: {
    type: String,
    default: "none",
  },
  monthsremaining: {
    type: Number,
    default: 0,
  }
});

contractSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

contractSchema.set('toJSON',{
  virtuals:true,
});

const contractModel = mongoose.model('Contract',contractSchema);

module.exports=contractModel;
