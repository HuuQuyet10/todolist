import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Checkbox,
  DatePicker,
  Form,
  Select,
  Button,
} from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import Api from "../utils/client-utils";
import "./style.scss";

const { Option } = Select;
const { TextArea } = Input;
function Index(props) {
  const [form] = Form.useForm();
  let [list, setList] = useState([]);
  const [state, _setState] = useState({
    id: "",
    description: "",
    piority: "",
    title: "",
    createAt: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getApi();
  }, []);
  const notifyDelete = () => {
    toast.success("Successfully Delete", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyAdd = () => {
    toast.success("Successfully Add", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyEdit = () => {
    toast.success("Successfully Edit", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // GET DATA
  const getApi = () => {
    axios
      .get(Api.doamin)
      .then((response) => setList(response.data));
  };
  // DELETE
  const onDelete = (id) => {
    axios
      .delete(
        Api.doamin + id
      )
      .then((res, id) => {
        if (res.data != null) {
          notifyDelete();
          setState({
            list: list.filter((list) => list.id !== id),
          });
          getApi();
        }
      });
  };
  // edit item
  const editItem = (e) => {
    debugger
    let currentId = state.currentId;
    const item = {
      description: state.description,
      piority: state.piority,
      title: state.title,
      createAt: state.createAt,
    };
    axios
      .put(
        Api.doamin + `${currentId}`,
        item
      )
      .then((res) => {
        notifyEdit();
        getApi();
        FormatInput();
      });
  };
  // Add item
  const AddItem = (event) => {
    const item = {
      description: state.description,
      piority: state.piority,
      title: state.title,
      createAt: state.createAt,
    };
    axios
      .post(
        Api.doamin,
        item
      )
      .then((res) => {
        notifyAdd();
        getApi();
        FormatInput();
      });
  };

  // Search
  const SaerchKey = e => {
    let title = e.target.value
    axios
      .get(Api.doamin + "?" + "title=" + title)
      .then((response) => setList(response.data));
  }

  const fillData = (item) => (e) => {
    e.preventDefault();
    setState({
      currentId: item.id,
      description: item.description,
      piority: item.piority,
      title: item.title,
      createAt: item.createAt ? moment(item.createAt) : "",
    });
  };
  const handleChangeDescription = (event) => {
    setState({ description: event.target.value });
  };
  const handleChangeTitle = (event) => {
    setState({ title: event.target.value });
  };
  // select not target
  const handleChangePiority = (e) => {
    setState({ piority: e });
  };
  const handleChangeCreateAt = (e) => {
    setState({ createAt: e });
  };
  const FormatInput = () => {
    setState({
      id: null,
      description: null,
      piority: null,
      title: null,
      createAt: null,
    });
  };

  return (
    <Row className="content--total">
      <Col span={12} className="colum-left">
        <Form onSubmit={editItem}>
          <Form.Item className="form-item-title">
            <h2 style={{ fontWeight: "bold" }}>
              {state.currentId ? "Edit Task" : "New Task"}
            </h2>
          </Form.Item>
          <Form.Item>
            <Input
              onChange={handleChangeTitle}
              placeholder="Add new task..."
              value={state.title}
            />
          </Form.Item>
          <Form.Item>
            <p style={{ fontWeight: "bold" }}>Description</p>
            <TextArea
              rows={4}
              value={state.description}
              onChange={handleChangeDescription}
            />
          </Form.Item>
          <Form.Item>
            <div className="form-content-date-and-select">
              <div>
                <p style={{ fontWeight: "bold" }}>Due Date</p>
                <DatePicker
                  onChange={handleChangeCreateAt}
                  format="DD/MM/YYYY"
                  value={state.createAt}
                />
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>Piority</p>
                <Select
                  defaultValue="Normal"
                  style={{ width: 120 }}
                  value={state.piority}
                  onChange={handleChangePiority}
                >
                  <Option value="normal">Normal</Option>
                  <Option value="low">Low</Option>
                  <Option value="hight">Hight</Option>
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            {state.currentId ? (
              <Button type="primary" className="btn-add-item" onClick={editItem}>Save</Button>
            ) : (
                <Button type="primary" className="btn-add-item" onClick={AddItem}>Add</Button>
              )}
          </Form.Item>
        </Form>
      </Col>
      <Col span={12} className="colum-right">
        <Form>
          <Form.Item>
            <h2 className="content-title">To Do List</h2>
          </Form.Item>
          <Form.Item>
            <Input placeholder="Search..." onChange={SaerchKey} />
          </Form.Item>
          {list.map((item, index) => {
            return (
              <>
                <div key={index} className="content-list-item">
                  <h3>{item.title}</h3>
                  <div className="group-list-item">
                    <Button type="primary" className="button-detail" onClick={fillData(item)}>Detail</Button>
                    <Button type="primary" danger onClick={() => onDelete(item.id)}>Remove</Button>
                  </div>
                </div>
              </>
            );
          })}
        </Form>
      </Col>
    </Row>
  );
}

export default Index;
