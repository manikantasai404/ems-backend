const bcrypt = require("bcrypt");

module.exports = {
  getHashedPassword: async (req) => {
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req, salt);
    return password;
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

  modifyRecord: async (req, model, searchParameter,queryParameter) => {
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
      const record = await model.findOneAndRemove({ [parameter]: req.params.id });
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
