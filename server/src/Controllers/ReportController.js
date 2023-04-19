const Report = require("../models/Report.mongo");

const getLast12Reports = async (req, res) => {
  const reports = await Report.aggregate([
    {
      $sort: {
        reportcreationdate: -1,
      },
    },
    {
      $limit: 12,
    },
  ]);
  if (!reports) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(reports);
};

module.exports = { getLast12Reports };
