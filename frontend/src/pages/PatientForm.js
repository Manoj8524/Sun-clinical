import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  message,
  Row,
  Col,
} from "antd";
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const PatientForm = () => {
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      // Normalize the values
      const normalizedValues = {};
      Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key])) {
          normalizedValues[key] = values[key].map(item => {
            const normalizedItem = {};
            Object.keys(item).forEach(subKey => {
              // Check if it's a PatientHistory item
              if (subKey === 'TestResults') {
                normalizedItem[subKey] = item[subKey].map(testItem => {
                  const normalizedTestItem = {};
                  Object.keys(testItem).forEach(testKey => {
                    // Replace empty strings with '0'
                    normalizedTestItem[testKey] = testItem[testKey] === undefined || testItem[testKey] === null || testItem[testKey] === "" ? "-" : testItem[testKey];
                  });
                  return normalizedTestItem;
                });
              } else {
                normalizedItem[subKey] = item[subKey] === undefined || item[subKey] === null || item[subKey] === "" ? null : item[subKey];
              }
            });
            return normalizedItem;
          });
        } else {
          normalizedValues[key] = values[key] === undefined || values[key] === null || values[key] === "" ? null : values[key];
        }
      });

      // Handle date formatting for VisitDate
      if (values.VisitDate) {
        normalizedValues.VisitDate = values.VisitDate.format("YYYY-MM-DD");
      }

      await axios.post("http://localhost:5000/api/patients", normalizedValues);
      message.success("Patient data submitted successfully!");
      form.resetFields(); // Reset form fields
    } catch (error) {
      message.error("Failed to submit data.");
    }
  };

  return (
    <div>
      <h2>Patient Form</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ Sex: "Male" }} // Default Sex to Male
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        {/* Patient Info Section */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Patient ID"
              name="ID"
              rules={[{ required: true, message: "Please enter patient ID!" }]}
            >
              <Input placeholder="Enter patient ID" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Patient Name"
              name="Name"
              rules={[{ required: true, message: "Please enter patient name!" }]}
            >
              <Input placeholder="Enter patient name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mobile Number"
              name="Mobile_no"
              rules={[{ required: true, message: "Please enter mobile number!" }]}
            >
              <Input placeholder="Enter mobile number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Visit Date"
              name="VisitDate"
              rules={[{ required: true, message: "Please select visit date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ref by Doctor" name="RefbyDoctor">
              <Input placeholder="Enter doctor's name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Age"
              name="Age"
              rules={[{ required: true, message: "Please enter age!" }]}
            >
              <Input type="number" placeholder="Enter patient age" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Sex" name="Sex">
              <Select placeholder="Select sex">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Patient History Section */}
        <Form.List name="PatientHistory">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div
                  key={key}
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "5px",
                  }}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        {...restField}
                        name={[name, "Heading"]}
                        fieldKey={[fieldKey, "Heading"]}
                        label="Heading"
                        rules={[{ required: true, message: "Please enter sub heading!" }]}
                      >
                        <Input placeholder="Enter heading" />
                      </Form.Item>
                    </Col>

                    {/* Dynamic Test Fields Section */}
                    <Form.List name={[name, "TestResults"]}>
                      {(testFields, { add: addTest, remove: removeTest }) => (
                        <>
                          {testFields.map(({ key: testKey, name: testName, fieldKey: testFieldKey, ...restTestField }) => (
                            <Row gutter={16} key={testKey}>
                              <Col span={8}>
                                <Form.Item
                                  {...restTestField}
                                  name={[testName, "testname"]}
                                  fieldKey={[testFieldKey, "testname"]}
                                  label="Test Name"
                                >
                                  <Input placeholder="Enter Test Name" />
                                </Form.Item>
                              </Col>

                              <Col span={8}>
                                <Form.Item
                                  {...restTestField}
                                  name={[testName, "results"]}
                                  fieldKey={[testFieldKey, "results"]}
                                  label="Results"
                                >
                                  <Input placeholder="Enter Results" />
                                </Form.Item>
                              </Col>

                              <Col span={8}>
                                <Form.Item
                                  {...restTestField}
                                  name={[testName, "reference"]}
                                  fieldKey={[testFieldKey, "reference"]}
                                  label="Reference Range"
                                >
                                  <Input placeholder="Enter Reference Range" />
                                </Form.Item>
                              </Col>

                              <Col span={24} style={{ textAlign: "right" }}>
                                <Button
                                  type="danger"
                                  onClick={() => removeTest(testName)}
                                  icon={<MinusCircleOutlined />}
                                >
                                  Remove Test
                                </Button>
                              </Col>
                            </Row>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => addTest()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Test
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        type="danger"
                        onClick={() => remove(name)}
                        icon={<MinusCircleOutlined />}
                      >
                        Remove History
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Patient History
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PatientForm;
