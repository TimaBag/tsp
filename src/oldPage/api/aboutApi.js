import { REST_API_URL } from '../constants/constants';
const feedbackUrl = REST_API_URL + "feedback/";

export const feedback = (data) => (
  fetch(
    feedbackUrl,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        message: data.message
      })
    }
  )
);