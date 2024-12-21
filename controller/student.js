const Student = require("../models/Student");

module.exports. addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({success:true, student:student });
  } catch (err) {
    res.status(400).json({success:false, error: err.message });
  }
};

// Get all students
module.exports.fetchStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({success:true, students});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a student by rollNo
module.exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }
    res.status(200).json({success:true,student});
  } catch (err) {
    res.status(400).json({success:false, error: err.message });
  }
};

// Update student details
module.exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.
    findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({success:false, message: "Student not found!" });
    }
    res.status(200).json({success:true, message: "Student updated successfully!", student });
  } catch (err) {
    res.status(400).json({success:false, error: err.message });
  }
};

// Delete student by id
module.exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      rollNo: req.params.rollNo,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }
    res.status(200).json({success:true, message: "Student deleted successfully!" });
  } catch (err) {
    res.status(400).json({success:false, error: err.message });
  }
};

// Fee Management
module.exports.addFee = async (req, res) => {
  try {
    //in progress
    const { body } = req;
    const student = await Student.updateMany(
      { class: body.Class },
      { $inc: { "amount.due": body.amount } }
    );

    res.status(201).json({ success: true, message: "Fee Added Successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports.transportFee = async (req, res) => {
  try {
    const result = await Student.updateMany(
      {}, // Match all documents or specify a filter
      [
        {
          $set: {
            "amount.due": {
              $add: [
                "$amount.due", // Add to the current `dueFee`
                {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$transport", "MORESARAI"] }, then: 100 },
                      { case: { $eq: ["$transport", "KUMAHU"] }, then: 250 },
                      { case: { $eq: ["$transport", "BEDAMODE"] }, then: 150 },
                      { case: { $eq: ["$transport", "MORWA"] }, then: 250 },
                      { case: { $eq: ["$transport", "JANJARA"] }, then: 350 },
                      { case: { $eq: ["$transport", "DORIYAW"] }, then: 300 },
                      { case: { $eq: ["$transport", "SASARAM"] }, then: 250 },
                    ],
                    default: 0, // If no match, add 0
                  },
                },
              ],
            },
          },
        },
      ]
    );
    res.status(200).json({ success: true, message: "Fee Added Successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports.feePaid = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const student = await Student.findOneAndUpdate(
      { rollNo: body.rollNo, name: body.name, class: body.Class },
      { $inc: { "amount.due": -body.amount }},
      { $set: {"amount.paid":  body.amount}}
      ,{new:true} 
    );
    // if (student) {
      res
        .status(200)
        .json({ success: true, message: "Fee Paid Successfully!" });
    // }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
