const mongoose = require("mongoose");
let gadgetSchema = mongoose.Schema({
  name: String,
  price: Number,
  desc:String,

});
gadgetSchema.statics.validate = function (data) {
  const Joi = require("joi");
  const gadgetSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(3).required(),
    desc: Joi.string().min(3).required(),
  });
  let result = gadgetSchema.validate(data, { abortEarly: false });
  return result.error;
};
const Gadget = mongoose.model("Gadget", gadgetSchema);
module.exports = Gadget;
