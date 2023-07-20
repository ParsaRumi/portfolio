import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  let token = localStorage.getItem("token");
  let time = new Date();
  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  const GetOrders = async () => {
    try {
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setOrder(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <div className="cartDiv">
      <Container className="cartContiner">
        <Row>
          <Col xs="12" className="cartCol">
            <div className="cartHeader">
              <div className="cartLogo">
                <svg
                  className="cartImgLogo"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 117.78 122.88"
                >
                  <title>orders-history</title>
                  <path d="M70.71,116.29H7.46a7.48,7.48,0,0,1-5.27-2.19L2,113.87a7.43,7.43,0,0,1-2-5V7.46A7.45,7.45,0,0,1,2.19,2.19L2.42,2a7.42,7.42,0,0,1,5-2H91.88a7.48,7.48,0,0,1,7.46,7.46V66.63a3.21,3.21,0,0,1-.06.63,28.75,28.75,0,1,1-28.57,49ZM85.18,82.12h2.89a2,2,0,0,1,1.43.59,2.06,2.06,0,0,1,.6,1.44V94.77h9.59a2,2,0,0,1,2,2v3a2.12,2.12,0,0,1-.6,1.44l-.08.07a2,2,0,0,1-1.35.52H84a1,1,0,0,1-1-1V84a2,2,0,0,1,.59-1.29,2,2,0,0,1,1.43-.6Zm7.75-16.47V7.46a1.1,1.1,0,0,0-1.05-1H7.46a1.08,1.08,0,0,0-.66.23l-.08.08a1.06,1.06,0,0,0-.31.74V108.84a1,1,0,0,0,.23.65l.09.08a1,1,0,0,0,.73.32H65A28.75,28.75,0,0,1,89,65.38a28,28,0,0,1,3.9.27Zm12.36,12.22A23,23,0,1,0,112,94.13a22.92,22.92,0,0,0-6.73-16.26Zm-84.5-3.78h9A1.18,1.18,0,0,1,31,75.27v9a1.18,1.18,0,0,1-1.18,1.18h-9a1.18,1.18,0,0,1-1.18-1.18v-9a1.18,1.18,0,0,1,1.18-1.18Zm22,9.28a3.65,3.65,0,0,1,0-7.18h9.58a3.65,3.65,0,0,1,0,7.18Zm-22-61.22h9A1.18,1.18,0,0,1,31,23.33v9a1.18,1.18,0,0,1-1.18,1.18h-9a1.18,1.18,0,0,1-1.18-1.18v-9a1.18,1.18,0,0,1,1.18-1.18Zm22,9.27a3.33,3.33,0,0,1-3-3.58,3.34,3.34,0,0,1,3-3.59H78.25a3.34,3.34,0,0,1,3,3.59,3.33,3.33,0,0,1-3,3.58ZM18.34,54.1a2,2,0,0,1,.38-2.82,2.23,2.23,0,0,1,3-.09l2.1,2.17L29.07,48a1.93,1.93,0,0,1,2.82.3,2.23,2.23,0,0,1,.18,3l-7,7.14a1.94,1.94,0,0,1-2.82-.3l-.16-.19a1.94,1.94,0,0,1-.31-.26L18.34,54.1Zm24.4,2.69a3.34,3.34,0,0,1-3-3.59,3.34,3.34,0,0,1,3-3.59H78.25a3.34,3.34,0,0,1,3,3.59,3.34,3.34,0,0,1-3,3.59Z" />
                </svg>
              </div>

              <div className="cartHeaderInfo">
                <span className="cartDate">
                  {time.getDate()}.{time.getMonth() + 1}.{time.getFullYear()}
                </span>
              </div>
            </div>

            <div className="cartSubheaderDiv">
              <div className="cartSubheader">
                <h1 className="cartThanks">Orders History</h1>
                <span className="cartPurchased">
                  you had {order?.length} order in our store:
                </span>
              </div>
            </div>

            <div className="cartListDiv">
              <ul className="cartUlList">
                {order.map((item, index) => {
                  return (
                    <li onClick={() => navigate(`/order/${item._id}`)} key={index} className="cartItem1">
                      <span className="cartIndex">{index + 1}</span>
                      <span className="cartItemName1">{`You ordered ${item.orderItems.length} products in ${item.paymentMethod}`}</span>
                      <span className="cartItemPrice">${item.totalPrice}</span>
                    </li>
                  );
                })}
                <li className="cartItem">
                  {time.getHours()}.{time.getMinutes()}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Orders;
