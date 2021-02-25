import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Button } from 'antd';
import axios from "axios";
import Create from "./create/index";
import "./style.scss"

function Index(props) {
  let [list, setList] = useState([]);
  const [state, _setState] = useState({
    id: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }
  useEffect(() => {
    axios
      .get("https://6036f14454350400177215ee.mockapi.io/api/todolist/tableOne")
      .then(response => setList(response.data));
  }, []);
  return (

    <Row className="content--total">
      <Col span={12} className="colum-left">
        <Create></Create>
      </Col>
      <Col span={12} className="colum-right">
        <Form>
          <Form.Item>
            <h2 className="content-title">To Do List</h2>
          </Form.Item>
          <Form.Item>
            <Input placeholder="Search..." />
          </Form.Item>
          {
            list.map((item, index) => {
              return <>
                <div key={index} className="content-list-item">
                  <Checkbox onChange={onChange}>{item.title}</Checkbox>
                  <div className="group-list-item">
                    <Button type="primary" className="button-detail" >Detail</Button>
                    <Button type="primary" name="id" danger>Remove</Button>
                  </div>

                </div>
              </>
            })
          }
        </Form>
      </Col >
    </Row >
  )
}

export default Index
