import { Badge, Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile, rxaddToCart } from "../redux/action";
import { useEffect } from "react";

const Header = () => {
  let product=useSelector((state)=>state.cart)
  const profile=useSelector((state)=>state.profile)
  const dispatch=useDispatch();
  const navigate = useNavigate();
  let help=JSON.parse(localStorage.getItem("productQty"))

  if(product.length==0 && help!=null ){
      product=[...help]
      product.map((item)=>{
       dispatch(rxaddToCart([{name:item.name,price:item.price,qty:item.qty,stock:item.stock,id:item.id}]))
      })
  }
  if(product.length!=0 ){
    let help=[]
    product.map((item)=>{
      if (item.qty!=0) {
        help.push(item)
      }
    })
    if(help.length==0){
      localStorage.removeItem("productQty")
    }else{

      localStorage.setItem("productQty",JSON.stringify(help))
    }
  }
  let number=0
  product.map((item)=>{
    number+=item.qty
  })
  const logOut=()=>{
    localStorage.removeItem("token")
    navigate("/login")
}
  
  
  let token=localStorage.getItem("token");
  
  useEffect(() => {
   dispatch(GetProfile(token));
  
  }, [token])
  
  return (
    <Navbar  expand="lg" className="navbar">
      <Container>
        <Row>
          <Col>
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          </Col>
          </Row>
          <Row style={{marginRight:"3.3rem"}}>
            <Col style={{position:"relative"}}>
          <BsCart4 onClick={() => navigate("/cart")} className="cart"/>
          <Badge bg="danger" className="cartBadge">{number}</Badge>
          </Col>
            <Col>
            {profile.message=="logged in"? <NavDropdown style={{marginTop:"5px"}} title={profile.user.username} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/profile")} >Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/orders")} >
                Orders
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/setting")}>
                Setting
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut} style={{color:"red"}}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>:
          <Nav.Link onClick={() => navigate("/login")} style={{padding:"0.2rem"}} >login</Nav.Link>}
          </Col>
          </Row>
      </Container>
    </Navbar>
  );
};

export default Header;


















{
  /*  */
}
