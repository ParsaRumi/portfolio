import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillLock,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {

    const [eUserName,setEUserName]=useState("");
    const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const login=async()=>{
    try {
       const {data}=await axios.post("http://kzico.runflare.run/user/login",{
        email:eUserName,
        password:password
       }) 
       setEUserName("")
       setPassword("")
       toast.success(`Welcome ${data.user.username}`, {
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
       localStorage.setItem("token",data.user.token)
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
  }

  return (
    <div className="signupContainer">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={(e) => e.preventDefault()} className="login">
            <div style={{marginTop:"3rem"}}>
            <div className="llogin__field">
              <MdEmail className="login__icon" />
              <input
              onChange={(e)=>{
                setEUserName(e.target.value)
              }}
                type="text"
                value={eUserName}
                className="login__input"
                placeholder="Email / Username"
              />
            </div>
            <div className="llogin__field">
              <AiFillLock className="login__icon" />
              <input
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
                type="password"
                value={password}
                className="login__input"
                placeholder="Password"
              />
            </div>
            </div>
            <div className="loginSignupDiv">
            <button onClick={login} className="llogin__submit">
              <span className="button__text">Log in</span>
              <FaChevronRight className="button__icon" />
            </button>
            <button onClick={() => navigate("/signup")} className="llogin__submit">
              <span className="button__text">Sign Up</span>
              <FaChevronRight className="button__icon" />
            </button>
            </div>
          </form>
          <div className="social-login">
            <h4>log in via</h4>
            <div className="social-icons">
              <AiOutlineInstagram className="social-login__icon" />
              <AiFillFacebook className="social-login__icon" />
              <AiOutlineTwitter className="social-login__icon" />
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
