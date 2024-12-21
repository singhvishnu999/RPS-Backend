const express = require('express');
const router = express.Router();
const {fetchStudent, getStudent, addStudent, updateStudent, deleteStudent, addFee, transportFee, feePaid} = require('../controller/student');

router.get('/fetch',fetchStudent);
router.get('/:_id',getStudent);
router.post('/add',addStudent);

router.put('/update/:rollNo', updateStudent);
router.delete('/delete/:rollNo', deleteStudent);

// Fee Management

router.put('/addFee', addFee);
router.put('/transportFee', transportFee);
router.put('/feePaid', feePaid);

module.exports = router;
