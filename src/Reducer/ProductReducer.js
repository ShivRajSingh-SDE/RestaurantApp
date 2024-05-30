const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_API_DATA":
      const featureData = (action?.payload?.data).filter(
        (current) => current.isFeatured === true
      );

      return {
        ...state,
        isLoading: false,
        products: [...action?.payload?.data] || [],
        featureProducts: featureData,
      };

    case "SET_SINGLEPRODUCT_DATA":
      // console.log("reducer", action?.payload?.data);
      return {
        ...state,
        isLoading: false,
        singleProduct: action?.payload?.data || {},
      };

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    ///from here .....
    case "SET_USER_DATA":
      console.log("here data commning", action?.payload?.data);
      return {
        ...state,
        isLoading: false,
        user: action?.payload?.data || {},
      };

    case "SET_USER_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };
    default:
      return state;
  }
};

export default ProductReducer;
