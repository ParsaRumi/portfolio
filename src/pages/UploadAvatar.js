import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UploadAvatar = () => {
  const navigate = useNavigate();
  const [pic, setPic] = useState(null);
  let token = localStorage.getItem("token");

  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
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
      setPic(null);
      setTimeout(() => {
        navigate("/setting");
      }, 3500);
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

  return (
    <div className="signupContainer">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={(e) => e.preventDefault()} className="login">
            <div style={{ marginTop: "3rem" }}>
              <div className="upload__field">
                <input
                  onChange={(e) => setPic(e.target.files[0])}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="loginSignupDiv">
              <button onClick={uploadAvatar} className="login__submit">
                <span className="button__text">Upload</span>
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

export default UploadAvatar;
