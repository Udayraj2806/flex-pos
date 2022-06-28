import React, { useEffect } from "react";
import { Button, Select, Table, Input, Form, message, Row, Col } from "antd";
import "../resources/authentication.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/user/register", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success(
          "Registration successfull ,Please wait for verification"
        );
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
        message.error("Smoething went Wrong");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) navigate("/home");
  }, []);

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <b>FLEX POS</b>
            </h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Register ? click here to login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
