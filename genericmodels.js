const bcrypt = require("bcrypt");

module.exports = {
  getHashedPassword: async (req) => {
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req, salt);
    return password;
  },

  getDateTimeDetails: async (req) => {
    const currentDate = new Date();
    switch (req) {
      case "date":
        const date = `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
        return date;
      case "month":
        const month = `${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
        return month;
      case "year":
        const year = `${currentDate.getFullYear()}`;
        return year;
      case "time":
        const time = `${String(currentDate.getHours()).padStart(
          2,
          "0"
        )}:${String(currentDate.getMinutes()).padStart(2, "0")}`;
        return time;
      case "hour":
        const hour = `${String(currentDate.getHours()).padStart(2, "0")}`;
        return hour;
      case "weekday":
        const weekday = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(currentDate);
        return weekday;
    }
  },

  saveRecord: async (req, model) => {
    const obj = new model(req.body);
    try {
      const record = await obj.save();
      return record;
    } catch (err) {
      return err;
    }
  },

  modifyRecord: async (req, model, searchParameter, queryParameter) => {
    try {
      const record = await model.findOneAndUpdate(
        { [searchParameter]: queryParameter },
        req.body,
        { new: true }
      );
      return record;
    } catch (err) {
      return err;
    }
  },

  removeRecord: async (req, model, parameter) => {
    try {
      const record = await model.findOneAndRemove({
        [parameter]: req.params.id,
      });
      return record;
    } catch (err) {
      return err;
    }
  },

  getAllRecords: async (model) => {
    try {
      const array = await model.find({});
      return array;
    } catch (err) {
      return err;
    }
  },

  getSingleItemByParameter: async (req, model, searchparameter) => {
    try {
      const record = await model.findOne({
        [searchparameter]: req.body[searchparameter],
      });
      return record;
    } catch (err) {
      return err;
    }
  },
};
