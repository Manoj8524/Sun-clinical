const express = require('express');
const { createPatient, getPatients, updatePatient, deletePatient } = require('../controllers/patientController');
const router = express.Router();

router.post('/patients', createPatient);
router.get('/patients', getPatients);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

module.exports = router;
