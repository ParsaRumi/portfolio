import axios from 'axios';
import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChangeProfile = () => {
  let token=localStorage.getItem("token");
  const changeProfile=async()=>{

    try {
      const { data }= await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
            firstname: firstName.value,
            lastname: lastName.value,
            gender: gender,
            age: age.value,
            city: city.value,
          },
        {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        }
      )
      setFirstName((last) => {
        return { ...last, value:""};
      })
      setLastName((last) => {
        return { ...last, value:""};
      })
      setAge((last) => {
        return { ...last, value:""};
      })
      setCity((last) => {
        return { ...last, value:""};
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

  const regex = /^(?=.*[a-z]{3})[a-z]+$/i;
  const ageRegex = /^[0-9]*$/i;

    const [firstName, setFirstName] = useState({
        value: "",
        isValid: true,
      });
    const [lastName, setLastName] = useState({
        value: "",
        isValid: true,
      });
    const [age, setAge] = useState({
        value: "",
        isValid: true,
      });
    
    const [gender, setGender] = useState("");
      const [city, setCity] = useState({
        value: "",
        isValid: true,
      });
  return (
    <div className="signupContainer">
    <div className="screen">
      <div className="screen__content">
        <form onSubmit={(e) => e.preventDefault()} className="login">
          <div className="login__field">
            <input
              type="text"
              value={firstName.value}
              onChange={(e) =>
                setFirstName((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setFirstName((last) => {
                  return { ...last, isValid: true };
                })
              }
              onBlur={() =>
                setFirstName((last) => {
                  return {
                    ...last,
                    isValid: regex.test(last.value),
                  };
                })
              }
              className="login__input"
              placeholder="First Name"
            />
             {!firstName.isValid && (
                <p className="login_error_p">Only letters & at least three</p>
              )}
          </div>
          <div className="login__field">
            <input
              type="text"
              value={lastName.value}
              onChange={(e) =>
                setLastName((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setLastName((last) => {
                  return { ...last, isValid: true };
                })
              }
              onBlur={() =>
                setLastName((last) => {
                  return {
                    ...last,
                    isValid: regex.test(last.value),
                  };
                })
              }
              className="login__input"
              placeholder="Last Name"
            />
              {!lastName.isValid && (
                <p className="login_error_p">Only letters & at least three</p>
              )}
          </div>
          <div className="login__field">
            <select onChange={(e)=>{
              setGender(e.target.value)
            }
            }
             className="login__input"
             defaultValue={"select a gender"}>
              <option disabled >select a gender</option>
                <option value="male" >male</option>
                <option value="female">female</option>
            </select>
          </div>

          <div className="login__field">
          <input
              type="text"
              value={age.value}
              onChange={(e) =>
                setAge((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setAge((last) => {
                  return { ...last, isValid: true };
                })
              }
              onBlur={() =>
                setAge((last) => {
                  return {
                    ...last,
                    isValid: ageRegex.test(last.value),
                  };
                })
              }
              className="login__input"
              placeholder="Age"
            />
              {!age.isValid && (
                <p className="login_error_p">Only number</p>
              )}
          </div>

          <div className="login__field">
            <input
              type="text"
              value={city.value}
              onChange={(e) =>
                setCity((last) => {
                  return { ...last, value: e.target.value };
                })
              }
              onFocus={() =>
                setCity((last) => {
                  return { ...last, isValid: true };
                })
              }
              onBlur={() =>
                setCity((last) => {
                  return {
                    ...last,
                    isValid: regex.test(last.value),
                  };
                })
              }
              className="login__input"
              placeholder="City"
            />
           {!city.isValid && (
                <p className="login_error_p">Only letters & at least three</p>
              )}
          </div>
          <button
            className="button login__submit"
            onClick={changeProfile}
          >
            <span className="button__text">Done</span>
            <FaChevronRight className="button__icon" />
          </button>
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
  )
}

export default ChangeProfile