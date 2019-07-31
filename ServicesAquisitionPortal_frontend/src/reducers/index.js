import { combineReducers } from 'redux';
import packages_Reducer from './packages'
import users_Reducer from './users'
import payment_Reducer from './payment'
import signIn_Reducer from './signIn'
import signUp_Reducer from './signUp'
const rootReducer= combineReducers({
    packages_Reducer,
    users_Reducer,
    payment_Reducer,
    signIn_Reducer,
    signUp_Reducer
});
export default rootReducer
