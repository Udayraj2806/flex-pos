import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Select, Table, Input, Form, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { get } from "mongoose";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

// import Form from "antd/lib/form/Form";
// import Input from "antd/lib/input/Input";

function Customers(props) {
  const [billsData, setBillsData] = useState([]);

  const dispatch = useDispatch();

  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        // console.log(response.data);
        const data = response.data;
        // data.sort((a,b)=>a.createdAt-b.createdAt)
        data.reverse();
        // console.log(response.data);
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };
  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered></Table>
    </DefaultLayout>
  );
}

export default Customers;
