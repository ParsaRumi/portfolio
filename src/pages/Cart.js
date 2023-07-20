import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import "../style/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { rxaddToCart } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Cart = () => {
  const profile=useSelector((state)=>state.profile)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [qtys, setQtys] = useState(0);

  let time = new Date();
  let price=0;
  let product=JSON.parse(localStorage.getItem("productQty"))
  const next = () => {
    if(profile.message=="logged in"){
      if (localStorage.getItem("productQty").length) {
        navigate("/address")
      }
    }else{
      toast.warn("you must be logged in", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(() => {
          navigate("/login")
        }, 2500);
    }
  };
  const minusCart = (index) => {
    product[index].qty--;
  setQtys((Last)=>Last-1);
    if(localStorage.getItem(product[index].name)<2){
      localStorage.removeItem(product[index].name)
      product.map((item)=>{
        dispatch(rxaddToCart([{name:item.name,price:item.price,qty:item.qty,stock:item.stock,id:item.id}]))
       })
    }else{
      localStorage.setItem(product[index].name, product[index].qty);
      product.map((item)=>{
        dispatch(rxaddToCart([{name:item.name,price:item.price,qty:item.qty,stock:item.stock,id:item.id}]))
       })
    }
  };

  const plusCart = (index) => {
    if (product[index].stock > product[index].qty) {
      setQtys((Last)=>Last+1);
      product[index].qty++;
      product.map((item)=>{
        dispatch(rxaddToCart([{name:item.name,price:item.price,qty:item.qty,stock:item.stock,id:item.id}]))
       })
      localStorage.setItem(product[index].name, product[index].qty);
    }else{
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

  return (
   
    <div className="cartDiv">
       {product!=null?
      <Container className="cartContiner">
        <Row>
          <Col xs="12" className="cartCol">
            <div className="cartHeader">
              <div className="cartLogo">
                <img
                  src="https://www.phoca.cz/images/projects/phoca-cart-r.svg"
                  alt="Paypal"
                  className="cartImgLogo"
                />
              </div>

              <div className="cartHeaderInfo">
                <span className="cartDate">
                  {time.getDate()}.{time.getMonth() + 1}.{time.getFullYear()}
                </span>
              </div>
            </div>

            <div className="cartSubheaderDiv">
              <div className="cartSubheader">
                <h1 className="cartThanks">Thanks for your trust</h1>
                <span className="cartPurchased">
                  you've purchased {product.length} items in our store:
                </span>
              </div>
            </div>

            <div className="cartListDiv">
              
               <ul className="cartUlList">
                {product.map((item,index)=>{
                    let name=item.name.split(" ").slice(0,4).join(" ")
                    price+=item.price*item.qty;
              
                  return <li key={item.name} className="cartItem">
                  <span className="cartIndex">{index+1}</span>
                  <span className="cartItemName">{name}</span>
                  <span className="cartItemPrice">${item.price*item.qty}</span>
                  <div>
                  <button onClick={()=>{
                    minusCart(index)}} className="btn btn-outline-danger">
                    {item.qty < 2 ? <BsTrash /> : <AiOutlineMinus />}
                  </button>
                  <span className="p-2">{item.qty}</span>
                  <button onClick={()=>{
                    plusCart(index)}} className="btn btn-outline-primary">
                    <AiOutlinePlus />
                  </button>
                </div>
                </li>
                })}
                <li className="cartItem">
                  <span className="cartTotal">Total</span>
                  <span className="cartItemPrice">${price.toFixed(2)}</span>
                </li>
              </ul>
            <button onClick={next} style={{margin:"0rem 0rem 0 18rem"}} className="btn btn-outline-primary">next</button>
            </div>
          </Col>
        </Row>
      </Container>
      :<div className="cartEmptyDiv">
        <p>Cart is Empty Back to <Button onClick={() => navigate("/")}>Home</Button> and chose Something</p>
     
      </div>
      }
      <ToastContainer />
    </div>
  );
};

export default Cart;
