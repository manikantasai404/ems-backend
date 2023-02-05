const HotelCustomer = require("../models/HotelCustomer");
const Tabel = require("../models/Tables");
const router = require("express").Router();
let genericMethod = require("../genericmodels");
let CurrentOrder = require("../models/currentOrders");

router.put("/", async (req, res) => {
  //Updating customers current orders array
  let updateUesrOrders = await genericMethod.modifyRecord(
    req,
    HotelCustomer,
    "mobileNumber",
    req.body.mobileNumber
  );
  if (updateUesrOrders || updateUesrOrders != null) {
    let reqObj = {
      body: {
        tableNumber: req.body.tableNumber,
        orders: req.body.currentOrders,
        isOccupied: true,
        customer: req.body.customerName,
      },
    };
    //Updating tables orders array
    let updateTableOrders = await genericMethod.modifyRecord(
      reqObj,
      Tabel,
      "tableNumber",
      req.body.tableNumber
    );
    if (updateTableOrders || updateTableOrders != null) {
      //Updating Currentorders collection
      let orders = req.body.currentOrders;
      let arr = [];
      orders.forEach((item) => {
        let object = {
          itemId: item.itemId,
          itemName: item.itemName,
        };
        arr.push(object);
      });
      let currentOrdersObj = {
        body: {
          tableNumber: req.body.tableNumber,
          items: arr,
        },
      };
      let sendNotification = await genericMethod.saveRecord(
        currentOrdersObj,
        CurrentOrder
      );
      console.log(
        "currentOrdersObj",
        currentOrdersObj.body.items,
        sendNotification
      );
      if (sendNotification || sendNotification != null) {
        const { _id, __v, ...other } = updateTableOrders._doc;
        res.status(200).json({
          Success: "Ordered Successfully",
          StatusCode: 200,
          Data: other,
        });
      }
    } else {
      res.status(200).json({
        Success: "Failed order.Please try again",
        StatusCode: 200,
        Data: [],
      });
    }
  } else {
    res.status(200).json({
      Success: "Failed order.Please try again",
      StatusCode: 200,
      Data: [],
    });
  }
});

module.exports = router;
