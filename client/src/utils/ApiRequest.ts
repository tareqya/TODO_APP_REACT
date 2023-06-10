import axios from "axios";

export type Method = "POST" | "GET" | "DELETE" | "PUT";

export const ApiRequest = async (url: string, params = {}, method: Method) => {
  let response;

  switch (method) {
    case "GET":
      response = await axios.get(url, {
        params: { params: JSON.stringify(params) },
      });
      break;
    case "POST":
      response = await axios.post(url, params);
      break;
    case "DELETE":
      response = await axios.delete(url, {
        params: { params: JSON.stringify(params) },
      });
      break;
    case "PUT":
      response = await axios.put(url, params);
      break;
    default:
      throw "Wrong method!";
  }

  return response;
};
