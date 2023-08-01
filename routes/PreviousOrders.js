const PreviousOrder = require("../models/previousOrders");
const router = require("express").Router();
let genericMethod = require("../genericmodels");

router.post("/", async (req, res) => {
  console.log(req);
  let savedRecord = await genericMethod.insertManyRecords(req, PreviousOrder);
  console.log(savedRecord);
  if(savedRecord) {
    res.status(200).json({
      Success: `Successfully added`,
      StatusCode: 200,
      Data: savedRecord,
    });
  }
});


module.exports = router;