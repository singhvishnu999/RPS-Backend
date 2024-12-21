const express = require('express');
const router = express.Router();
const {fetchStudent, getStudent, addStudent, updateStudent, deleteStudent, addFee, transportFee, feePaid} = require('../controller/student');
const {studentValidationSchema} = require('../joi');

const validateStudent = (req, res, next) => {
    const { error } = studentValidationSchema.validate(req.body, {
      abortEarly: false, // Show all validation errors, not just the first
    });
  
    if (error) {
        res.status(400).json({success:false, message:error.message});
    }
  
   next();
  };

router.get('/fetch',fetchStudent);
router.get('/:_id',getStudent);
router.post('/add',validateStudent, addStudent);

router.put('/update/:rollNo', updateStudent);
router.delete('/delete/:rollNo', deleteStudent);

// Fee Management

router.put('/addFee', addFee);
router.put('/transportFee', transportFee);
router.put('/feePaid', feePaid);

module.exports = router;
