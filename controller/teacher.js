const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// Fetch all teachers
module.exports.fetchTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({success:true, teachers});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new teacher
module.exports.addTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json({ success: true, teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: "Error adding teacher", error: error.message });
  }
};

// Update a teacher by ID
module.exports.updatedTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, aadhaar, address, subject, email, contact } = req.body;

  try {
    const updatedTeacher = await Teacher.findOneAndUpdate( 
      {aadhaar: id},
      req.body,
      { new: true }
    );
    if(!updatedTeacher){
      res.status(404).json({success:false, message:"Teacher not found"});
    }
    res.status(201).json({success:true, teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a teacher by ID
module.exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    await Teacher.findOneAndDelete({aadhaar: id});
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error: error.message });
  }
};

