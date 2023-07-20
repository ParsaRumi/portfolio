import React, { useState } from "react";
import "../style/SignUp.css";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillLock,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaUserAlt, FaMobileAlt, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: userName.value,
          email: email.value,
          password: password.value,
          mobile: mobile.value,
        }
      );
      console.log(data.message);
      if (data.message=="user was created") {
        setEmail((last) => {
          return { ...last, value: "" };
        })
        setUserName((last) => {
          return { ...last, value: "" };
        })
        setPassword((last) => {
          return { ...last, value: "" };
        })
        setCpassword((last) => {
          return { ...last, value: "" };
        })
        setMobile((last) => {
          return { ...last, value: "" };
        })
        toast.success(data.message, {
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
            navigate("/login")
          }, 2500);
        }else{
        toast.warn(data.message, {
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

  const [email, setEmail] = useState({
    value: "",
    isToched: false,
    error: "Email is not valid",
    isValid: false,
  });
  const [userName, setUserName] = useState({
    value: "",
    isToched: false,
    error: "Username is not valid",
    isValid: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isToched: false,
    error: "Password is not valid",
    isValid: false,
  });
  const [cPassword, setCpassword] = useState({
    value: "",
    isToched: false,
    error: "Password is not valid",
    isValid: false,
  });
  const [mobile, setMobile] = useState({
    value: "",
    isToched: false,
    error: "Number is not valid",
    isValid: false,
  });
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const mobileRegex = /09[\d]{9}/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return (
    <div className="signupContainer">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={(e) => e.preventDefault()} className="login">
            <div className="login__field">
              <MdEmail className="login__icon" />
              <input
                type="email"
                value={email.value}
                onChange={(e) =>
                  setEmail((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setEmail((last) => {
                    return { ...last, isToched: false };
                  })
                }
                onBlur={() =>
                  setEmail((last) => {
                    return {
                      ...last,
                      isToched: true,
                      isValid: emailRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Email"
              />
              {!email.isValid && email.isToched && (
                <p className="login_error_p">{email.error}</p>
              )}
            </div>
            <div className="login__field">
              <FaUserAlt className="login__icon" />
              <input
                type="text"
                value={userName.value}
                onChange={(e) =>
                  setUserName((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setUserName((last) => {
                    return { ...last, isToched: false };
                  })
                }
                onBlur={() =>
                  setUserName((last) => {
                    return {
                      ...last,
                      isToched: true,
                      isValid: userNameRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="User name"
              />
              {!userName.isValid && userName.isToched && (
                <p className="login_error_p">{userName.error}</p>
              )}
            </div>
            <div className="login__field">
              <AiFillLock className="login__icon" />
              <input
                type="password"
                value={password.value}
                onChange={(e) =>
                  setPassword((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setPassword((last) => {
                    return { ...last, isToched: false };
                  })
                }
                onBlur={() =>
                  setPassword((last) => {
                    return {
                      ...last,
                      isToched: true,
                      isValid: passwordRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Password"
              />
              {!password.isValid && password.isToched && (
                <p className="login_error_p">{password.error}</p>
              )}
            </div>
            <div className="login__field">
              <AiFillLock className="login__icon" />
              <input
                type="password"
                value={cPassword.value}
                onChange={(e) =>
                  setCpassword((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setCpassword((last) => {
                    return { ...last, isToched: false };
                  })
                }
                onBlur={() =>
                  setCpassword((last) => {
                    return {
                      ...last,
                      isToched: true,
                      isValid: passwordRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Confirm Password"
              />
              {!cPassword.isValid && cPassword.isToched && (
                <p className="login_error_p">{cPassword.error}</p>
              )}
              {password.value != cPassword.value && cPassword.isToched && (
                <p className="login_error_p">Password isn't the same</p>
              )}
            </div>
            <div className="login__field">
              <FaMobileAlt className="login__icon" />
              <input
                type="text"
                value={mobile.value}
                onChange={(e) =>
                  setMobile((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setMobile((last) => {
                    return { ...last, isToched: false };
                  })
                }
                onBlur={() =>
                  setMobile((last) => {
                    return {
                      ...last,
                      isToched: true,
                      isValid: mobileRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Mobile"
              />
              {!mobile.isValid && mobile.isToched && (
                <p className="login_error_p">{mobile.error}</p>
              )}
            </div>
            <button
              onClick={() => {
                let passwordflag = password.value == cPassword.value;
                if (
                  passwordflag &&
                  email.isValid &&
                  userName.isValid &&
                  password.isValid &&
                  mobile.isValid
                ) {
                  signup();
                }
              }}
              className="button login__submit"
            >
              <span className="button__text">sign up Now</span>
              <FaChevronRight className="button__icon" />
            </button>
          </form>
          <div className="social-login">
            <h4>sign up via</h4>
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

export default SignUp;
