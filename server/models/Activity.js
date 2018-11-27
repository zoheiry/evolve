const mongoose = require('mongoose');

let ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: String,
  priority: { type: Number, min: 1, max: 5, required: true },
  durationInHours: Number,
  hoursSpent: { type: Number, default: 0 }
});

module.exports = mongoose.model('Activity', ActivitySchema);
