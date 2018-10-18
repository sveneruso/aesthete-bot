const axios = require("axios");

const LOGIN_ENDPOINT = "https://api.artsy.net/api/tokens/xapp_token";

module.exports = async function login() {
  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      new URLSearchParams({
        client_id: process.env.ARTSY_CLIENT_ID,
        client_secret: process.env.ARTSY_CLIENT_SECRET
      }),
      {
        validateStatus: status => status === 201
      }
    );
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
};
