import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import axios from "axios";
import PrintComponent from '../components/PrintComponent';  // Import the PrintComponent

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false); // Changed `visible` to `open`
  const [selectedPatient, setSelectedPatient] = useState(null);
  const printRef = useRef();  // Ref for the print component

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://sun-clinical.onrender.com/api/patients");
        setPatients(res.data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };
    fetchPatients();
  }, []);

  const columns = [
    {
      title: "Patient ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Mobile No",
      dataIndex: "Mobile_no",
      key: "Mobile_no",
    },
    {
      title: "Visit Date",
      dataIndex: "VisitDate",
      key: "VisitDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewReport(record)} />
      ),
    },
  ];

  const handleViewReport = (patient) => {
    setSelectedPatient(patient);
    setOpen(true); // Changed `setVisible` to `setOpen`
  };

  const handleClose = () => {
    setOpen(false); // Changed `setVisible` to `setOpen`
    setSelectedPatient(null);
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Patient Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2, h3 { margin: 10px 0; }
            p { margin: 5px 0; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div>
      <h2>Patient List</h2>
      
      <Table
        columns={columns}
        dataSource={patients}
        rowKey="_id"
        pagination={false}
        style={{ marginBottom: '20px' }}
      />
  
      <Modal
        open={open} // Changed `visible` to `open`
        onCancel={handleClose}
        width={"65%"}
        footer={[
          <Button key="print" onClick={handlePrint}>
            Print
          </Button>,
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
        ]}
        styles={{ body: { padding: '20px' } }} // Changed `bodyStyle` to `styles.body`
      >
        {selectedPatient && (
          <PrintComponent ref={printRef} selectedPatient={selectedPatient} />
        )}
      </Modal>
    </div>
  );
};

export default PatientList;
