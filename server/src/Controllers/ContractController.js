const Contract = require("../models/Contract.mongo");
const Report = require("../models/Report.mongo");

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
        duration:req.body.duration,
        monthsremaining:req.body.monthsremaining,
    });
    if(!contract){
        return res.status(500).json({success:false});
    }
    return res.status(200).json(contract);
};


const newReport = async () => {
  const contracts = await Contract.aggregate([
    {
      $match: {
        monthsremaining: {
          $gt: 0,
        },
      },
    },
  ]);
  let revenu = 0;
  contracts.forEach(async (v) => {
    revenu += 1;
    await Contract.findByIdAndUpdate(v._id, {
      monthsremaining: v.monthsremaining - 1,
    });
  });
  const newReport = new Report({
    month: new dayjs().format("MMMM-YYYY"),
    reportcreationdate: new dayjs(),
    newmembers: 0,
    revenu: Number(revenu) * 300,
  });
  await newReport.save();
};

const report = async (data) => {
  console.log("Reporting.....");
  const current = new dayjs().format("MMMM-YYYY");
  const rp = await Report.findOne({ month: current });
  if (!rp) {
    console.log("dd");
    newReport();
  } else {
    console.log("adasd");
    await Report.findByIdAndUpdate(rp._id, {
      revenu: rp.revenu + 300,
    });
    await Contract.findByIdAndUpdate(data.documentKey._id, {
      monthsremaining: data.updateDescription.updatedFields.monthsremaining - 1,
    });
    console.log("done");
  }
};

module.exports = { getContract, putContract };
