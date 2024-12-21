const express = require("express");
const router = express.Router();
const { fetchTeacher, addTeacher, updatedTeacher, deleteTeacher } = require("../controller/teacher");

// Fetch all teachers
router.get("/", fetchTeacher);

// Add a new teacher
router.post("/", addTeacher);

// Update a teacher by ID
router.put("/:id", updatedTeacher);

// Delete a teacher by ID
router.delete("/:id", deleteTeacher);

module.exports = router;
