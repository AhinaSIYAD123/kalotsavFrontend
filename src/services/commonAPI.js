import axios from "axios";

const commonAPI = async (method, url, data, headers = {}) => {
  try {
    const token = localStorage.getItem("token");

    const combinedHeaders = {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await axios({
      method,
      url,
      data,
      headers: combinedHeaders,
    });

    return { status: res.status, data: res.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: err.response.data };
    }
    return { status: 500, data: { message: err.message } };
  }
};

export default commonAPI;
