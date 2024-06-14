import api from '../config/axiosConfig';
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} from './actions';

export const fetchTransactions = () => {
  return async (dispatch) => {
    dispatch(fetchTransactionsRequest());
    try {
      const response = await api.get('/api/transactions/all-transaction');
      dispatch(fetchTransactionsSuccess(response.data));
    } catch (error) {
      dispatch(fetchTransactionsFailure(error.message));
    }
  };
};
