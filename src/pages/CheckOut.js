import { useNavigate } from "react-router-dom";
import "../style/CheckOut.css";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { rxaddToCart } from "../redux/action";


const CheckOut = () => {
  const [flage, setflage] = useState(true)
  const dispatch=useDispatch();
  const navigate = useNavigate();
  let product=JSON.parse(localStorage.getItem("productQty"))
  let price=0;
  const Address=useSelector((state)=>state.address)
  let token=localStorage.getItem("token");
  let order=product?.map((item)=>{
    return {product:item.id,qty:item.qty}
  })

  const submit=async()=>{
    try {
    
      const { data }= await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          
          orderItems: order,

          shippingAddress: {
            address: Address.address,
            city: Address.city,
            postalCode: Address.postalCode,
            phone: Address.mobile,
          },
          paymentMethod: "cash",
          shippingPrice: "5",
          totalPrice: price,
        },
        {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        }
      )
      toast.success("Your order is successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
       setTimeout(() => {
          navigate("/")
        }, 2500);
        dispatch(rxaddToCart([{}]))
        localStorage.removeItem("productQty")
        product.map((item)=>{
          localStorage.removeItem(item.name)
        })
       setflage(false)
      console.log(data)
    } catch (error) {
      toast.danger(error.response.data.message, {
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
   
}

  return (
    <div className="check_out_container">
      <Container className="checkout_window">
        <Row>
          <Col xs="12" md="6">
            <ul>
              <h2 className="checkout_Title">Order Summary</h2>
              <div className="line"></div>
              {product?.map((item,index)=>{
                    let name=item.name.split(" ").slice(0,4).join(" ")
                    price+=item.price*item.qty;
                return <li key={index} >
                  <div className="checkoutli">
                <span>{index+1}</span>
                <span>{name}</span>
                <span>${item.price*item.qty}</span>
                </div>
               
              <div className="line"></div>
              </li>
               })}
               <li className="checkoutli1"><h5>Total price</h5><h6>${price}</h6></li>
            </ul>
            <button onClick={() => navigate("/cart")} className="pay-btn">Edit</button>

          </Col>

          <Col xs="12" md="6" className="credit-info">
            <div className="credit-info-content">
              City:
              <input disabled value={Address.city} className="input-field"></input>
              Address:
              <input disabled value={Address.address} className="input-field"></input>
              Postal Code:
              <input disabled value={Address.postalCode} className="input-field"></input>
              Mobile:
              <input disabled value={Address.mobile} className="input-field"></input>
              <button onClick={submit} className={flage?"pay-btn":"pay-btnd"}>Done</button>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
