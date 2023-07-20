import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../style/Product.css";
import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { rxaddToCart } from "../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { Id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qtys, setQtys] = useState(0);
  const GetOneProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://kzico.runflare.run/product/${Id}`
      );
      const loacalQty = localStorage.getItem(data.name + " " + data.color);
      if (loacalQty == null) {
        data.qty = 0;
      } else {
        data.qty = loacalQty;
        setQtys(loacalQty);
      }
      setProduct(data);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const addToCart = () => {
    setQtys(1);
    product.qty = 1;
    localStorage.setItem(product.name + " " + product.color, 1);
  };

  const plusCart = () => {
    if (product.countInStock > product.qty) {
      setQtys((Last) => Last + 1);
      product.qty++;
      localStorage.setItem(product.name + " " + product.color, product.qty);
    } else {
      toast.warn("product are limited", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  const minusCart = () => {
    setQtys((Last) => Last - 1);
    product.qty--;
    if (localStorage.getItem(product.name + " " + product.color) < 2) {
      localStorage.removeItem(product.name + " " + product.color);
    } else {
      localStorage.setItem(product.name + " " + product.color, product.qty);
    }
  };

  useEffect(() => {
    GetOneProduct();
  }, []);
  return (
    <div className="productdiv">
      {loading ? (
        <div className="erload">
          <Spinner variant="info" animation="border" />
        </div>
      ) : error ? (
        <div className="erload">
          <h1>
            <Badge bg="danger">{error}</Badge>
          </h1>
        </div>
      ) : (
        <Container className="productContainer">
          <Row className="header">
            <Col>
              <h1 className="text-uppercase">
                {product.brand} {product.category}
              </h1>
            </Col>
            <Col className="productDropDown">
              <div className="productDropDiv">
                <AiFillStar
                  className={product.rating >= 1 ? "productStar" : ""}
                />
                <AiFillStar
                  className={product.rating >= 2 ? "productStar" : ""}
                />
                <AiFillStar
                  className={product.rating >= 3 ? "productStar" : ""}
                />
                <AiFillStar
                  className={product.rating >= 4 ? "productStar" : ""}
                />
                <AiFillStar
                  className={product.rating >= 5 ? "productStar" : ""}
                />
                <span className="ms-5">
                  Based on {product.numReviews} Review
                </span>
                <div className="productDropDownRating">
                  <p style={{ marginTop: "1rem" }}>{product.rating}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul>
                <li>
                  <h5 className="productFirstWord">Name</h5> {product.name}
                </li>
                <li>
                  <h5 className="productFirstWord">Description</h5>{" "}
                  {product.description}
                </li>
                <li>
                  <h5 className="productSingleWord">Available Color </h5>{" "}
                  {product.color}
                </li>
                {product.countInStock > 0 ? (
                  <li>
                    <h5 className="productSingleWord">Stock </h5>{" "}
                    {product.countInStock}
                  </li>
                ) : (
                  <h5 className="outOfStock">out of stock</h5>
                )}
                <li>
                  <h5 className="productSingleWord">Price </h5> {product.price}$
                </li>
              </ul>
            </Col>
            <Col
              className={
                product.category?.toLowerCase() == "mouse"
                  ? "colImageMouse"
                  : "colImageKeybord"
              }
            >
              <img
                className={
                  product.category?.toLowerCase() == "mouse"
                    ? "productImageMouse"
                    : "productImageKeybord"
                }
                src={product.image}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              {product.qty < 1 ? (
                <div>
                  <button
                    type="button"
                    className={
                      product.countInStock == 0
                        ? "btnDisable btn btn-outline-danger"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      addToCart();
                      dispatch(
                        rxaddToCart([
                          {
                            name: product.name + " " + product.color,
                            price: product.price,
                            qty: product.qty,
                            stock: product.countInStock,
                            id: product._id,
                          },
                        ])
                      );
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      minusCart();
                      dispatch(
                        rxaddToCart([
                          {
                            name: product.name + " " + product.color,
                            price: product.price,
                            qty: product.qty,
                            stock: product.countInStock,
                            id: product._id,
                          },
                        ])
                      );
                    }}
                    className="btn btn-outline-danger"
                  >
                    {product.qty < 2 ? <BsTrash /> : <AiOutlineMinus />}
                  </button>
                  <span className="p-2">{product.qty}</span>
                  <button
                    onClick={() => {
                      plusCart();
                      dispatch(
                        rxaddToCart([
                          {
                            name: product.name + " " + product.color,
                            price: product.price,
                            qty: product.qty,
                            stock: product.countInStock,
                            id: product._id,
                          },
                        ])
                      );
                    }}
                    className="btn btn-outline-primary"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
};

export default Product;
