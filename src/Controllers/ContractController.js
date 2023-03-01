const Contract = require("../models/Contract.mongo");

const getContract = async (req, res) => {
  const id = req.params.id;
  const contract = await Contract.findOne({ Member: id }).populate("Member");
  if (!contract) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(contract);
};

const putContract = async (req, res) => {
    const id = req.params.id;
    const contract = await Contract.findByIdAndUpdate(id,{
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        duration:req.body.duration
    });
    if(!contract){
        return res.status(500).json({success:false});
    }
    return res.status(200).json(contract);
};

module.exports = { getContract, putContract };
