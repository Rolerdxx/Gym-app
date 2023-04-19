const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const PORT = 5000;
const dayjs = require("dayjs");
const Report = require("./models/Report.mongo");

const Contract = require("./models/Contract.mongo");
const Member = require("./models/Members.mongo");

const server = http.createServer(app);

async function updateActivity() {
  console.log("Updating activity...");
  const contracts = await Contract.find({});
  contracts.forEach((e) => {
    const end = new dayjs(e.enddate);
    const now = new dayjs();
    const diff = end.diff(now, "days");
    if (diff > 0) {
      update(e.Member.toString(), true);
    } else {
      update(e.Member.toString(), false);
    }
  });
  console.log("Done!");
}









async function LoadServer() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  Contract.watch().on("change", async(data) => {
    if (data.operationType === "update") {
      console.log("!!!!!!!!!!!!!!!!!!!")
      await report(data);
      console.log("////////////")
    }
  });
  setInterval(updateActivity, 3600000);
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
}

const update = async (id, state) => {
  await Member.findByIdAndUpdate(id, {
    isactive: state,
  });
};

LoadServer();
