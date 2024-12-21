const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  admissionNo:{ type: String, required: true},
  rollNo: { type: String, required: true},
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  address: { type: String, required: true },
  motherName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  aadhar: { type: String, required: true },
  class: { type: String, required: true },
  amount: {
    due: { type: Number, required: true },
    paid: { type: Number, required: true },
  },
  age: { type: Number, required: true },
  transport: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
