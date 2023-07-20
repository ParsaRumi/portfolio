import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  
  const GetAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://kzico.runflare.run/product/");
      setProduct(data);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };



  useEffect(() => {
    GetAllProduct();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="erload">
          <span className="loader"></span>
        </div>
      ) : error ? (
        <div className="erload">
          <h1>
            <Badge bg="danger">{error}</Badge>
          </h1>
        </div>
      ) : (
        <Container>
          <Row>
            {product?.map((item) => (
              <Col className="mt-4" key={item._id} xs="12" sm="6" md="4">
                <Card
                  onClick={() => navigate(`/product/${item._id}`)}
                  className={
                    item.countInStock > 0
                      ? "homeCard homeCol"
                      : "homeCard homeColStock"
                  }
                >
                  <div>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="homeImage"
                      alt={item.category}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="h-25">{item.name}</Card.Title>
                    {item.countInStock > 0 ? (
                      <Card.Text className="mt-5">
                        Stock: {item.countInStock}{" "}
                      </Card.Text>
                    ) : (
                      <Card.Text className="outOfStock mt-5">
                        out of stock
                      </Card.Text>
                    )}
                    <div className="priceRatingDiv">
                      <Card.Text>Price: {item.price}$ </Card.Text>
                      <Card.Text>Rate: {item.rating} </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Home;
