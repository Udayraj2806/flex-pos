import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
// import Item from "antd/lib/list/Item";

function Homepage(props) {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCatregory, setSelectedCategory] = useState("fruits");
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  // console.log(itemsData);
  const setcategories = new Set(
    itemsData.map((item) => {
      return item.category;
    })
  );
  const categories = [...setcategories];
  // console.log(categories);
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
    // console.log(cartItems);
    getAllItems();
  }, []);
  // console.log(type(categories));
  return (
    <div>
      <DefaultLayout>
        <div className="d-flex categories">
          {categories.map((item) => {
            return (
              <div
                onClick={() => setSelectedCategory(item)}
                className={`d-flex category ${
                  selectedCatregory === item && "selected-category"
                }`}
              >
                <h4>{item}</h4>
              </div>
            );
          })}
        </div>
        <Row gutter={20}>
          {itemsData
            .filter((it) => it.category === selectedCatregory)
            .map((item) => {
              return (
                <Col xs={24} lg={6} md={12} sm={6}>
                  <Item item={item} />
                </Col>
              );
            })}
        </Row>
      </DefaultLayout>
    </div>
  );
}

export default Homepage;
