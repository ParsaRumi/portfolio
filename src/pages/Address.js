import React, { useEffect, useState } from "react";
import { SiGooglestreetview } from "react-icons/si";
import { FaCity, FaChevronRight, FaMobileAlt } from "react-icons/fa";
import { BsFillSignpostFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { userAddress } from "../redux/action";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastAddress=useSelector((state)=>state.address)


  const [city, setCity] = useState({
    value: "",
    isValid: false,
  });
  const [address, setAddress] = useState({
    value: "",
    isValid: true,
  });
  const [postalCode, setPostalCode] = useState({
    value: "",
    isValid: true,
  });
  const [mobile, setMobile] = useState({
    value: "",
    isValid: true,
  });


  const cityRegex = /^(?=.*[a-z]{3})[a-z]+$/i;
  const addressRegex = /^(?=.*[a-z]{10})[a-z0-9 ]+$/i;
  const postalCodeRegex = /^(?=.*[0-9]{10})/i;
  const mobileRegex = /09[\d]{9}/;

  const next = () => {
    if (
      city.isValid &&
      address.isValid &&
      postalCode.isValid &&
      mobile.isValid
    ) {
        navigate("/checkout")
      dispatch(
        userAddress({
          city: city.value,
          address: address.value,
          postalCode: postalCode.value,
          mobile: mobile.value,
        })
      );
    }
  };

  useEffect(() => {
  if(pastAddress.city!=undefined){
    setCity((last) => {
        return {
          ...last,
          value:pastAddress.city,
        };
      })
    setAddress((last) => {
        return {
          ...last,
          value:pastAddress.address,
        };
      })
    setPostalCode((last) => {
        return {
          ...last,
          value:pastAddress.postalCode,
        };
      })
    setMobile((last) => {
        return {
          ...last,
          value:pastAddress.mobile,
        };
      })
  }
  }, [])
  

  return (
    <div className="signupContainer">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={(e) => e.preventDefault()} className="login">
            <div className="login__field">
              <FaCity className="login__icon" />
              <input
                autoFocus
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
                      isValid: cityRegex.test(last.value),
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
            <div className="login__field">
              <SiGooglestreetview className="login__icon" />
              <input
                type="text"
                value={address.value}
                onChange={(e) =>
                  setAddress((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setAddress((last) => {
                    return { ...last, isValid: true };
                  })
                }
                onBlur={() =>
                  setAddress((last) => {
                    return {
                      ...last,
                      isValid: addressRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Address"
              />
              {!address.isValid && (
                <p className="login_error_p">at least 10 characters</p>
              )}
            </div>
            <div className="login__field">
              <BsFillSignpostFill className="login__icon" />
              <input
                type="text"
                value={postalCode.value}
                onChange={(e) =>
                  setPostalCode((last) => {
                    return { ...last, value: e.target.value };
                  })
                }
                onFocus={() =>
                  setPostalCode((last) => {
                    return { ...last, isValid: true };
                  })
                }
                onBlur={() =>
                  setPostalCode((last) => {
                    return {
                      ...last,
                      isValid: postalCodeRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Postal Code"
              />
              {!postalCode.isValid && (
                <p className="login_error_p">Only 10 number</p>
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
                    return { ...last, isValid: true };
                  })
                }
                onBlur={() =>
                  setMobile((last) => {
                    return {
                      ...last,
                      isValid: mobileRegex.test(last.value),
                    };
                  })
                }
                className="login__input"
                placeholder="Mobile"
              />
              {!mobile.isValid && (
                <p className="login_error_p">Phone number is not valid</p>
              )}
            </div>
            <button onClick={next} className="button login__submit">
              <span className="button__text">Next</span>
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
    </div>
  );
};

export default Address;
