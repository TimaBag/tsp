import { REST_API_URL } from '../constants/constants';
const createContractUrl = REST_API_URL + "contract/";
const getContractUrl = REST_API_URL + "contract/";
const saveDocInfoUrl = REST_API_URL + "contract/";

const approveContractUrl = REST_API_URL + "contract/";
const signContractUrl = REST_API_URL + "contract/";
const sendContractDocUrl = REST_API_URL + "contract_documents/";
const sendPreviewUrl = REST_API_URL + "review/";

export const createContract = (data, token) => (
  fetch(
    createContractUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(data)
    }
  )
);

export const getContract = (data, token) => (
  fetch(
    getContractUrl+data.contract+"/",
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const getContractList = (data,page,token) => (
  fetch(
    getContractUrl+"?limit=7&offset="+page+"&user="+data.user,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
    }
  )
);

export const getContractListFilter = (data,page,token) => (
  fetch(
    getContractUrl+"?limit=7&offset="+page+"&user="+data.user+"&contract_type="+data.filter_type,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
    }
  )
);

export const getContractListFilterTime = (data,page,time,token) => (
  fetch(
    getContractUrl+"?limit=7&offset="+page+"&user="+data.user+"&date_from="+time+"&date_to="+time,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "JWT " + token,
      },
    }
  )
);

export const sendContractDoc = (data, token) => (
  fetch(
    sendContractDocUrl,
    {
      method: 'POST',
      headers: {
        "Authorization": "JWT " + token,
      },
      body: data
    }
  )
);

export const approveContract = (data, token) => (
  fetch(
    approveContractUrl+data.contract+"/",
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify({status: data.status})
    }
  )
);

export const signContract = (data, token) => (
  fetch(
    signContractUrl+data.contract+"/",
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify({status: data.status})
    }
  )
);

export const saveDocInfo = (data, token) => (
  fetch(
    saveDocInfoUrl+data.contract+"/",
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(data.docInfo)
    }
  )
);
export const sendPreview = (data, token) => (
  fetch(
    sendPreviewUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT " + token,
      },
      body: JSON.stringify(data)
    }
  )
);