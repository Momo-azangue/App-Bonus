import {
    FETCH_TRANSACTIONS_REQUEST,
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAILURE,
  } from './actions';
  
  const initialState = {
    loading: false,
    transactions: [],
    error: null,
  };
  
  const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_TRANSACTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          transactions: action.payload,
        };
      case FETCH_TRANSACTIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default transactionReducer;
  