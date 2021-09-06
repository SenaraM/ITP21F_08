const mongoose = require("mongoose");
//laptop_repair
const laptop_repair_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  repair_reason: {
    type: String,
    required: true,
  },
  repair_date: {
    type: Date,
    required: true,
  },
  repair_cost: {
    type: String,
    required: true,
  },

  
  

});
module.exports = mongoose.model("laptops_repair", laptop_repair_Schema);

