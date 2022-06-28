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

function Bills(props) {
  const componentRef = useRef();

  const [billsData, setBillsData] = useState([]);
  const [printBillModalVisibility, setPrinBillModalVisibility] =
    useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
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
  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
      title: "total fare",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      ),
    },
  ];
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrinBillModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bills</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered></Table>
      {printBillModalVisibility && (
        <Modal
          onCancel={() => {
            setPrinBillModalVisibility(false);
          }}
          visible={printBillModalVisibility}
          title="Bill Details"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>
                  <b>MGM MARKET</b>
                </h1>
              </div>
              <div>
                <p>Aurangabad</p>
                <p>Amberpet 500013</p>
                <p>5934098501</p>
              </div>
            </div>
            <div className="bill-customer-details my-2">
              <p>
                <b>Name:</b>
                {selectedBill.customerName}
              </p>
              <p>
                <b>Phone Number:</b>
                {selectedBill.customerPhoneNumber}
              </p>
              <p>
                <b>Date:</b>
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            <Table
              dataSource={selectedBill.cartItems}
              columns={cartcolumns}
              pagination={false}
            ></Table>
            <div className="dotted-border mt-2 mb-2 pb-2">
              <p>
                <b>SUB TOTAL</b>:{selectedBill.subTotal}
              </p>
              <p>
                <b>Tax</b>:{selectedBill.tax}
              </p>
            </div>
            <div>
              <h2>
                {" "}
                <b>GRAND TOTAL : </b>
                {selectedBill.totalAmount}
              </h2>
            </div>
            <div className="dotted-border "></div>
            <div className="text-center">
              <p>Thanks</p>
              <p>Visit again..!!</p>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="primary" onClick={handlePrint}>
                Print Bill
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Bills;
