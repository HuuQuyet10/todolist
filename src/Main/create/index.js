import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Form, Select, Button } from 'antd';
import "../style.scss";
import { DownOutlined } from '@ant-design/icons';


const { Option } = Select;
const { TextArea } = Input;
function Index(props) {
  const [state, _setState] = useState({
    description: "",
    title: ""
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (date, dateString) => {
    console.log(date);
  }
  const handleChange = (value) => {
    console.log(`${value}`);
  }
  return (
    <Form>
      <Form.Item className="form-item-title">
        <h2 style={{ fontWeight: "bold" }}>New Task</h2>
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Add new task..."
          name={state.title}
        />
      </Form.Item>
      <Form.Item>
        <p style={{ fontWeight: "bold" }}>Description</p>
        <TextArea rows={4} name={state.description} />
      </Form.Item>
      <Form.Item>
        <div className="form-content-date-and-select">
          <div>
            <p style={{ fontWeight: "bold" }}>Due Date</p>
            <DatePicker onChange={onChange} />
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>Piority</p>
            <Select defaultValue="Normal" style={{ width: 120 }} onChange={handleChange}>
              <Option value="Normal">Normal</Option>
              <Option value="Low">Low</Option>
              <Option value="Hight">Hight</Option>
            </Select>
          </div>
        </div>

      </Form.Item>
      <Form.Item>
        <Button type="primary" className="btn-add-item">Add</Button>
      </Form.Item>



    </Form>
  )
}

export default Index
