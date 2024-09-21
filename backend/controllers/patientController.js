const Patient = require('../models/patientModel');

// Create Patient
const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read all Patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch data from MongoDB
    res.status(200).json(patients); // Return the data as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Patient
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient };
