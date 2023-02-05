const ItemModel = require("../models/Item");
const router = require("express").Router();
let genericMethod = require("../genericmodels");

router.post("/", async (req, res) => {
  let item = await genericMethod.getSingleItemByParameter(
    req,
    ItemModel,
    "itemName"
  );
  if (item || item != null) {
    const { _id, __v, updatedAt, createdAt, ...other } = item._doc;
    let itemName = other.itemName;
    res.status(200).json({
      Success: `${itemName} already exists`,
      StatusCode: 200,
      ExistingItem: true,
      Data: other,
    });
  } else {
    let item = await genericMethod.saveRecord(req, ItemModel);
    if (item) {
      const { _id, __v, updatedAt, createdAt, ...other } = item._doc;
      let itemName = other.itemName;
      res.status(200).json({
        Success: `${itemName} created`,
        StatusCode: 200,
        ExistingItem: false,
        Data: other,
      });
    }
  }
});

router.get("/items", async (req, res) => {
  let arr = await genericMethod.getAllRecords(ItemModel);
  if (arr.length > 0) {
    let data = [];
    arr.forEach((obj) => {
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

router.put("/:id", async(req,res) => {
    let item = await genericMethod.modifyRecord(req, ItemModel, 'itemId',req.params.id);
    if(item) {
        res.status(200).json({
            Success: "Updated successfully",
            StatusCode: 200,
            Data: item,
          });
    }
})

module.exports = router;
