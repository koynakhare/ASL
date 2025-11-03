import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/userReducer';
import learningReducer from './reducers/learningReducer';
import testReducer from './reducers/testReducer';
import resultReducer from './reducers/resultReducer';
import alertReducer from './reducers/alertReducer';

const store = configureStore({
  reducer: {
    alert:alertReducer,
    login: loginReducer,
    learning: learningReducer,
    test:testReducer,
    result:resultReducer
  },
});

export default store