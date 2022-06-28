import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Select, Table, Input, Form, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { get } from "mongoose";

// import Form from "antd/lib/form/Form";
// import Input from "antd/lib/input/Input";

function Items(props) {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModelVisibility, setaddEditModelVisibility] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        // console.log(response.data);
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };
  useEffect(() => {
    getAllItems();
  }, []);
  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item", { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        // console.log(response.data);
        message.success("Item deleted succecssfully");
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.success("Something Went wrong");
        console.log(error);
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt=" " height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setaddEditModelVisibility(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ];
  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editingItem === null) {
      axios
        .post("/api/items/add-item", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          // console.log(response.data);
          message.success("Item added successfully");
          setaddEditModelVisibility(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("something went wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/items/edit-item", { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          // console.log(response.data);
          message.success("Item edited successfully");
          setEditingItem(null);
          setaddEditModelVisibility(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("something went wrong");
          console.log(error);
        });
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setaddEditModelVisibility(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered></Table>
      {addEditModelVisibility && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setaddEditModelVisibility(false);
          }}
          visible={addEditModelVisibility}
          title={`${editingItem !== null ? "Edit Item" : "Add new Item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Items;
