const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  ID: String,
  Name: String,
  Mobile_no: String,
  VisitDate: Date,
  RefbyDoctor: String,
  Age: Number,
  Sex: String,
  PatientHistory: [
  
  ]
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
