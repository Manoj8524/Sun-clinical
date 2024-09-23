import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import PatientForm from "./pages/PatientForm";
import PatientList from "./pages/PatientList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout><PatientForm /></DefaultLayout>} />
        <Route path="/patient-list" element={<DefaultLayout><PatientList /></DefaultLayout>} />
      </Routes>
    </Router>

);
};

export default App;
