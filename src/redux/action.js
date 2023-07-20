import axios from "axios";

export const rxaddToCart = (product) => (dispatch, getState) => {
  for (let i = 0; i < getState().cart.length; i++) {
    if (product[0].name==undefined) {
      dispatch({ type: "rxaddToCart", payload: [] });
     return
    }
    if (product[0].name == getState().cart[i].name) {
      getState().cart[i].qty = product[0].qty;
      dispatch({ type: "rxaddToCart", payload: [...getState().cart] });
      return;
    }
  }
  dispatch({ type: "rxaddToCart", payload: [...getState().cart, ...product] });
};

export const userAddress = (address) => (dispatch) => {
    dispatch({ type: "userAddress", payload: address });
};


export const GetProfile = (token)=> async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://kzico.runflare.run/user/profile",
    {
        headers: {
          authorization:
          `Bearer ${token}`
        },
      }
      );
      dispatch({type:"GetProfile",payload:data})
    } catch (error) {
      dispatch({type:"GetProfile",payload:error})

  }
};
