import axios from "axios";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {

  let token=localStorage.getItem("token");

  const changePassword=async()=>{

    try {
      const { data }= await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: oldPassword.value,
          new_password: newPassword.value,
          },
        {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        }
      )
             
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
      setOldPassword((last) => {
        return { ...last, value:"" };
      })
      setNewPassword((last) => {
        return { ...last, value:"" };
      })

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

  const [oldPassword, setOldPassword] = useState({
    value: "",
    isToched: false,
    error: "Password is not valid",
    isValid: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    isToched: false,
    error: "Password is not valid",
    isValid: false,
  });
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return (
    <div className="signupContainer">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={(e) => e.preventDefault()} className="login">
            <div style={{ marginTop: "3rem" }}>
              <div className="llogin__field">
                <input
                  type="password"
                  value={oldPassword.value}
                  onChange={(e) =>
                    setOldPassword((last) => {
                      return { ...last, value: e.target.value };
                    })
                  }
                  onFocus={() =>
                    setOldPassword((last) => {
                      return { ...last, isToched: false };
                    })
                  }
                  onBlur={() =>
                    setOldPassword((last) => {
                      return {
                        ...last,
                        isToched: true,
                        isValid: passwordRegex.test(last.value),
                      };
                    })
                  }
                  className="login__input"
                  placeholder="Old Password"
                />
                {!oldPassword.isValid && oldPassword.isToched && (
                  <p className="login_error_p">{oldPassword.error}</p>
                )}
              </div>

              <div className="llogin__field">
                <input
                  type="password"
                  value={newPassword.value}
                  onChange={(e) =>
                    setNewPassword((last) => {
                      return { ...last, value: e.target.value };
                    })
                  }
                  onFocus={() =>
                    setNewPassword((last) => {
                      return { ...last, isToched: false };
                    })
                  }
                  onBlur={() =>
                    setNewPassword((last) => {
                      return {
                        ...last,
                        isToched: true,
                        isValid: passwordRegex.test(last.value),
                      };
                    })
                  }
                  className="login__input"
                  placeholder="New Password"
                />
                {!newPassword.isValid && newPassword.isToched && (
                  <p className="login_error_p">{newPassword.error}</p>
                )}
              </div>
            </div>
            <div className="loginSignupDiv">
              <button onClick={changePassword} className="button login__submit">
                <span className="button__text">Done</span>
                <FaChevronRight className="button__icon" />
              </button>
            </div>
          </form>
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

export default ChangePassword;
