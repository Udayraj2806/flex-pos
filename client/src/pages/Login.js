import React, { useEffect } from "react";
import { Button, Select, Table, Input, Form, message, Row, Col } from "antd";
import "../resources/authentication.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/user/login", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("Login successfull");
        localStorage.setItem("pos-user", JSON.stringify(res.data));
        navigate("/home");
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
            <h3>Login</h3>

            <Form.Item name="userId" label="User Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Register ? click here to registered
              </Link>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
