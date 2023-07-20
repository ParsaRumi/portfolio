
export const cart = (state = [], { type, payload }) => {
  switch (type) {
    case "rxaddToCart":
      return payload;
    default:
      return state;
  }
};
export const profile = (state = "", { type, payload }) => {
  switch (type) {
    case "GetProfile":
      return payload;
      default:
      return state;
  }
};
export const address = (state = {}, { type, payload }) => {
  switch (type) {
    case "userAddress":
      return payload;
      default:
      return state;
  }
};
