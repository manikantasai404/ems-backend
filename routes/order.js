const HotelCustomer = require("../models/HotelCustomer");
const Tabel = require("../models/Tables");
const router = require("express").Router();
let genericMethod = require("../genericmodels");
let CurrentOrder = require("../models/currentOrders");

router.put("/", async (req, res) => {
  let currentTableOrders = await genericMethod.getSingleItemByParameter(
    req,
    Tabel,
    "tableNumber"
  );
    console.log("currentTableOrders",currentTableOrders);
    currentTableOrders.orders.forEach((x) => {
          req.body.currentOrders.push(x)
        })
    // if(currentTableOrders && currentTableOrders.orders.length>0) {
    //   currentTableOrders.orders.forEach((x) => {
    //     req.body.currentOrders.push(x)
    //   })
    // }
  //Updating customers current orders array
  const date = await genericMethod.getDateTimeDetails("date");
  const month = await genericMethod.getDateTimeDetails("month");
  const year = await genericMethod.getDateTimeDetails("year");
  const time = await genericMethod.getDateTimeDetails("time");
  const hour = await genericMethod.getDateTimeDetails("hour");
  const weekday = await genericMethod.getDateTimeDetails("weekday");

  req.body.currentOrders.map((x) => {
    x["mobileNumber"] = req.body.mobileNumber;
    x["date"] = date;
    x["time"] = time;
    x["hour"] = hour;
    x["year"] = year;
    x["month"] = month;
    x["weekday"] = weekday;
    x["tableNumber"] = req.body.tableNumber;
  });
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
          type: item.type,
          mobileNumber: item.mobileNumber,
          date: item.date,
          time: item.time,
          hour: item.hour,
          month: item.month,
          year: item.year,
          weekday: item.weekday,
          tableNumber: item.tableNumber,
          itemPrice: item.itemPrice,
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

// router.put("/curentOrderss", async (req, res) => {
//   let currentTableOrders = await genericMethod.getSingleItemByParameter(
//     req,
//     CurrentOrder,
//     "tableNumber"
//   );
//   res.status(200).json({
//     Success: "Success",
//     StatusCode: 200,
//     Data: currentTableOrders,
//   });
// });

module.exports = router;
