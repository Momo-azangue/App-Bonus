export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';

export const fetchTransactionsRequest = () => ({
  type: FETCH_TRANSACTIONS_REQUEST,
});

export const fetchTransactionsSuccess = (transactions) => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: transactions,
});

export const fetchTransactionsFailure = (error) => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: error,
});
