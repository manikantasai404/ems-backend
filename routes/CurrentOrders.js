const CurrentOrders = require("../models/currentOrders");
const router = require("express").Router();
let genericMethod = require("../genericmodels");

router.get("/", async (req, res) => {
  const allCurrentOrders = await genericMethod.getAllRecords(CurrentOrders);
  if (allCurrentOrders.length > 0) {
    let data = [];
    allCurrentOrders.forEach((obj) => {
      const { _id, __v, updatedAt, ...other } = obj._doc;
      data.push(other);
    });
    const result = data.reduce((acc, table) => {
      const { tableNumber, items } = table;
      if (!acc[tableNumber]) {
        acc[tableNumber] = [];
      }
      acc[tableNumber].push(...items);
      return acc;
    }, {});
    res.status(200).json({
      Success: "Success",
      StatusCode: 200,
      Data: result,
    });
  }
});

module.exports = router;
