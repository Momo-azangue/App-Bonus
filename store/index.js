import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import transactionReducer from './reducers';

const store = createStore(transactionReducer, applyMiddleware(thunk));

const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default ReduxProvider;
