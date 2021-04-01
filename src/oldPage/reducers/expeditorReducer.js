import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';


const expeditorTarif = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ACTION_GET_EXPEDITOR_SUCCEEDED:
      return action.expeditor_tarif;
    case actionTypes.ACTION_ADD_EXPEDITOR_TARIFF_SUCCEEDED:
      let isExist = false;
      const updatedItems = state.map(item => {
        if(item.id === action.newExpediorTarif.id){
          isExist = true;
          return { ...item, ...action.newExpediorTarif }
        }
        return item
      })
      if(!isExist) updatedItems.push(action.newExpediorTarif);
      return updatedItems
    case actionTypes.ACTION_GET_EXPEDITOR_STARTED:
    case actionTypes.ACTION_GET_EXPEDITOR_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return [];
    default:
      return state;
  }
}

const expeditorReducer = combineReducers({
  expeditorTarif,
});

export default expeditorReducer;