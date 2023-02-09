const HotelCustomer = require("../models/HotelCustomer");
const Tabel = require("../models/Tables");
const router = require("express").Router();
let genericMethod = require("../genericmodels");

//Add Hotel customer

router.post("/", async (req, res) => {
  let customer = await genericMethod.getSingleItemByParameter(
    req,
    HotelCustomer,
    "mobileNumber"
  );
  if (customer || customer != null) {
    let updatedCustomer = await genericMethod.modifyRecord(
      req,
      HotelCustomer,
      "mobileNumber",
      req.body.mobileNumber
    );
    if (updatedCustomer || updatedCustomer != null) {
      let reqBody = {
        body: {
          tableNumber: req.body.tableNumber,
          orders: [],
          isOccupied: true,
          customer: req.body.customerName,
        },
      };
      let tableUpdate = await genericMethod.modifyRecord(
        reqBody,
        Tabel,
        "tableNumber",
        req.body.tableNumber
      );
      if (tableUpdate || tableUpdate != null) {
        const { _id, __v, updatedAt, createdAt, ...other } =
          updatedCustomer._doc;
        let customerName = other.customerName;
        res.status(200).json({
          Success: `Welcome back ${customerName}`,
          StatusCode: 200,
          ExistingUSer: true,
          Data: other,
        });
      }
    }
  } else {
    let customer = await genericMethod.saveRecord(req, HotelCustomer);
    if (customer || customer != null) {
      let reqBody = {
        body: {
          tableNumber: req.body.tableNumber,
          orders: [],
          isOccupied: true,
          customer: req.body.customerName,
        },
      };
      let tableUpdate = await genericMethod.modifyRecord(
        reqBody,
        Tabel,
        "tableNumber",
        req.body.tableNumber
      );
      if (tableUpdate || tableUpdate != null) {
        const { _id, __v, updatedAt, createdAt, ...other } = customer._doc;
        let customerName = other.customerName;
        res.status(200).json({
          Success: `Welcome ${customerName}`,
          StatusCode: 200,
          ExistingUSer: false,
          Data: other,
        });
      }
    }
  }
});

module.exports = router;
