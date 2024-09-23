const Patient = require('../models/patientModel');

// Create Patient
const createPatient = async (req, res) => {
  try {
    // Check if patient ID already exists

    console.log("req",req.body)

    const existingPatient = await Patient.findOne({ ID: req.body.ID });
    if (existingPatient) {
      return res.status(401).json({ message: "Patient ID already exists. Please use a unique ID." });
    }

    // If ID is unique, proceed to create new patient
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(200).json(savedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Read all Patients
// Read all Patients (latest first)
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ _id: -1 }); // Sort by _id in descending order
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
