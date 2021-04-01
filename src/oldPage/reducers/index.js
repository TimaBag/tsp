import { combineReducers } from 'redux'
import authReducer from './authReducer'
import offerReducer from './offerReducer'
import demandReducer from './demandReducer'
import newsReducer from './newsReducer'
import userReducer from './userReducer'
import companyReducer from './companyReducer'
import resourceReducer from './resourceReducer'
import profileReducer from './profileReducer'
import contractReducer from './contractReducer'
import chatReducer from './chatReducer'
import expeditorReducer from './expeditorReducer'
import tradeReducer from './tradeReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    offer: offerReducer,
    demand: demandReducer,
    news: newsReducer,
    company: companyReducer,
    resource: resourceReducer,
    contract: contractReducer,
    chat: chatReducer,
    expeditor : expeditorReducer,
    trade : tradeReducer
});

export default rootReducer;
