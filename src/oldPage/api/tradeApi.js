import { REST_API_URL } from '../constants/constants';
const tradeUrl = REST_API_URL + "confirm_auth/";
const tradeContractUrl = REST_API_URL + "contract_documents/";

export const sendTradeAuth = (data,token) => (
  fetch(
    tradeUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "JWT "+token,
      },
      body: JSON.stringify(data),
    }
  )
);

export const sendTradeSign = (data,token) => (
  fetch(
    tradeContractUrl+data.document_id+"/?code="+data.isAuth,
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "JWT "+token,
      },
      body: JSON.stringify(data),
    }
  )
);
