const express = require("express");
const router = express.Router();
const { fetchTeacher, addTeacher, updatedTeacher, deleteTeacher } = require("../controller/teacher");
const { teacherValidationSchema } = require("../joi");

const validateTeacher = (req, res, next) => {
    const { error } = teacherValidationSchema.validate(req.body, {
        abortEarly: false, // Show all validation errors, not just the first
    });
    
    if (error) {
        res.status(400).json({ success: false, message: error.message });
    }
    next();
    }

// Fetch all teachers
router.get("/", fetchTeacher);

// Add a new teacher
router.post("/", validateTeacher, addTeacher);

// Update a teacher by ID
router.put("/:id", validateTeacher, updatedTeacher);

// Delete a teacher by ID
router.delete("/:id", deleteTeacher);

module.exports = router;
