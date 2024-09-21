import React from 'react';

const PrintComponent = React.forwardRef(({ selectedPatient }, ref) => {
  return (
    <div ref={ref} id="patient-report" style={styles.reportContainer}>
      {/* Clinic Name and Address */}      
      <div style={styles.header}>
        <h2 style={styles.clinicName}>SUN CLINICAL LABORATORY</h2>
        <p style={styles.clinicDetails}>424, Mangammal Salai, K.T.C Nagar, Tirunelveli</p>
        <p style={styles.clinicDetails}>Cell: 99422 27189</p>
      </div>

      {/* Patient Information */}
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.tableHeader}>Patient ID</td>
            <td style={styles.tableContent}>{selectedPatient.ID}</td>
            <td style={styles.tableHeader}>Visit Date</td>
            <td style={styles.tableContent}>
              {new Date(selectedPatient.VisitDate).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td style={styles.tableHeader}>Patient Name</td>
            <td style={styles.tableContent}>{selectedPatient.Name}</td>
            <td style={styles.tableHeader}>Mobile No</td>
            <td style={styles.tableContent}>{selectedPatient.Mobile_no}</td>
          </tr>
          <tr>
            <td style={styles.tableHeader}>Referred by Doctor</td>
            <td style={styles.tableContent}>{selectedPatient.RefbyDoctor}</td>
          </tr>
          <tr>
            <td style={styles.tableHeader}>Age/Sex</td>
            <td style={styles.tableContent}>
              {selectedPatient.Age} / {selectedPatient.Sex}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Patient History */}
      {selectedPatient.PatientHistory && (
        <>
          <h3 style={styles.subHeading}>Patient History</h3>
          {selectedPatient.PatientHistory.map((history, index) => (
            <div key={index} style={styles.historyContainer}>
              <p><strong>Heading:</strong> {history.Heading}</p>
              <table style={styles.testTable}>
                <thead>
                  <tr>
                    <th style={styles.testTableHeader}>Test Name</th>
                    <th style={styles.testTableHeader}>Results</th>
                    <th style={styles.testTableHeader}>Reference Range</th>
                  </tr>
                </thead>
                <tbody>
                  {history.TestResults.map((test, testIndex) => (
                    <tr key={testIndex}>
                      <td style={styles.testTableContent}>{test.testname}</td>
                      <td style={styles.testTableContent}>{test.results}</td>
                      <td style={styles.testTableContent}>{test.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
      
      {/* Footer */}
      <p style={styles.footer}>***END OF REPORT***</p>
    </div>
  );
});

export default PrintComponent;

// Styles
const styles = {
    reportContainer: {
      fontFamily: "'Arial', sans-serif",
      color: '#333',
      padding: '20px',
      border: '2px solid #4CAF50',
      margin: '0 auto',
      width: '100%',
      maxWidth: '250mm',
      maxHeight: '297mm',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    header: {
      textAlign: 'center',
      borderBottom: '2px solid #4CAF50',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    clinicName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#006400',
    },
    clinicDetails: {
      fontSize: '14px',
      margin: '0',
    },
  
    // Modified patient details table style
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    tableRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    tableHeader: {
      fontWeight: 'bold',
      flex: '1',
      padding: '10px',
      borderBottom: '2px solid #4CAF50',
      backgroundColor: '#f9f9f9',
    },
    tableContent: {
      flex: '1',
      padding: '10px',
      borderBottom: '2px solid #ddd',
    },
  
    subHeading: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    historyContainer: {
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
    },
    
    // Center align the text inside the patient history
    testTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
    },
    testTableHeader: {
      fontWeight: 'bold',
      padding: '10px',
      border: '1px solid #ccc',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
    },
    testTableContent: {
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center', // Center the content
    },
    
    footer: {
      textAlign: 'center',
      marginTop: '30px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
  };
  