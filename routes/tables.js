const Tables = require("../models/Tables");
const router = require("express").Router();
let genericMethod = require("../genericmodels");

//Add Hotel Table

router.post("/", async (req, res) => {
  let hotelTable = await genericMethod.getSingleItemByParameter(
    req,
    Tables,
    "tableNumber"
  );
  if (hotelTable || hotelTable != null) {
    const { _id, __v, updatedAt, createdAt, ...other } = hotelTable._doc;
    let table = other.tableNumber;
    res.status(200).json({
      Success: `Table ${table} already exists`,
      StatusCode: 200,
      ExistingTable: true,
      Data: other,
    });
  } else {
    let hotelTable = await genericMethod.saveRecord(req, Tables);
    if (hotelTable) {
      const { _id, __v, updatedAt, createdAt, ...other } = hotelTable._doc;
      let table = other.tableNumber;
      res.status(200).json({
        Success: `Table ${table} created successfully`,
        StatusCode: 200,
        ExistingTable: false,
        Data: other,
      });
    }
  }
});

router.get("/tables", async (req, res) => {
    let allTables = await genericMethod.getAllRecords(Tables);
    if (allTables.length > 0) {
        let data = [];
        allTables.forEach((obj) => {
          const { _id, __v, updatedAt, createdAt, ...other } = obj._doc;
          data.push(other);
        });
        res.status(200).json({
          Success: "Success",
          StatusCode: 200,
          Data: data,
        });
      } else {
        res.status(200).json({
          Success: "No items found",
          StatusCode: 200,
          Data: [],
        });
      }
});

router.put("/:tableNumber",async (req,res) => {
    let tableUpdate = await genericMethod.modifyRecord(req,Tables,"tableNumber",req.body.tableNumber);
    if(tableUpdate) {
        res.status(200).json({
            Success: "Success",
            StatusCode: 200,
            Data: tableUpdate,
          });
    }
})

module.exports = router;
